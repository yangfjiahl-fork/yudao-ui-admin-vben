<script lang="ts" setup>
import type { GiftArticleApi } from '#/api/gift/article';

import { nextTick, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page } from '@vben/common-ui';
import { useTabs } from '@vben/hooks';

import { Button, Card, message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { createArticle, getArticle, updateArticle } from '#/api/gift/article';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

defineOptions({ name: 'GiftArticleForm' });

const { params } = useRoute();
const { closeCurrentTab } = useTabs();
const articleId = ref<number>();
const detailLoading = ref(false);
const submitLoading = ref(false);

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
  schema: useFormSchema(),
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
  submitLoading.value = true;
  try {
    const data = (await formApi.getValues()) as GiftArticleApi.Article;
    data.sliderPicUrls = normalizeSliderPicUrls(data.sliderPicUrls);
    await (articleId.value ? updateArticle(data) : createArticle(data));
    message.success($t('ui.actionMessage.operationSuccess'));
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
      <Form class="mx-auto w-3/5" />
      <div class="mt-4 flex justify-center gap-2">
        <Button type="primary" :loading="submitLoading" @click="handleSubmit">
          保存
        </Button>
        <Button @click="() => closeCurrentTab()">取消</Button>
      </div>
    </Card>
  </Page>
</template>
