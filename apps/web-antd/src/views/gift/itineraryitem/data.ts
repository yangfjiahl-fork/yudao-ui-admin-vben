import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { GiftItineraryItemApi } from '#/api/gift/itineraryitem';

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
      label: '线路ID',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入线路ID',
      },
    },
    {
      fieldName: 'provinceId',
      label: '省ID',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入省ID',
      },
    },
    {
      fieldName: 'cityId',
      label: '市ID',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入市ID',
      },
    },
    {
      fieldName: 'districtId',
      label: '区ID',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入区ID',
      },
    },
    {
      fieldName: 'title',
      label: '标题',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入标题',
      },
    },
    {
      fieldName: 'subTitle',
      label: '副标题',
      component: 'Input',
      componentProps: {
        placeholder: '请输入副标题',
      },
    },
    {
      fieldName: 'description',
      label: '描述',
      rules: 'required',
      component: 'RichTextarea',
    },
    {
      fieldName: 'coverUrl',
      label: '封面图',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入封面图',
      },
    },
    {
      fieldName: 'coverWidth',
      label: '宽度',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入宽度',
      },
    },
    {
      fieldName: 'coverHeight',
      label: '高度',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入高度',
      },
    },
    {
      fieldName: 'picUrls',
      label: '轮播图',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入轮播图',
      },
    },
    {
      fieldName: 'picSizes',
      label: '尺寸',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入尺寸',
      },
    },
    {
      fieldName: 'tags',
      label: '标签',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入标签',
      },
    },
    {
      fieldName: 'sort',
      label: '排序',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入排序',
      },
    },
    {
      fieldName: 'gdPosition',
      label: '位置',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入位置',
      },
    },
    {
      fieldName: 'businessTime',
      label: '营业时间',
      component: 'DatePicker',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'x',
      },
    },
    {
      fieldName: 'addressDetail',
      label: '详细地址',
      component: 'Input',
      componentProps: {
        placeholder: '请输入详细地址',
      },
    },
    {
      fieldName: 'phoneNo',
      label: '电话',
      component: 'Input',
      componentProps: {
        placeholder: '请输入电话',
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'itineraryId',
      label: '线路ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入线路ID',
      },
    },
    {
      fieldName: 'provinceId',
      label: '省ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入省ID',
      },
    },
    {
      fieldName: 'cityId',
      label: '市ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入市ID',
      },
    },
    {
      fieldName: 'districtId',
      label: '区ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入区ID',
      },
    },
    {
      fieldName: 'title',
      label: '标题',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入标题',
      },
    },
    {
      fieldName: 'subTitle',
      label: '副标题',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入副标题',
      },
    },
    {
      fieldName: 'description',
      label: '描述',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入描述',
      },
    },
    {
      fieldName: 'coverUrl',
      label: '封面图',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入封面图',
      },
    },
    {
      fieldName: 'coverWidth',
      label: '宽度',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入宽度',
      },
    },
    {
      fieldName: 'coverHeight',
      label: '高度',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入高度',
      },
    },
    {
      fieldName: 'picUrls',
      label: '轮播图',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入轮播图',
      },
    },
    {
      fieldName: 'picSizes',
      label: '尺寸',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入尺寸',
      },
    },
    {
      fieldName: 'tags',
      label: '标签',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入标签',
      },
    },
    {
      fieldName: 'sort',
      label: '排序',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入排序',
      },
    },
    {
      fieldName: 'gdPosition',
      label: '位置',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入位置',
      },
    },
    {
      fieldName: 'businessTime',
      label: '营业时间',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
    {
      fieldName: 'addressDetail',
      label: '详细地址',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入详细地址',
      },
    },
    {
      fieldName: 'phoneNo',
      label: '电话',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入电话',
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
export function useGridColumns(): VxeTableGridOptions<GiftItineraryItemApi.ItineraryItem>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: '主键',
      minWidth: 120,
    },
    {
      field: 'itineraryId',
      title: '线路ID',
      minWidth: 120,
    },
    {
      field: 'provinceId',
      title: '省ID',
      minWidth: 120,
    },
    {
      field: 'cityId',
      title: '市ID',
      minWidth: 120,
    },
    {
      field: 'districtId',
      title: '区ID',
      minWidth: 120,
    },
    {
      field: 'title',
      title: '标题',
      minWidth: 120,
    },
    {
      field: 'subTitle',
      title: '副标题',
      minWidth: 120,
    },
    {
      field: 'description',
      title: '描述',
      minWidth: 120,
    },
    {
      field: 'coverUrl',
      title: '封面图',
      minWidth: 120,
    },
    {
      field: 'coverWidth',
      title: '宽度',
      minWidth: 120,
    },
    {
      field: 'coverHeight',
      title: '高度',
      minWidth: 120,
    },
    {
      field: 'picUrls',
      title: '轮播图',
      minWidth: 120,
    },
    {
      field: 'picSizes',
      title: '尺寸',
      minWidth: 120,
    },
    {
      field: 'tags',
      title: '标签',
      minWidth: 120,
    },
    {
      field: 'sort',
      title: '排序',
      minWidth: 120,
    },
    {
      field: 'gdPosition',
      title: '位置',
      minWidth: 120,
    },
    {
      field: 'businessTime',
      title: '营业时间',
      minWidth: 120,
    },
    {
      field: 'addressDetail',
      title: '详细地址',
      minWidth: 120,
    },
    {
      field: 'phoneNo',
      title: '电话',
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
