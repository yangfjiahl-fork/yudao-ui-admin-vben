<script lang="ts" setup>
import type { MemberConfigApi } from '#/api/member/config';

import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';
// import { fenToYuan, yuanToFen } from '@vben/utils';

import { Card, message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { getConfig, saveConfig } from '#/api/member/config';
import { $t } from '#/locales';

import { schema } from './data';

const formData = ref<MemberConfigApi.Config>();

const [Form, formApi] = useVbenForm({
  commonConfig: {
    labelWidth: 200,
  },
  layout: 'horizontal',
  schema,
  handleSubmit,
});

function yuanToFen(yuan: number) {
  return Math.round((yuan * 100 + Number.EPSILON) * 10) / 10;
}

function fenToYuan(fen: number) {
  return `${fen / 100}`;
}

/** 提交表单 */
async function handleSubmit() {
  const { valid } = await formApi.validate();
  if (!valid) {
    return;
  }
  // 提交表单
  const data = (await formApi.getValues()) as MemberConfigApi.Config;
  // 转换金额单位
  data.pointTradeDeductUnitPrice = yuanToFen(data.pointTradeDeductUnitPrice);
  await saveConfig(data);
  // 关闭并提示
  message.success($t('ui.actionMessage.operationSuccess'));
}

/** 获取配置 */
async function getConfigInfo() {
  const res = await getConfig();
  formData.value = res;
  // 转换金额单位
  res.pointTradeDeductUnitPrice = Number.parseFloat(
    fenToYuan(res.pointTradeDeductUnitPrice),
  );
  // 设置到 values
  await formApi.setValues(res);
}

/** 初始化 */
onMounted(() => {
  getConfigInfo();
});
</script>

<template>
  <Page auto-content-height>
    <Card title="积分设置">
      <Form class="w-1/3" />
    </Card>
  </Page>
</template>
