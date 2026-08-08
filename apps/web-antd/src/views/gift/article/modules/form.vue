<script lang="ts" setup>
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

const { params } = useRoute();
const { closeCurrentTab, refreshTab } = useTabs();
const articleId = ref<number>();
const detailLoading = ref(false);
const submitLoading = ref(false);
let coverMetadataRequest = 0;

type CoverOrientation = NonNullable<GiftArticleApi.Article['coverOrientation']>;

interface CoverMetadata {
  coverHeight: number;
  coverOrientation: CoverOrientation;
  coverWidth: number;
}

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
  await formApi.setValues({
    coverHeight: null,
    coverOrientation: null,
    coverWidth: null,
  });
}

async function handleCoverFileSelect(file: File) {
  const request = ++coverMetadataRequest;
  const metadata = await readCoverMetadata(file);
  if (request !== coverMetadataRequest) {
    return;
  }
  await formApi.setValues(
    metadata ?? {
      coverHeight: null,
      coverOrientation: null,
      coverWidth: null,
    },
  );
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
  }),
  showDefaultActions: false,
  handleValuesChange: async (values, fieldsChanged) => {
    if (
      fieldsChanged.includes('coverImage') &&
      values.coverImage &&
      (!values.sliderPicUrls || values.sliderPicUrls.length === 0)
    ) {
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
  const data = (await formApi.getValues()) as GiftArticleApi.Article;
  data.sliderPicUrls = normalizeSliderPicUrls(data.sliderPicUrls);
  const publishTime = dayjs(data.publishTime);
  if (!publishTime.isValid()) {
    message.error('发布时间格式不正确');
    return;
  }
  data.publishTime = publishTime.format('YYYY-MM-DD HH:mm:ss');

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
    data.sliderPicUrls = normalizeSliderPicUrls(data.sliderPicUrls);
    if (data.publishTime) {
      const publishTime = dayjs(data.publishTime);
      data.publishTime = publishTime.isValid()
        ? publishTime.valueOf().toString()
        : undefined;
    }
    detailLoading.value = false;
    await nextTick();
    await formApi.setValues(data);
  } finally {
    detailLoading.value = false;
  }
}

onMounted(async () => {
  articleId.value = params.id ? Number(params.id) : undefined;
  if (articleId.value) {
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
