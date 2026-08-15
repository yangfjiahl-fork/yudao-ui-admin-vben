import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { GiftArticleSuffixApi } from '#/api/gift/articlesuffix';

/** 新增/修改的表单 */
export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'id',
      component: 'Input',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
    {
      fieldName: 'title',
      label: '签名标题',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入签名标题',
      },
    },
    {
      fieldName: 'content',
      label: '签名内容',
      rules: 'required',
      component: 'RichTextarea',
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'title',
      label: '签名标题',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入签名标题',
      },
    },
  ];
}

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions<GiftArticleSuffixApi.ArticleSuffix>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: 'ID',
      minWidth: 120,
    },
    {
      field: 'title',
      title: '签名标题',
      minWidth: 120,
    },
    {
      field: 'content',
      title: '签名内容',
      minWidth: 120,
    },
    {
      field: 'createTime',
      title: '创建时间',
      minWidth: 120,
      formatter: 'formatDateTime',
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
