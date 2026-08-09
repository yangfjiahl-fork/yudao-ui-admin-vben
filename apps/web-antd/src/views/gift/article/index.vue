<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { GiftArticleApi } from '#/api/gift/article';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { confirm, Page } from '@vben/common-ui';
import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';
import { downloadFileFromBlobPart, isEmpty } from '@vben/utils';

import { message, Modal, Select } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  changeArticleStatus,
  deleteArticle,
  deleteArticleList,
  exportArticle,
  getArticlePage,
} from '#/api/gift/article';
import { $t } from '#/locales';

import { useGridColumns, useGridFormSchema } from './data';

const { push } = useRouter();

const ArticleStatus = {
  ONLINE: 5,
  OFFLINE: 3,
} as const;

/** 刷新表格 */
function handleRefresh() {
  gridApi.query();
}

/** 创建文章 */
function handleCreate() {
  push({ name: 'GiftArticleAdd' });
}

/** 编辑文章 */
function handleEdit(row: GiftArticleApi.Article) {
  push({ name: 'GiftArticleEdit', params: { id: row.id } });
}

/** 查看文章详情 */
function handleDetail(row: GiftArticleApi.Article) {
  push({ name: 'GiftArticleDetail', params: { id: row.id } });
}

/** 修改文章状态 */
async function handleChangeStatus(ids: number[], status: number) {
  await changeArticleStatus(ids, status);
  message.success($t('ui.actionMessage.operationSuccess'));
  handleRefresh();
}

const batchStatusModalOpen = ref(false);
const batchStatusLoading = ref(false);
const batchStatus = ref<number>();
const articleStatusOptions = getDictOptions(
  DICT_TYPE.GIFT_ARTICLE_STATUS,
  'number',
);

/** 打开批量更新状态弹窗 */
function handleOpenBatchStatusModal() {
  batchStatus.value = undefined;
  batchStatusModalOpen.value = true;
}

/** 批量更新文章状态 */
async function handleBatchChangeStatus() {
  if (batchStatus.value === undefined) {
    message.warning('请选择状态');
    return;
  }

  batchStatusLoading.value = true;
  try {
    await handleChangeStatus(checkedIds.value, batchStatus.value);
    checkedIds.value = [];
    batchStatusModalOpen.value = false;
  } finally {
    batchStatusLoading.value = false;
  }
}

/** 删除文章 */
async function handleDelete(row: GiftArticleApi.Article) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.id]),
    duration: 0,
  });
  try {
    await deleteArticle(row.id!);
    message.success($t('ui.actionMessage.deleteSuccess', [row.id]));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

/** 批量删除文章 */
async function handleDeleteBatch() {
  await confirm($t('ui.actionMessage.deleteBatchConfirm'));
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deletingBatch'),
    duration: 0,
  });
  try {
    await deleteArticleList(checkedIds.value);
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
  records: GiftArticleApi.Article[];
}) {
  checkedIds.value = records.map((item) => item.id!);
}

/** 导出表格 */
async function handleExport() {
  const data = await exportArticle(await gridApi.formApi.getValues());
  downloadFileFromBlobPart({ fileName: '文章.xls', source: data });
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
          return await getArticlePage({
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
  } as VxeTableGridOptions<GiftArticleApi.Article>,
  gridEvents: {
    checkboxAll: handleRowCheckboxChange,
    checkboxChange: handleRowCheckboxChange,
  },
});
</script>

<template>
  <Page auto-content-height>
    <Grid table-title="文章列表">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.create', ['文章']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['gift:article:create'],
              onClick: handleCreate,
            },
            {
              label: $t('ui.actionTitle.export'),
              type: 'primary',
              icon: ACTION_ICON.DOWNLOAD,
              auth: ['gift:article:export'],
              onClick: handleExport,
            },
            {
              label: '批量更新',
              type: 'primary',
              icon: ACTION_ICON.EDIT,
              auth: ['gift:article:update'],
              disabled: isEmpty(checkedIds),
              onClick: handleOpenBatchStatusModal,
            },
            {
              label: $t('ui.actionTitle.deleteBatch'),
              type: 'primary',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['gift:article:delete'],
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
              auth: ['gift:article:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.detail'),
              type: 'link',
              icon: ACTION_ICON.VIEW,
              onClick: handleDetail.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['gift:article:delete'],
              popConfirm: {
                title: $t('ui.actionMessage.deleteConfirm', [row.id]),
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
          :drop-down-actions="[
            {
              label: '发布',
              auth: ['gift:article:update'],
              ifShow: () => row.status !== ArticleStatus.ONLINE,
              popConfirm: {
                title: '确认发布该文章？',
                confirm: handleChangeStatus.bind(
                  null,
                  [row.id!],
                  ArticleStatus.ONLINE,
                ),
              },
            },
            {
              label: '下线',
              auth: ['gift:article:update'],
              ifShow: () => row.status === ArticleStatus.ONLINE,
              popConfirm: {
                title: '确认下线该文章？',
                confirm: handleChangeStatus.bind(
                  null,
                  [row.id!],
                  ArticleStatus.OFFLINE,
                ),
              },
            },
          ]"
        />
      </template>
    </Grid>

    <Modal
      v-model:open="batchStatusModalOpen"
      title="批量更新状态"
      :confirm-loading="batchStatusLoading"
      @ok="handleBatchChangeStatus"
    >
      <div class="flex items-center gap-3">
        <span>状态</span>
        <Select
          v-model:value="batchStatus"
          class="w-60"
          :options="articleStatusOptions"
          placeholder="请选择状态"
        />
      </div>
    </Modal>
  </Page>
</template>
