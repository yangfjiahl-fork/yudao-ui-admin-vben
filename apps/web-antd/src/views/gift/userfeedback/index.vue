<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { GiftUserFeedbackApi } from '#/api/gift/userfeedback';

import { h, ref } from 'vue';

import { confirm, Page, useVbenModal } from '@vben/common-ui';
import { downloadFileFromBlobPart, isEmpty } from '@vben/utils';

import { Input, message, Modal } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteUserFeedback,
  deleteUserFeedbackList,
  exportUserFeedback,
  getUserFeedbackPage,
  processUserFeedback,
} from '#/api/gift/userfeedback';
import { $t } from '#/locales';

import { useGridColumns, useGridFormSchema } from './data';
import Form from './modules/form.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

/** 刷新表格 */
function handleRefresh() {
  gridApi.query();
}

/** 创建用户反馈 */
function handleCreate() {
  formModalApi.setData(null).open();
}

/** 编辑用户反馈 */
function handleEdit(row: GiftUserFeedbackApi.UserFeedback) {
  formModalApi.setData(row).open();
}

/** 处理用户反馈 */
function handleProcess(row: GiftUserFeedbackApi.UserFeedback) {
  const processRemark = ref(row.processRemark ?? '');
  Modal.confirm({
    title: '处理用户反馈',
    content: () =>
      h(Input.TextArea, {
        value: processRemark.value,
        'onUpdate:value': (value: string) => (processRemark.value = value),
        maxLength: 2000,
        placeholder: '请输入处理说明',
        rows: 4,
        showCount: true,
      }),
    async onOk() {
      const remark = processRemark.value.trim();
      if (!remark) {
        message.warning('请输入处理说明');
        throw new Error('处理说明不能为空');
      }
      await processUserFeedback(row.id, remark);
      message.success('处理成功');
      handleRefresh();
    },
  });
}

/** 删除用户反馈 */
async function handleDelete(row: GiftUserFeedbackApi.UserFeedback) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.id]),
    duration: 0,
  });
  try {
    await deleteUserFeedback(row.id);
    message.success($t('ui.actionMessage.deleteSuccess', [row.id]));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

/** 批量删除用户反馈 */
async function handleDeleteBatch() {
  await confirm($t('ui.actionMessage.deleteBatchConfirm'));
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deletingBatch'),
    duration: 0,
  });
  try {
    await deleteUserFeedbackList(checkedIds.value);
    checkedIds.value = [];
    message.success($t('ui.actionMessage.deleteSuccess'));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

const checkedIds = ref<number[]>([]);
function handleRowCheckboxChange({
  records,
}: {
  records: GiftUserFeedbackApi.UserFeedback[];
}) {
  checkedIds.value = records.map((item) => item.id);
}

/** 导出表格 */
async function handleExport() {
  const data = await exportUserFeedback(await gridApi.formApi.getValues());
  downloadFileFromBlobPart({ fileName: '用户反馈.xls', source: data });
}

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
  },
  gridOptions: {
    columns: useGridColumns(),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getUserFeedbackPage({
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    rowConfig: {
      keyField: 'id',
      isHover: true,
    },
    toolbarConfig: {
      refresh: true,
      search: true,
    },
  } as VxeTableGridOptions<GiftUserFeedbackApi.UserFeedback>,
  gridEvents: {
    checkboxAll: handleRowCheckboxChange,
    checkboxChange: handleRowCheckboxChange,
  },
});
</script>

<template>
  <Page auto-content-height>
    <FormModal @success="handleRefresh" />
    <Grid table-title="用户反馈列表">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.create', ['用户反馈']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['gift:user-feedback:create'],
              onClick: handleCreate,
            },
            {
              label: $t('ui.actionTitle.export'),
              type: 'primary',
              icon: ACTION_ICON.DOWNLOAD,
              auth: ['gift:user-feedback:export'],
              onClick: handleExport,
            },
            {
              label: $t('ui.actionTitle.deleteBatch'),
              type: 'primary',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['gift:user-feedback:delete'],
              disabled: isEmpty(checkedIds),
              onClick: handleDeleteBatch,
            },
          ]"
        />
      </template>
      <template #actions="{ row }">
        <TableAction
          :actions="[
            {
              label: row.status === 1 ? '修改处理说明' : '处理',
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['gift:user-feedback:update'],
              onClick: handleProcess.bind(null, row),
            },
            {
              label: $t('common.edit'),
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['gift:user-feedback:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['gift:user-feedback:delete'],
              popConfirm: {
                title: $t('ui.actionMessage.deleteConfirm', [row.id]),
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>
