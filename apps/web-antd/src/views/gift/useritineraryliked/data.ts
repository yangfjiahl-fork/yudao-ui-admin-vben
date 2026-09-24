import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { GiftUserItineraryLikedApi } from '#/api/gift/useritineraryliked';

import { getRangePickerDefaultProps } from '#/utils';

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
      fieldName: 'itineraryId',
      label: '行程ID',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入行程ID',
      },
    },
    {
      fieldName: 'memberId',
      label: '会员ID',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入会员ID',
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'itineraryId',
      label: '行程ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入行程ID',
      },
    },
    {
      fieldName: 'memberId',
      label: '会员ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入会员ID',
      },
    },
    {
      fieldName: 'createTime',
      label: '创建时间',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
  ];
}

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions<GiftUserItineraryLikedApi.UserItineraryLiked>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: '主键',
      minWidth: 120,
    },
    {
      field: 'itineraryId',
      title: '行程ID',
      minWidth: 120,
    },
    {
      field: 'memberId',
      title: '会员ID',
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
