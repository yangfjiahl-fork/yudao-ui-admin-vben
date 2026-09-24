import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { GiftUserItineraryApi } from '#/api/gift/useritinerary';

import { markRaw } from 'vue';

import { AreaLevelEnum } from '@vben/constants';

import { AreaCascader } from '#/components/area';
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
      fieldName: 'memberId',
      label: '会员ID',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入会员ID',
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
      fieldName: 'startDate',
      label: '开始日期',
      component: 'DatePicker',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'x',
      },
    },
    {
      fieldName: 'endDate',
      label: '完成日期',
      component: 'DatePicker',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'x',
      },
    },
    {
      fieldName: 'dayCnt',
      label: '天数',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入天数',
      },
    },
    {
      fieldName: 'cityId',
      label: '城市',
      rules: 'required',
      component: markRaw(AreaCascader),
      componentProps: {
        class: '!w-full',
        level: AreaLevelEnum.CITY,
        placeholder: '请选择省市',
        showSearch: true,
      },
    },
    {
      fieldName: 'nextCityId',
      label: '下一城市',
      component: markRaw(AreaCascader),
      componentProps: {
        allowClear: true,
        class: '!w-full',
        level: AreaLevelEnum.CITY,
        placeholder: '请选择省市',
        showSearch: true,
      },
    },
    {
      fieldName: 'preference',
      label: '偏好',
      component: 'Input',
      componentProps: {
        placeholder: '请输入偏好',
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
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
      fieldName: 'title',
      label: '标题',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入标题',
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
      fieldName: 'startDate',
      label: '开始日期',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
    {
      fieldName: 'endDate',
      label: '完成日期',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
    {
      fieldName: 'dayCnt',
      label: '天数',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入天数',
      },
    },
    {
      fieldName: 'cityId',
      label: '城市',
      component: markRaw(AreaCascader),
      componentProps: {
        allowClear: true,
        class: '!w-full',
        level: AreaLevelEnum.CITY,
        placeholder: '请选择省市',
        showSearch: true,
      },
    },
    {
      fieldName: 'nextCityId',
      label: '下一城市',
      component: markRaw(AreaCascader),
      componentProps: {
        allowClear: true,
        class: '!w-full',
        level: AreaLevelEnum.CITY,
        placeholder: '请选择省市',
        showSearch: true,
      },
    },
    {
      fieldName: 'preference',
      label: '偏好',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入偏好',
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
export function useGridColumns(): VxeTableGridOptions<GiftUserItineraryApi.UserItinerary>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: '主键',
      minWidth: 120,
    },
    {
      field: 'memberId',
      title: '会员ID',
      minWidth: 120,
    },
    {
      field: 'title',
      title: '标题',
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
      field: 'startDate',
      title: '开始日期',
      minWidth: 120,
    },
    {
      field: 'endDate',
      title: '完成日期',
      minWidth: 120,
    },
    {
      field: 'dayCnt',
      title: '天数',
      minWidth: 120,
    },
    {
      field: 'cityId',
      title: '城市ID',
      minWidth: 120,
    },
    {
      field: 'nextCityId',
      title: '城市ID',
      minWidth: 120,
    },
    {
      field: 'preference',
      title: '偏好',
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
