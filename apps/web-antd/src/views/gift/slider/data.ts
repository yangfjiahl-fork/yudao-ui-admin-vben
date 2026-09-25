import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { GiftSliderApi } from '#/api/gift/slider';

import { markRaw } from 'vue';

import { AreaLevelEnum, DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

import { AreaCascader } from '#/components/area';

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
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.GIFT_SLIDER_POSITION, 'string'),
        placeholder: '请选择轮播位置',
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
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'positionCode',
      label: '轮播位置',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: getDictOptions(DICT_TYPE.GIFT_SLIDER_POSITION, 'string'),
        placeholder: '请选择轮播位置',
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
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.GIFT_SLIDER_POSITION },
      },
    },
    {
      field: 'cityId',
      title: '城市',
      minWidth: 180,
      formatter: ({ row }) =>
        `${row.provinceName || '全部省份'}/${row.cityName || '全部城市'}`,
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
