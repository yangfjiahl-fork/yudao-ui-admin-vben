import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { GiftUserFeedbackApi } from '#/api/gift/userfeedback';

import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

import { getRangePickerDefaultProps } from '#/utils';

const CATEGORY_DESCRIPTION =
  '0未知，10地名名称，20地点图片，30地点介绍，40营业时间，50地理位置，60电话，99其他建议';

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
      component: 'InputNumber',
      componentProps: {
        min: 1,
        placeholder: '请输入会员ID',
      },
    },
    {
      fieldName: 'category',
      label: '问题分类',
      help: CATEGORY_DESCRIPTION,
      rules: 'required',
      component: 'InputNumber',
      componentProps: {
        min: 0,
        placeholder: '请输入问题分类',
      },
    },
    {
      fieldName: 'content',
      label: '反馈问题与建议',
      rules: 'required',
      component: 'RichTextarea',
    },
    {
      fieldName: 'poiId',
      label: 'POI供应商地点ID',
      component: 'Input',
      componentProps: {
        placeholder: '请输入POI供应商地点ID',
      },
    },
    {
      fieldName: 'poiName',
      label: 'POI名称快照',
      component: 'Input',
      componentProps: {
        placeholder: '请输入POI名称快照',
      },
    },
    {
      fieldName: 'poiProvider',
      label: 'POI数据供应商',
      component: 'Input',
      componentProps: {
        placeholder: '请输入POI数据供应商',
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
      component: 'InputNumber',
      componentProps: {
        allowClear: true,
        min: 1,
        placeholder: '请输入会员ID',
      },
    },
    {
      fieldName: 'category',
      label: '问题分类',
      help: CATEGORY_DESCRIPTION,
      component: 'InputNumber',
      componentProps: {
        allowClear: true,
        min: 0,
        placeholder: '请输入问题分类',
      },
    },
    {
      fieldName: 'status',
      label: '处理状态',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: getDictOptions(DICT_TYPE.GIFT_USER_FEEDBACK_STATUS, 'number'),
        placeholder: '请选择处理状态',
      },
    },
    {
      fieldName: 'content',
      label: '反馈问题与建议',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入反馈问题与建议',
      },
    },
    {
      fieldName: 'poiId',
      label: 'POI供应商地点ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入POI供应商地点ID',
      },
    },
    {
      fieldName: 'poiName',
      label: 'POI名称快照',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入POI名称快照',
      },
    },
    {
      fieldName: 'poiProvider',
      label: 'POI数据供应商',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入POI数据供应商',
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
export function useGridColumns(): VxeTableGridOptions<GiftUserFeedbackApi.UserFeedback>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: '用户反馈ID',
      minWidth: 120,
    },
    {
      field: 'memberId',
      title: '会员ID',
      minWidth: 120,
    },
    {
      field: 'category',
      title: '问题分类',
      minWidth: 120,
    },
    {
      field: 'status',
      title: '处理状态',
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.GIFT_USER_FEEDBACK_STATUS },
      },
    },
    {
      field: 'content',
      title: '反馈问题与建议',
      minWidth: 120,
    },
    {
      field: 'processRemark',
      title: '处理说明',
      minWidth: 160,
    },
    {
      field: 'poiId',
      title: 'POI供应商地点ID',
      minWidth: 120,
    },
    {
      field: 'poiName',
      title: 'POI名称快照',
      minWidth: 120,
    },
    {
      field: 'poiProvider',
      title: 'POI数据供应商',
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
      width: 260,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
