<script lang="ts" setup>
import type { GiftWoolApi } from '#/api/gift/wool';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { createWool, getWool, updateWool } from '#/api/gift/wool';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emit = defineEmits(['success']);
const formData = ref<GiftWoolApi.Wool>();
const CREATE_WOOL_DEFAULT_VALUES: Partial<GiftWoolApi.Wool> = {
  bizType: '2',
  status: '1',
};
const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', ['羊毛'])
    : $t('ui.actionTitle.create', ['羊毛']);
});

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

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    modalApi.lock();
    // 提交表单
    const data = (await formApi.getValues()) as GiftWoolApi.Wool;
    try {
      await (formData.value?.id ? updateWool(data) : createWool(data));
      // 关闭并提示
      await modalApi.close();
      emit('success');
      message.success($t('ui.actionMessage.operationSuccess'));
    } finally {
      modalApi.unlock();
    }
  },
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      formData.value = undefined;
      return;
    }
    // 加载数据
    await formApi.resetForm();
    const data = modalApi.getData<GiftWoolApi.Wool>();
    if (!data || !data.id) {
      await formApi.setValues(CREATE_WOOL_DEFAULT_VALUES);
      return;
    }
    modalApi.lock();
    try {
      formData.value = await getWool(data.id);
      // 设置到 values
      await formApi.setValues(formData.value);
    } finally {
      modalApi.unlock();
    }
  },
});
</script>

<template>
  <Modal :title="getTitle">
    <Form class="mx-4" />
  </Modal>
</template>
