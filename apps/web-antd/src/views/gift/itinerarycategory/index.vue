<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { GiftItineraryCategoryApi } from '#/api/gift/itinerarycategory';

import { ref } from 'vue';

import { confirm, Page, useVbenModal } from '@vben/common-ui';
import { CommonStatusEnum } from '@vben/constants';
import { downloadFileFromBlobPart, isEmpty } from '@vben/utils';

import { message } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteItineraryCategory,
  deleteItineraryCategoryList,
  exportItineraryCategory,
  getItineraryCategoryPage,
  updateItineraryCategory,
} from '#/api/gift/itinerarycategory';
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

/** 创建行程类别 */
function handleCreate() {
  formModalApi.setData(null).open();
}

/** 编辑行程类别 */
function handleEdit(row: GiftItineraryCategoryApi.ItineraryCategory) {
  formModalApi.setData(row).open();
}

/** 启用/禁用行程类别 */
async function handleStatusChange(
  row: GiftItineraryCategoryApi.ItineraryCategory,
) {
  const newStatus =
    row.status === CommonStatusEnum.ENABLE
      ? CommonStatusEnum.DISABLE
      : CommonStatusEnum.ENABLE;
  const actionText = newStatus === CommonStatusEnum.ENABLE ? '启用' : '禁用';
  await confirm(`确认要${actionText}行程类别“${row.title ?? row.id}”吗？`);
  await updateItineraryCategory({ ...row, status: newStatus });
  message.success(`${actionText}成功`);
  handleRefresh();
}

/** 删除行程类别 */
async function handleDelete(row: GiftItineraryCategoryApi.ItineraryCategory) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.id]),
    duration: 0,
  });
  try {
    await deleteItineraryCategory(row.id!);
    message.success($t('ui.actionMessage.deleteSuccess', [row.id]));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

/** 批量删除行程类别 */
async function handleDeleteBatch() {
  await confirm($t('ui.actionMessage.deleteBatchConfirm'));
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deletingBatch'),
    duration: 0,
  });
  try {
    await deleteItineraryCategoryList(checkedIds.value);
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
  records: GiftItineraryCategoryApi.ItineraryCategory[];
}) {
  checkedIds.value = records.map((item) => item.id!);
}

/** 导出表格 */
async function handleExport() {
  const data = await exportItineraryCategory(await gridApi.formApi.getValues());
  downloadFileFromBlobPart({ fileName: '行程类别.xls', source: data });
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
          return await getItineraryCategoryPage({
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
  } as VxeTableGridOptions<GiftItineraryCategoryApi.ItineraryCategory>,
  gridEvents: {
    checkboxAll: handleRowCheckboxChange,
    checkboxChange: handleRowCheckboxChange,
  },
});
</script>

<template>
  <Page auto-content-height>
    <FormModal @success="handleRefresh" />
    <Grid table-title="行程类别列表">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.create', ['行程类别']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['gift:itinerary-category:create'],
              onClick: handleCreate,
            },
            {
              label: $t('ui.actionTitle.export'),
              type: 'primary',
              icon: ACTION_ICON.DOWNLOAD,
              auth: ['gift:itinerary-category:export'],
              onClick: handleExport,
            },
            {
              label: $t('ui.actionTitle.deleteBatch'),
              type: 'primary',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['gift:itinerary-category:delete'],
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
              label: $t('common.edit'),
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['gift:itinerary-category:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: row.status === CommonStatusEnum.ENABLE ? '禁用' : '启用',
              type: 'link',
              danger: row.status === CommonStatusEnum.ENABLE,
              icon: ACTION_ICON.REFRESH,
              auth: ['gift:itinerary-category:update'],
              onClick: handleStatusChange.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['gift:itinerary-category:delete'],
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
