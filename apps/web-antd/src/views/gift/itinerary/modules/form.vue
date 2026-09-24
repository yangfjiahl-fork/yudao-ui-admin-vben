<script lang="ts" setup>
import type { UploadFile } from 'ant-design-vue';

import type { GiftItineraryApi } from '#/api/gift/itinerary';

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page } from '@vben/common-ui';
import { useTabs } from '@vben/hooks';

import { Button, Card, message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  createItinerary,
  getItinerary,
  updateItinerary,
} from '#/api/gift/itinerary';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

defineOptions({ name: 'GiftItineraryForm' });

const { params } = useRoute();
const { closeCurrentTab } = useTabs();
const itineraryId = ref<number>();
const detailLoading = ref(false);
const submitLoading = ref(false);
let coverMetadataRequest = 0;
let picUrls: string[] = [];
let picSizeStates: PicSizeState[] = [];
const pendingPicSizes: PendingPicSize[] = [];
const picSizeRequests = new Set<Promise<void>>();

interface PendingPicSize {
  file: File;
  size?: GiftItineraryApi.ImageSize;
}

type PicSizeState = GiftItineraryApi.ImageSize | null | PendingPicSize;

function normalizeImageSize(value: unknown): GiftItineraryApi.ImageSize | null {
  if (!value || typeof value !== 'object') {
    return null;
  }
  const record = value as Record<string, unknown>;
  const height = Number(record.h ?? record.height);
  const width = Number(record.w ?? record.width);
  if (
    !Number.isFinite(height) ||
    !Number.isFinite(width) ||
    height <= 0 ||
    width <= 0
  ) {
    return null;
  }
  return { h: height, w: width };
}

function parseJsonArray(value: unknown): unknown[] {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value !== 'string' || !value.trim()) {
    return [];
  }
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** 将上传组件值和后端 JSON 字符串统一转换为 URL 数组。 */
function normalizePicUrls(value: unknown): string[] {
  const values = Array.isArray(value) ? value : parseJsonArray(value);
  if (values.length === 0 && typeof value === 'string' && value.trim()) {
    return [value.trim()];
  }
  return values
    .map((item) => {
      if (typeof item === 'string') {
        return item;
      }
      if (item && typeof item === 'object' && 'url' in item) {
        const url = (item as { url?: unknown }).url;
        return typeof url === 'string' ? url : '';
      }
      return '';
    })
    .filter(Boolean);
}

function getResolvedPicSize(
  state: PicSizeState,
): GiftItineraryApi.ImageSize | null {
  if (!state) {
    return null;
  }
  return 'file' in state ? (state.size ?? null) : state;
}

function getPicSizes(): Array<GiftItineraryApi.ImageSize | null> {
  return picSizeStates.map((state) => getResolvedPicSize(state));
}

async function syncPicSizesField() {
  await formApi.setFieldValue('picSizes', JSON.stringify(getPicSizes()));
}

function syncPicSizeStates(value: unknown) {
  const nextUrls = normalizePicUrls(value);
  const usedPreviousIndexes = new Set<number>();
  const nextStates = nextUrls.map((url) => {
    const previousIndex = picUrls.findIndex(
      (previousUrl, index) =>
        previousUrl === url && !usedPreviousIndexes.has(index),
    );
    if (previousIndex !== -1) {
      usedPreviousIndexes.add(previousIndex);
      return picSizeStates[previousIndex] ?? null;
    }
    return pendingPicSizes.shift() ?? null;
  });
  picUrls = nextUrls;
  picSizeStates = nextStates;
}

function initializePicSizeStates(urls: string[], value: unknown) {
  const sizes = parseJsonArray(value);
  pendingPicSizes.length = 0;
  picUrls = urls;
  picSizeStates = urls.map((_, index) => normalizeImageSize(sizes[index]));
}

async function readImageSize(
  file: File,
): Promise<GiftItineraryApi.ImageSize | null> {
  if (typeof createImageBitmap === 'function') {
    try {
      const bitmap = await createImageBitmap(file, {
        imageOrientation: 'from-image',
      });
      try {
        return normalizeImageSize({ h: bitmap.height, w: bitmap.width });
      } finally {
        bitmap.close();
      }
    } catch {
      // 部分格式或旧浏览器不支持 ImageBitmap，降级为浏览器图片解码。
    }
  }

  const objectUrl = URL.createObjectURL(file);
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener('load', () => {
      URL.revokeObjectURL(objectUrl);
      resolve(
        normalizeImageSize({
          h: image.naturalHeight,
          w: image.naturalWidth,
        }),
      );
    });
    image.addEventListener('error', () => {
      URL.revokeObjectURL(objectUrl);
      resolve(null);
    });
    image.src = objectUrl;
  });
}

async function clearCoverSize() {
  coverMetadataRequest++;
  await formApi.setValues({ coverHeight: null, coverWidth: null });
}

async function handleCoverFileSelect(file: File) {
  const request = ++coverMetadataRequest;
  const size = await readImageSize(file);
  if (request !== coverMetadataRequest) {
    return;
  }
  await formApi.setValues({
    coverHeight: size?.h ?? null,
    coverWidth: size?.w ?? null,
  });
}

function handlePicFileSelect(file: File) {
  const pendingSize: PendingPicSize = { file };
  pendingPicSizes.push(pendingSize);
  const request = (async () => {
    pendingSize.size = (await readImageSize(file)) ?? undefined;
    await syncPicSizesField();
  })();
  picSizeRequests.add(request);
  void request.finally(() => picSizeRequests.delete(request));
}

function handlePicDelete(file: UploadFile) {
  const index = pendingPicSizes.findIndex(
    (pendingSize) => pendingSize.file === file.originFileObj,
  );
  if (index !== -1) {
    pendingPicSizes.splice(index, 1);
  }
}

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    formItemClass: 'col-span-2',
    labelWidth: 80,
  },
  layout: 'horizontal',
  schema: useFormSchema({
    onCoverDelete: clearCoverSize,
    onCoverFileSelect: handleCoverFileSelect,
    onPicDelete: handlePicDelete,
    onPicFileSelect: handlePicFileSelect,
  }),
  showDefaultActions: false,
  handleValuesChange: async (values, fieldsChanged) => {
    if (fieldsChanged.includes('picUrls')) {
      syncPicSizeStates(values.picUrls);
      await syncPicSizesField();
    }
  },
});

/** 提交表单 */
async function handleSubmit() {
  const { valid } = await formApi.validate();
  if (!valid) {
    return;
  }
  await Promise.all(picSizeRequests);
  const formValues = (await formApi.getValues()) as GiftItineraryApi.Itinerary;
  const normalizedPicUrls = normalizePicUrls(formValues.picUrls);
  syncPicSizeStates(normalizedPicUrls);
  const picSizes = getPicSizes();
  if (picSizes.some((size) => !size)) {
    message.error('无法读取图片尺寸，请重新上传对应图片');
    return;
  }
  const data: GiftItineraryApi.Itinerary = {
    ...formValues,
    picSizes: JSON.stringify(picSizes),
    picUrls: JSON.stringify(normalizedPicUrls),
  };
  submitLoading.value = true;
  try {
    await (itineraryId.value ? updateItinerary(data) : createItinerary(data));
    message.success($t('ui.actionMessage.operationSuccess'));
    await closeCurrentTab();
  } finally {
    submitLoading.value = false;
  }
}

/** 获取行程详情 */
async function getDetail() {
  detailLoading.value = true;
  try {
    const data = await getItinerary(itineraryId.value!);
    const normalizedPicUrls = normalizePicUrls(data.picUrls);
    initializePicSizeStates(normalizedPicUrls, data.picSizes);
    await formApi.setValues({
      ...data,
      picSizes: JSON.stringify(getPicSizes()),
      picUrls: normalizedPicUrls,
    });
  } finally {
    detailLoading.value = false;
  }
}

onMounted(async () => {
  itineraryId.value = params.id ? Number(params.id) : undefined;
  if (itineraryId.value) {
    await getDetail();
  }
});
</script>

<template>
  <Page>
    <Card class="w-full" :loading="detailLoading">
      <Form class="mx-auto w-full xl:w-4/5" />
      <div class="mt-4 flex justify-center gap-2">
        <Button type="primary" :loading="submitLoading" @click="handleSubmit">
          保存
        </Button>
        <Button @click="() => closeCurrentTab()">取消</Button>
      </div>
    </Card>
  </Page>
</template>
