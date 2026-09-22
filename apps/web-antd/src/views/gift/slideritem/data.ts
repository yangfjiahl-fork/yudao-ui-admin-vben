import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { GiftSliderItemApi } from '#/api/gift/slideritem';

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
      fieldName: 'sliderId',
      label: '轮播ID',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入轮播ID',
      },
    },
    {
      fieldName: 'imageUrl',
      label: '图片地址',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入图片地址',
      },
    },
    {
      fieldName: 'imageWidth',
      label: '图片宽度',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入图片宽度',
      },
    },
    {
      fieldName: 'imageHeight',
      label: '图片高度',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入图片高度',
      },
    },
    {
      fieldName: 'sort',
      label: '顺序',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入顺序',
      },
    },
    {
      fieldName: 'jumpPage',
      label: '跳转页面',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入跳转页面',
      },
    },
    {
      fieldName: 'jumpPageId',
      label: '跳转页面ID',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入跳转页面ID',
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'sliderId',
      label: '轮播ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入轮播ID',
      },
    },
    {
      fieldName: 'imageUrl',
      label: '图片地址',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入图片地址',
      },
    },
    {
      fieldName: 'imageWidth',
      label: '图片宽度',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入图片宽度',
      },
    },
    {
      fieldName: 'imageHeight',
      label: '图片高度',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入图片高度',
      },
    },
    {
      fieldName: 'sort',
      label: '顺序',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入顺序',
      },
    },
    {
      fieldName: 'jumpPage',
      label: '跳转页面',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入跳转页面',
      },
    },
    {
      fieldName: 'jumpPageId',
      label: '跳转页面ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入跳转页面ID',
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
export function useGridColumns(): VxeTableGridOptions<GiftSliderItemApi.SliderItem>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: '主键',
      minWidth: 120,
    },
    {
      field: 'sliderId',
      title: '轮播ID',
      minWidth: 120,
    },
    {
      field: 'imageUrl',
      title: '图片地址',
      minWidth: 120,
    },
    {
      field: 'imageWidth',
      title: '图片宽度',
      minWidth: 120,
    },
    {
      field: 'imageHeight',
      title: '图片高度',
      minWidth: 120,
    },
    {
      field: 'sort',
      title: '顺序',
      minWidth: 120,
    },
    {
      field: 'jumpPage',
      title: '跳转页面',
      minWidth: 120,
    },
    {
      field: 'jumpPageId',
      title: '跳转页面ID',
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
