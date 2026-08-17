<script lang="ts" setup>
import type { UploadFile } from 'ant-design-vue';

import type { GiftArticleApi } from '#/api/gift/article';

import { nextTick, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page } from '@vben/common-ui';
import { useTabs } from '@vben/hooks';

import { Button, Card, message } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';
import { createArticle, getArticle, updateArticle } from '#/api/gift/article';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

defineOptions({ name: 'GiftArticleForm' });

const { params, name } = useRoute();
const { closeCurrentTab, refreshTab } = useTabs();
const articleId = ref<number>();
const detailLoading = ref(false);
const submitLoading = ref(false);
const isDetail = name === 'GiftArticleDetail';
let coverMetadataRequest = 0;
let pendingCoverSliderPicSize: PendingSliderPicSize | undefined;
let sliderPicUrls: string[] = [];
let sliderPicSizeStates: SliderPicSizeState[] = [];
const pendingSliderPicSizes: PendingSliderPicSize[] = [];
const sliderPicSizeRequests = new Set<Promise<void>>();

type CoverOrientation = NonNullable<GiftArticleApi.Article['coverOrientation']>;

interface CoverMetadata {
  coverHeight: number;
  coverOrientation: CoverOrientation;
  coverWidth: number;
}

interface PendingSliderPicSize {
  file: File;
  size?: GiftArticleApi.ImageSize;
}

type SliderPicSizeState =
  | GiftArticleApi.ImageSize
  | null
  | PendingSliderPicSize;

function getCoverMetadata(width: number, height: number): CoverMetadata | null {
  if (!width || !height) {
    return null;
  }
  return {
    coverWidth: width,
    coverHeight: height,
    coverOrientation:
      width === height ? 'square' : width > height ? 'landscape' : 'portrait',
  };
}

function getImageSize(
  metadata: CoverMetadata | null,
): GiftArticleApi.ImageSize | undefined {
  if (!metadata) {
    return undefined;
  }
  return {
    h: metadata.coverHeight,
    w: metadata.coverWidth,
  };
}

function normalizeSliderPicSize(
  value: unknown,
): GiftArticleApi.ImageSize | null {
  if (!value || typeof value !== 'object') {
    return null;
  }
  const { h, w } = value as Record<string, unknown>;
  const normalizedHeight = Number(h);
  const normalizedWidth = Number(w);
  if (
    !Number.isFinite(normalizedHeight) ||
    !Number.isFinite(normalizedWidth) ||
    normalizedHeight <= 0 ||
    normalizedWidth <= 0
  ) {
    return null;
  }
  return { h: normalizedHeight, w: normalizedWidth };
}

function getResolvedSliderPicSize(
  state: SliderPicSizeState,
): GiftArticleApi.ImageSize | null {
  if (!state) {
    return null;
  }
  return 'file' in state ? (state.size ?? null) : state;
}

function getSliderPicSizes(): Array<GiftArticleApi.ImageSize | null> {
  return sliderPicSizeStates.map((state) => getResolvedSliderPicSize(state));
}

async function syncSliderPicSizeField() {
  await formApi.setFieldValue('sliderPicSize', getSliderPicSizes());
}

function syncSliderPicSizeStates(value: unknown) {
  const nextUrls = normalizeSliderPicUrls(value);
  const usedPreviousIndexes = new Set<number>();
  const nextStates = nextUrls.map((url) => {
    const previousIndex = sliderPicUrls.findIndex(
      (previousUrl, index) =>
        previousUrl === url && !usedPreviousIndexes.has(index),
    );
    if (previousIndex !== -1) {
      usedPreviousIndexes.add(previousIndex);
      return sliderPicSizeStates[previousIndex] ?? null;
    }
    return pendingSliderPicSizes.shift() ?? null;
  });

  sliderPicUrls = nextUrls;
  sliderPicSizeStates = nextStates;
}

function initializeSliderPicSizeStates(urls: string[], value: unknown) {
  const sizes = Array.isArray(value) ? value : [];
  pendingSliderPicSizes.length = 0;
  sliderPicUrls = urls;
  sliderPicSizeStates = urls.map((_, index) =>
    normalizeSliderPicSize(sizes[index]),
  );
}

/**
 * 按浏览器最终显示的方向读取尺寸。createImageBitmap 默认应用 EXIF
 * Orientation（这里显式指定），不再手动交换宽高，避免手机 JPEG 被重复旋转。
 */
async function readCoverMetadata(file: File): Promise<CoverMetadata | null> {
  if (typeof createImageBitmap === 'function') {
    try {
      const bitmap = await createImageBitmap(file, {
        imageOrientation: 'from-image',
      });
      try {
        return getCoverMetadata(bitmap.width, bitmap.height);
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
      resolve(getCoverMetadata(image.naturalWidth, image.naturalHeight));
    });
    image.addEventListener('error', () => {
      URL.revokeObjectURL(objectUrl);
      resolve(null);
    });
    image.src = objectUrl;
  });
}

async function clearCoverMetadata() {
  coverMetadataRequest++;
  pendingCoverSliderPicSize = undefined;
  await formApi.setValues({
    coverHeight: null,
    coverOrientation: null,
    coverWidth: null,
  });
}

async function handleCoverFileSelect(file: File) {
  const request = ++coverMetadataRequest;
  const pendingSize: PendingSliderPicSize = { file };
  pendingCoverSliderPicSize = pendingSize;
  const metadata = await readCoverMetadata(file);
  if (request !== coverMetadataRequest) {
    return;
  }
  pendingSize.size = getImageSize(metadata);
  await formApi.setValues(
    metadata ?? {
      coverHeight: null,
      coverOrientation: null,
      coverWidth: null,
    },
  );
}

function handleSliderPicFileSelect(file: File) {
  const pendingSize: PendingSliderPicSize = { file };
  pendingSliderPicSizes.push(pendingSize);
  const request = (async () => {
    pendingSize.size = getImageSize(await readCoverMetadata(file));
    await syncSliderPicSizeField();
  })();
  sliderPicSizeRequests.add(request);
  void request.finally(() => sliderPicSizeRequests.delete(request));
}

function handleSliderPicDelete(file: UploadFile) {
  const index = pendingSliderPicSizes.findIndex(
    (pendingSize) => pendingSize.file === file.originFileObj,
  );
  if (index !== -1) {
    pendingSliderPicSizes.splice(index, 1);
  }
}

/** 将轮播图值统一转换为后端需要的 URL 数组 */
function normalizeSliderPicUrls(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
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
    onCoverDelete: clearCoverMetadata,
    onCoverFileSelect: handleCoverFileSelect,
    onSliderPicDelete: handleSliderPicDelete,
    onSliderPicFileSelect: handleSliderPicFileSelect,
  }),
  showDefaultActions: false,
  handleValuesChange: async (values, fieldsChanged) => {
    if (fieldsChanged.includes('sliderPicUrls')) {
      syncSliderPicSizeStates(values.sliderPicUrls);
      await syncSliderPicSizeField();
    }
    if (
      fieldsChanged.includes('coverImage') &&
      values.coverImage &&
      (!values.sliderPicUrls || values.sliderPicUrls.length === 0)
    ) {
      if (pendingCoverSliderPicSize) {
        pendingSliderPicSizes.push(pendingCoverSliderPicSize);
        pendingCoverSliderPicSize = undefined;
      }
      await formApi.setFieldValue('sliderPicUrls', [values.coverImage]);
    }
  },
});

/** 提交表单 */
async function handleSubmit() {
  const { valid } = await formApi.validate();
  if (!valid) {
    return;
  }
  await Promise.all(sliderPicSizeRequests);
  const formValues = (await formApi.getValues()) as GiftArticleApi.Article;
  const normalizedSliderPicUrls = normalizeSliderPicUrls(
    formValues.sliderPicUrls,
  );
  syncSliderPicSizeStates(normalizedSliderPicUrls);
  const sliderPicSizes = getSliderPicSizes();
  if (sliderPicSizes.some((size) => !size)) {
    message.error('无法读取轮播图尺寸，请重新上传对应图片');
    return;
  }
  const normalizedSliderPicSizes = sliderPicSizes.filter(
    (size): size is GiftArticleApi.ImageSize => size !== null,
  );
  const publishTime = Number(formValues.publishTime);
  if (!Number.isFinite(publishTime)) {
    message.error('发布时间格式不正确');
    return;
  }
  const data: GiftArticleApi.ArticleSaveReq = {
    ...formValues,
    publishTime,
    sliderPicUrls: normalizedSliderPicUrls,
    sliderPicSize: normalizedSliderPicSizes,
  };

  submitLoading.value = true;
  try {
    await (articleId.value ? updateArticle(data) : createArticle(data));
    message.success($t('ui.actionMessage.operationSuccess'));
    await refreshTab('GiftArticleCenter');
    await closeCurrentTab();
  } finally {
    submitLoading.value = false;
  }
}

/** 获取文章详情 */
async function getDetail() {
  detailLoading.value = true;
  try {
    const data = await getArticle(articleId.value!);
    const publishTime = dayjs(data.publishTime);
    const sliderPicUrls = normalizeSliderPicUrls(data.sliderPicUrls);
    initializeSliderPicSizeStates(sliderPicUrls, data.sliderPicSize);
    detailLoading.value = false;
    await nextTick();
    await formApi.setValues({
      ...data,
      publishTime: publishTime.isValid() ? publishTime.valueOf() : undefined,
      sliderPicUrls,
      sliderPicSize: getSliderPicSizes(),
    });
  } finally {
    detailLoading.value = false;
  }
}

onMounted(async () => {
  articleId.value = params.id ? Number(params.id) : undefined;
  if (articleId.value) {
    if (isDetail) {
      formApi.setDisabled(true);
    }
    await getDetail();
  }
});
</script>

<template>
  <Page>
    <Card class="w-full" :loading="detailLoading">
      <Form class="mx-auto w-full xl:w-4/5" />
      <div class="mt-4 flex justify-center gap-2">
        <Button
          v-if="!isDetail"
          type="primary"
          :loading="submitLoading"
          @click="handleSubmit"
        >
          保存
        </Button>
        <Button @click="() => closeCurrentTab()">
          {{ isDetail ? '返回列表' : '取消' }}
        </Button>
      </div>
    </Card>
  </Page>
</template>
