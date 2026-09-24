import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { GiftUserItineraryDayApi } from '#/api/gift/useritineraryday';

import { markRaw } from 'vue';

import { AreaLevelEnum } from '@vben/constants';

import { getUserItineraryPage } from '#/api/gift/useritinerary';
import { AreaCascader } from '#/components/area';
import { getRangePickerDefaultProps } from '#/utils';

/** 获取用户行程下拉选项 */
async function getUserItineraryOptions() {
  const data = await getUserItineraryPage({ pageNo: 1, pageSize: 100 });
  return data.list;
}

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
      fieldName: 'userItineraryId',
      label: '用户行程',
      rules: 'required',
      component: 'ApiSelect',
      componentProps: {
        api: getUserItineraryOptions,
        labelField: 'title',
        placeholder: '请选择用户行程',
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
      fieldName: 'date',
      label: '行程日期',
      component: 'DatePicker',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'x',
      },
    },
    {
      fieldName: 'provinceId',
      label: '当日省级区域ID',
      component: 'Input',
      componentProps: {
        placeholder: '请输入当日省级区域ID',
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
      fieldName: 'city',
      label: '当日城市名称',
      component: 'Input',
      componentProps: {
        placeholder: '请输入当日城市名称',
      },
    },
    {
      fieldName: 'area',
      label: '当日游玩区域',
      component: 'Input',
      componentProps: {
        placeholder: '请输入当日游玩区域',
      },
    },
    {
      fieldName: 'theme',
      label: '当日行程主题',
      component: 'Input',
      componentProps: {
        placeholder: '请输入当日行程主题',
      },
    },
    {
      fieldName: 'anchorPoiNamesJson',
      label: '当日锚点POI名称JSON',
      component: 'Input',
      componentProps: {
        placeholder: '请输入当日锚点POI名称JSON',
      },
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
    {
      fieldName: 'overviewStatus',
      label: '每日总览生成状态',
      component: 'RadioGroup',
      componentProps: {
        options: [],
        buttonStyle: 'solid',
        optionType: 'button',
      },
    },
    {
      fieldName: 'overviewSkeleton',
      label: '每日总览骨架文案',
      component: 'Input',
      componentProps: {
        placeholder: '请输入每日总览骨架文案',
      },
    },
    {
      fieldName: 'overviewDetail',
      label: '每日总览详细文案',
      component: 'Input',
      componentProps: {
        placeholder: '请输入每日总览详细文案',
      },
    },
    {
      fieldName: 'planner',
      label: '当日规划器',
      component: 'Input',
      componentProps: {
        placeholder: '请输入当日规划器',
      },
    },
    {
      fieldName: 'planningStatus',
      label: '当日排程状态',
      component: 'RadioGroup',
      componentProps: {
        options: [],
        buttonStyle: 'solid',
        optionType: 'button',
      },
    },
    {
      fieldName: 'macroSource',
      label: '宏观路线来源',
      component: 'Input',
      componentProps: {
        placeholder: '请输入宏观路线来源',
      },
    },
    {
      fieldName: 'selectionStatus',
      label: '景点选择状态',
      component: 'RadioGroup',
      componentProps: {
        options: [],
        buttonStyle: 'solid',
        optionType: 'button',
      },
    },
    {
      fieldName: 'budgetStatus',
      label: '预算校验状态',
      component: 'RadioGroup',
      componentProps: {
        options: [],
        buttonStyle: 'solid',
        optionType: 'button',
      },
    },
    {
      fieldName: 'requestedScenicCount',
      label: '期望景点数量',
      component: 'Input',
      componentProps: {
        placeholder: '请输入期望景点数量',
      },
    },
    {
      fieldName: 'selectedScenicCount',
      label: '实际选择景点数量',
      component: 'Input',
      componentProps: {
        placeholder: '请输入实际选择景点数量',
      },
    },
    {
      fieldName: 'dayStartTime',
      label: '当日开始时间',
      component: 'DatePicker',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'x',
      },
    },
    {
      fieldName: 'dayEndTime',
      label: '当日结束时间',
      component: 'DatePicker',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'x',
      },
    },
    {
      fieldName: 'droppedNodeIdsJson',
      label: '排程丢弃的节点ID JSON',
      component: 'Input',
      componentProps: {
        placeholder: '请输入排程丢弃的节点ID JSON',
      },
    },
    {
      fieldName: 'candidateCountsJson',
      label: '各类候选数量JSON',
      component: 'Input',
      componentProps: {
        placeholder: '请输入各类候选数量JSON',
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'userItineraryId',
      label: '用户行程',
      component: 'ApiSelect',
      componentProps: {
        allowClear: true,
        api: getUserItineraryOptions,
        labelField: 'title',
        placeholder: '请选择用户行程',
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
      fieldName: 'date',
      label: '行程日期',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
    {
      fieldName: 'provinceId',
      label: '当日省级区域ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入当日省级区域ID',
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
      fieldName: 'city',
      label: '当日城市名称',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入当日城市名称',
      },
    },
    {
      fieldName: 'area',
      label: '当日游玩区域',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入当日游玩区域',
      },
    },
    {
      fieldName: 'theme',
      label: '当日行程主题',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入当日行程主题',
      },
    },
    {
      fieldName: 'anchorPoiNamesJson',
      label: '当日锚点POI名称JSON',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入当日锚点POI名称JSON',
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
      fieldName: 'overviewStatus',
      label: '每日总览生成状态',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [],
        placeholder: '请选择每日总览生成状态',
      },
    },
    {
      fieldName: 'overviewSkeleton',
      label: '每日总览骨架文案',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入每日总览骨架文案',
      },
    },
    {
      fieldName: 'overviewDetail',
      label: '每日总览详细文案',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入每日总览详细文案',
      },
    },
    {
      fieldName: 'planner',
      label: '当日规划器',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入当日规划器',
      },
    },
    {
      fieldName: 'planningStatus',
      label: '当日排程状态',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [],
        placeholder: '请选择当日排程状态',
      },
    },
    {
      fieldName: 'macroSource',
      label: '宏观路线来源',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入宏观路线来源',
      },
    },
    {
      fieldName: 'selectionStatus',
      label: '景点选择状态',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [],
        placeholder: '请选择景点选择状态',
      },
    },
    {
      fieldName: 'budgetStatus',
      label: '预算校验状态',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [],
        placeholder: '请选择预算校验状态',
      },
    },
    {
      fieldName: 'requestedScenicCount',
      label: '期望景点数量',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入期望景点数量',
      },
    },
    {
      fieldName: 'selectedScenicCount',
      label: '实际选择景点数量',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入实际选择景点数量',
      },
    },
    {
      fieldName: 'dayStartTime',
      label: '当日开始时间',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
    {
      fieldName: 'dayEndTime',
      label: '当日结束时间',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
    {
      fieldName: 'droppedNodeIdsJson',
      label: '排程丢弃的节点ID JSON',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入排程丢弃的节点ID JSON',
      },
    },
    {
      fieldName: 'candidateCountsJson',
      label: '各类候选数量JSON',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入各类候选数量JSON',
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
export function useGridColumns(): VxeTableGridOptions<GiftUserItineraryDayApi.UserItineraryDay>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: '用户行程日程ID',
      minWidth: 120,
    },
    {
      field: 'userItineraryId',
      title: '用户行程ID',
      minWidth: 120,
    },
    {
      field: 'day',
      title: '行程第几天，从1开始',
      minWidth: 120,
    },
    {
      field: 'date',
      title: '行程日期',
      minWidth: 120,
    },
    {
      field: 'provinceId',
      title: '当日省级区域ID',
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
      field: 'city',
      title: '当日城市名称',
      minWidth: 120,
    },
    {
      field: 'area',
      title: '当日游玩区域',
      minWidth: 120,
    },
    {
      field: 'theme',
      title: '当日行程主题',
      minWidth: 120,
    },
    {
      field: 'anchorPoiNamesJson',
      title: '当日锚点POI名称JSON',
      minWidth: 120,
    },
    {
      field: 'sort',
      title: '排序值',
      minWidth: 120,
    },
    {
      field: 'overviewStatus',
      title: '每日总览生成状态',
      minWidth: 120,
    },
    {
      field: 'overviewSkeleton',
      title: '每日总览骨架文案',
      minWidth: 120,
    },
    {
      field: 'overviewDetail',
      title: '每日总览详细文案',
      minWidth: 120,
    },
    {
      field: 'planner',
      title: '当日规划器',
      minWidth: 120,
    },
    {
      field: 'planningStatus',
      title: '当日排程状态',
      minWidth: 120,
    },
    {
      field: 'macroSource',
      title: '宏观路线来源',
      minWidth: 120,
    },
    {
      field: 'selectionStatus',
      title: '景点选择状态',
      minWidth: 120,
    },
    {
      field: 'budgetStatus',
      title: '预算校验状态',
      minWidth: 120,
    },
    {
      field: 'requestedScenicCount',
      title: '期望景点数量',
      minWidth: 120,
    },
    {
      field: 'selectedScenicCount',
      title: '实际选择景点数量',
      minWidth: 120,
    },
    {
      field: 'dayStartTime',
      title: '当日开始时间',
      minWidth: 120,
    },
    {
      field: 'dayEndTime',
      title: '当日结束时间',
      minWidth: 120,
    },
    {
      field: 'droppedNodeIdsJson',
      title: '排程丢弃的节点ID JSON',
      minWidth: 120,
    },
    {
      field: 'candidateCountsJson',
      title: '各类候选数量JSON',
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
