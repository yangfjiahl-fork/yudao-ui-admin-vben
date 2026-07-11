<script lang="ts" setup>
import type { MemberSignInConfigApi } from '#/api/member/signin/config';

import { computed, nextTick, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  createSignInConfig,
  getSignInConfig,
  updateSignInConfig,
} from '#/api/member/signin/config';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emit = defineEmits(['success']);
const formData = ref<MemberSignInConfigApi.SignInConfig>();
function toNumber(value: unknown) {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }
  const numberValue = Number(value);
  return Number.isNaN(numberValue) ? undefined : numberValue;
}
function normalizeSignInConfig(data: MemberSignInConfigApi.SignInConfig) {
  return {
    ...data,
    id: toNumber(data.id),
    day: toNumber(data.day),
    point: toNumber(data.point),
    experience: toNumber(data.experience),
    status: toNumber(data.status),
  };
}
function getEmptyFormValues() {
  return {
    id: undefined,
    day: undefined,
    point: undefined,
    experience: undefined,
    status: undefined,
  };
}
const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', ['签到配置'])
    : $t('ui.actionTitle.create', ['签到配置']);
});

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    formItemClass: 'col-span-2',
    labelWidth: 90,
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
    const data =
      (await formApi.getValues()) as MemberSignInConfigApi.SignInConfig;
    try {
      await (formData.value?.id
        ? updateSignInConfig(data)
        : createSignInConfig(data));
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
    const data = modalApi.getData<MemberSignInConfigApi.SignInConfig>();
    await nextTick();
    await formApi.resetForm({ values: getEmptyFormValues() });
    if (!data || !data.id) {
      return;
    }
    modalApi.lock();
    try {
      formData.value = normalizeSignInConfig(await getSignInConfig(data.id));
      // 设置到 values
      await formApi.setValues(formData.value);
    } finally {
      modalApi.unlock();
    }
  },
});
</script>

<template>
  <Modal class="w-2/5" :title="getTitle">
    <Form class="mx-4" />
  </Modal>
</template>
