import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { GiftItineraryDayApi } from '#/api/gift/itineraryday';

import { markRaw } from 'vue';

import { AreaLevelEnum } from '@vben/constants';

import { getItineraryPage } from '#/api/gift/itinerary';
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
      fieldName: 'itineraryId',
      label: '行程',
      rules: 'required',
      component: 'ApiSelect',
      componentProps: {
        api: async () => {
          const data = await getItineraryPage({
            pageNo: 1,
            pageSize: 100,
          });
          return data.list;
        },
        labelField: 'title',
        placeholder: '请选择行程',
        showSearch: true,
        valueField: 'id',
      },
    },
    {
      fieldName: 'day',
      label: '行程第几天，从1开始',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入行程第几天，从1开始',
      },
    },
    {
      fieldName: 'cityId',
      label: '当日城市',
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
      fieldName: 'districtId',
      label: '当日区县ID',
      component: 'Input',
      componentProps: {
        placeholder: '请输入当日区县ID',
      },
    },
    {
      fieldName: 'title',
      label: '当日标题',
      component: 'Input',
      componentProps: {
        placeholder: '请输入当日标题',
      },
    },
    {
      fieldName: 'description',
      label: '当日描述',
      component: 'Textarea',
    },
    {
      fieldName: 'sort',
      label: '排序值',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入排序值',
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'itineraryId',
      label: '行程',
      component: 'ApiSelect',
      componentProps: {
        allowClear: true,
        api: async () => {
          const data = await getItineraryPage({
            pageNo: 1,
            pageSize: 100,
          });
          return data.list;
        },
        labelField: 'title',
        placeholder: '请选择行程',
        showSearch: true,
        valueField: 'id',
      },
    },
    {
      fieldName: 'day',
      label: '行程第几天，从1开始',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入行程第几天，从1开始',
      },
    },
    {
      fieldName: 'cityId',
      label: '当日城市',
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
      fieldName: 'districtId',
      label: '当日区县ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入当日区县ID',
      },
    },
    {
      fieldName: 'title',
      label: '当日标题',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入当日标题',
      },
    },
    {
      fieldName: 'description',
      label: '当日描述',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入当日描述',
      },
    },
    {
      fieldName: 'sort',
      label: '排序值',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入排序值',
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
export function useGridColumns(): VxeTableGridOptions<GiftItineraryDayApi.ItineraryDay>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: '通用行程日程ID',
      minWidth: 120,
    },
    {
      field: 'itineraryId',
      title: '通用行程ID',
      minWidth: 120,
    },
    {
      field: 'day',
      title: '行程第几天，从1开始',
      minWidth: 120,
    },
    {
      field: 'cityId',
      title: '当日城市ID',
      minWidth: 120,
    },
    {
      field: 'districtId',
      title: '当日区县ID',
      minWidth: 120,
    },
    {
      field: 'title',
      title: '当日标题',
      minWidth: 120,
    },
    {
      field: 'description',
      title: '当日描述',
      minWidth: 120,
    },
    {
      field: 'sort',
      title: '排序值',
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
