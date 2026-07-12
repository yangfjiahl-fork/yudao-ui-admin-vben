import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { GiftWoolApi } from '#/api/gift/wool';

import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

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
      fieldName: 'bizType',
      label: '业务场景',
      rules: 'required',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.MEMBER_POINT_BIZ_TYPE, 'string'),
        placeholder: '请选择业务场景',
      },
    },
    {
      fieldName: 'bizId',
      label: '业务编号',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入业务编号',
      },
    },
    {
      fieldName: 'amount',
      label: '数量',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入数量',
      },
    },
    {
      fieldName: 'status',
      label: '状态',
      rules: 'required',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.GIFT_WOOL_STATUS, 'string'),
        placeholder: '请选择状态',
      },
    },
    {
      fieldName: 'memberId',
      label: '会员编号',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入会员编号',
      },
    },
    {
      fieldName: 'remark',
      label: '备注',
      component: 'Input',
      componentProps: {
        placeholder: '请输入备注',
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'bizType',
      label: '业务场景',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: getDictOptions(DICT_TYPE.MEMBER_POINT_BIZ_TYPE, 'string'),
        placeholder: '请选择业务场景',
      },
    },
    {
      fieldName: 'bizId',
      label: '业务编号',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入业务编号',
      },
    },
    {
      fieldName: 'status',
      label: '状态',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: getDictOptions(DICT_TYPE.GIFT_WOOL_STATUS, 'string'),
        placeholder: '请选择状态',
      },
    },
    {
      fieldName: 'memberId',
      label: '会员编号',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入会员编号',
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
export function useGridColumns(): VxeTableGridOptions<GiftWoolApi.Wool>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: '编号',
      minWidth: 120,
    },
    {
      field: 'bizType',
      title: '业务场景',
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.MEMBER_POINT_BIZ_TYPE },
      },
    },
    {
      field: 'bizId',
      title: '业务编号',
      minWidth: 120,
    },
    {
      field: 'amount',
      title: '数量',
      minWidth: 120,
    },
    {
      field: 'status',
      title: '状态',
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.GIFT_WOOL_STATUS },
      },
    },
    {
      field: 'memberId',
      title: '会员编号',
      minWidth: 120,
    },
    {
      field: 'remark',
      title: '备注',
      minWidth: 200,
    },
    {
      field: 'createTime',
      title: '创建时间',
      minWidth: 160,
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
