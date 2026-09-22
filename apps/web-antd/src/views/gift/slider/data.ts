import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { GiftSliderApi } from '#/api/gift/slider';

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
      fieldName: 'positionCode',
      label: '轮播位置',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入轮播位置',
      },
    },
    {
      fieldName: 'cityId',
      label: '城市ID',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入城市ID',
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'positionCode',
      label: '轮播位置',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入轮播位置',
      },
    },
    {
      fieldName: 'cityId',
      label: '城市ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入城市ID',
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
export function useGridColumns(): VxeTableGridOptions<GiftSliderApi.Slider>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: '主键',
      minWidth: 120,
    },
    {
      field: 'positionCode',
      title: '轮播位置',
      minWidth: 120,
    },
    {
      field: 'cityId',
      title: '城市ID',
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
