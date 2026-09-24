<script lang="ts" setup>
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
});

/** 提交表单 */
async function handleSubmit() {
  const { valid } = await formApi.validate();
  if (!valid) {
    return;
  }
  const data = (await formApi.getValues()) as GiftItineraryApi.Itinerary;
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
    await formApi.setValues(data);
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
