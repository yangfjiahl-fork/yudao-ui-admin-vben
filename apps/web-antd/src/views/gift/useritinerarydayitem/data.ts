import type { VbenFormApi, VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { GiftUserItineraryDayItemApi } from '#/api/gift/useritinerarydayitem';

import { markRaw } from 'vue';

import { AreaLevelEnum } from '@vben/constants';

import { getUserItineraryPage } from '#/api/gift/useritinerary';
import { getUserItineraryDayPage } from '#/api/gift/useritineraryday';
import { AreaCascader } from '#/components/area';
import { getRangePickerDefaultProps } from '#/utils';

/** 获取用户行程下拉选项 */
async function getUserItineraryOptions() {
  const data = await getUserItineraryPage({ pageNo: 1, pageSize: 100 });
  return data.list;
}

/** 格式化用户行程每日安排选项 */
function getUserItineraryDayLabel(item: Record<string, unknown>) {
  const theme = typeof item.theme === 'string' ? item.theme : '';
  return `第${Number(item.day)}天${theme ? ` - ${theme}` : ''}`;
}

/** 选择用户行程后再加载每日安排 */
function shouldFetchUserItineraryDays(params: Record<string, unknown>) {
  return Boolean(params.userItineraryId);
}

/** 新增/修改的表单 */
export function useFormSchema(formApi?: VbenFormApi): VbenFormSchema[] {
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
        onChange: () => formApi?.setFieldValue('userItineraryDayId', undefined),
        placeholder: '请选择用户行程',
        showSearch: true,
        valueField: 'id',
      },
    },
    {
      fieldName: 'userItineraryDayId',
      label: '用户行程每日安排',
      rules: 'required',
      component: 'ApiSelect',
      dependencies: {
        triggerFields: ['userItineraryId'],
        componentProps: (values) => ({
          api: getUserItineraryDayPage,
          disabled: !values.userItineraryId,
          labelFn: getUserItineraryDayLabel,
          params: {
            pageNo: 1,
            pageSize: 100,
            userItineraryId: values.userItineraryId,
          },
          placeholder: values.userItineraryId
            ? '请选择用户行程每日安排'
            : '请先选择用户行程',
          resultField: 'list',
          shouldFetch: shouldFetchUserItineraryDays,
          showSearch: true,
          valueField: 'id',
        }),
      },
    },
    {
      fieldName: 'itemId',
      label: '行程节点业务ID',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入行程节点业务ID',
      },
    },
    {
      fieldName: 'day',
      label: '所属行程天数',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入所属行程天数',
      },
    },
    {
      fieldName: 'type',
      label: '节点类型',
      rules: 'required',
      component: 'Select',
      componentProps: {
        options: [],
        placeholder: '请选择节点类型',
      },
    },
    {
      fieldName: 'slot',
      label: '节点时段',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入节点时段',
      },
    },
    {
      fieldName: 'label',
      label: '节点展示标签',
      component: 'Input',
      componentProps: {
        placeholder: '请输入节点展示标签',
      },
    },
    {
      fieldName: 'sort',
      label: '当日节点排序值',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入当日节点排序值',
      },
    },
    {
      fieldName: 'startTime',
      label: '计划开始时间',
      component: 'DatePicker',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'x',
      },
    },
    {
      fieldName: 'endTime',
      label: '计划结束时间',
      component: 'DatePicker',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'x',
      },
    },
    {
      fieldName: 'durationMinutes',
      label: '建议停留分钟数',
      component: 'Input',
      componentProps: {
        placeholder: '请输入建议停留分钟数',
      },
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
      label: 'POI名称',
      component: 'Input',
      componentProps: {
        placeholder: '请输入POI名称',
      },
    },
    {
      fieldName: 'provinceId',
      label: 'POI省级区域ID',
      component: 'Input',
      componentProps: {
        placeholder: '请输入POI省级区域ID',
      },
    },
    {
      fieldName: 'cityId',
      label: 'POI城市',
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
      label: 'POI区县ID',
      component: 'Input',
      componentProps: {
        placeholder: '请输入POI区县ID',
      },
    },
    {
      fieldName: 'city',
      label: 'POI城市名称',
      component: 'Input',
      componentProps: {
        placeholder: '请输入POI城市名称',
      },
    },
    {
      fieldName: 'area',
      label: 'POI所在区域',
      component: 'Input',
      componentProps: {
        placeholder: '请输入POI所在区域',
      },
    },
    {
      fieldName: 'addressDetail',
      label: 'POI详细地址',
      component: 'Input',
      componentProps: {
        placeholder: '请输入POI详细地址',
      },
    },
    {
      fieldName: 'longitude',
      label: 'POI经度',
      component: 'Input',
      componentProps: {
        placeholder: '请输入POI经度',
      },
    },
    {
      fieldName: 'latitude',
      label: 'POI纬度',
      component: 'Input',
      componentProps: {
        placeholder: '请输入POI纬度',
      },
    },
    {
      fieldName: 'coordinateSystem',
      label: '坐标系',
      component: 'Input',
      componentProps: {
        placeholder: '请输入坐标系',
      },
    },
    {
      fieldName: 'businessHours',
      label: '营业时间',
      component: 'Input',
      componentProps: {
        placeholder: '请输入营业时间',
      },
    },
    {
      fieldName: 'phoneNo',
      label: '联系电话',
      component: 'Input',
      componentProps: {
        placeholder: '请输入联系电话',
      },
    },
    {
      fieldName: 'coverUrl',
      label: '封面图地址',
      component: 'Input',
      componentProps: {
        placeholder: '请输入封面图地址',
      },
    },
    {
      fieldName: 'rating',
      label: '评分',
      component: 'Input',
      componentProps: {
        placeholder: '请输入评分',
      },
    },
    {
      fieldName: 'cost',
      label: '预计花费',
      component: 'Input',
      componentProps: {
        placeholder: '请输入预计花费',
      },
    },
    {
      fieldName: 'tagsJson',
      label: '标签JSON',
      component: 'Input',
      componentProps: {
        placeholder: '请输入标签JSON',
      },
    },
    {
      fieldName: 'skeleton',
      label: '节点骨架文案',
      component: 'Input',
      componentProps: {
        placeholder: '请输入节点骨架文案',
      },
    },
    {
      fieldName: 'detail',
      label: '节点详细文案',
      component: 'Input',
      componentProps: {
        placeholder: '请输入节点详细文案',
      },
    },
    {
      fieldName: 'status',
      label: '节点内容状态',
      rules: 'required',
      component: 'RadioGroup',
      componentProps: {
        options: [],
        buttonStyle: 'solid',
        optionType: 'button',
      },
    },
    {
      fieldName: 'resolveStatus',
      label: '节点解析状态',
      rules: 'required',
      component: 'RadioGroup',
      componentProps: {
        options: [],
        buttonStyle: 'solid',
        optionType: 'button',
      },
    },
    {
      fieldName: 'planningStatus',
      label: '节点排程状态',
      component: 'RadioGroup',
      componentProps: {
        options: [],
        buttonStyle: 'solid',
        optionType: 'button',
      },
    },
    {
      fieldName: 'poiVerificationStatus',
      label: 'POI校验状态',
      component: 'RadioGroup',
      componentProps: {
        options: [],
        buttonStyle: 'solid',
        optionType: 'button',
      },
    },
    {
      fieldName: 'mustVisit',
      label: '是否必去',
      rules: 'required',
      component: 'RadioGroup',
      componentProps: {
        options: [],
        buttonStyle: 'solid',
        optionType: 'button',
      },
    },
    {
      fieldName: 'locked',
      label: '是否锁定',
      rules: 'required',
      component: 'RadioGroup',
      componentProps: {
        options: [],
        buttonStyle: 'solid',
        optionType: 'button',
      },
    },
    {
      fieldName: 'source',
      label: '节点来源',
      component: 'Input',
      componentProps: {
        placeholder: '请输入节点来源',
      },
    },
    {
      fieldName: 'provider',
      label: 'POI数据供应商',
      component: 'Input',
      componentProps: {
        placeholder: '请输入POI数据供应商',
      },
    },
    {
      fieldName: 'poiSnapshotJson',
      label: 'POI快照JSON',
      component: 'Input',
      componentProps: {
        placeholder: '请输入POI快照JSON',
      },
    },
    {
      fieldName: 'candidatesJson',
      label: '候选POI JSON',
      component: 'Input',
      componentProps: {
        placeholder: '请输入候选POI JSON',
      },
    },
    {
      fieldName: 'citationIdsJson',
      label: '引用来源ID JSON',
      component: 'Input',
      componentProps: {
        placeholder: '请输入引用来源ID JSON',
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
      fieldName: 'userItineraryDayId',
      label: '用户行程每日安排',
      component: 'ApiSelect',
      dependencies: {
        triggerFields: ['userItineraryId'],
        componentProps: (values) => ({
          allowClear: true,
          api: getUserItineraryDayPage,
          disabled: !values.userItineraryId,
          labelFn: getUserItineraryDayLabel,
          params: {
            pageNo: 1,
            pageSize: 100,
            userItineraryId: values.userItineraryId,
          },
          placeholder: values.userItineraryId
            ? '请选择用户行程每日安排'
            : '请先选择用户行程',
          resultField: 'list',
          shouldFetch: shouldFetchUserItineraryDays,
          showSearch: true,
          valueField: 'id',
        }),
      },
    },
    {
      fieldName: 'itemId',
      label: '行程节点业务ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入行程节点业务ID',
      },
    },
    {
      fieldName: 'day',
      label: '所属行程天数',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入所属行程天数',
      },
    },
    {
      fieldName: 'type',
      label: '节点类型',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [],
        placeholder: '请选择节点类型',
      },
    },
    {
      fieldName: 'slot',
      label: '节点时段',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入节点时段',
      },
    },
    {
      fieldName: 'label',
      label: '节点展示标签',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入节点展示标签',
      },
    },
    {
      fieldName: 'sort',
      label: '当日节点排序值',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入当日节点排序值',
      },
    },
    {
      fieldName: 'startTime',
      label: '计划开始时间',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
    {
      fieldName: 'endTime',
      label: '计划结束时间',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
    {
      fieldName: 'durationMinutes',
      label: '建议停留分钟数',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入建议停留分钟数',
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
      label: 'POI名称',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入POI名称',
      },
    },
    {
      fieldName: 'provinceId',
      label: 'POI省级区域ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入POI省级区域ID',
      },
    },
    {
      fieldName: 'cityId',
      label: 'POI城市',
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
      label: 'POI区县ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入POI区县ID',
      },
    },
    {
      fieldName: 'city',
      label: 'POI城市名称',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入POI城市名称',
      },
    },
    {
      fieldName: 'area',
      label: 'POI所在区域',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入POI所在区域',
      },
    },
    {
      fieldName: 'addressDetail',
      label: 'POI详细地址',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入POI详细地址',
      },
    },
    {
      fieldName: 'longitude',
      label: 'POI经度',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入POI经度',
      },
    },
    {
      fieldName: 'latitude',
      label: 'POI纬度',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入POI纬度',
      },
    },
    {
      fieldName: 'coordinateSystem',
      label: '坐标系',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入坐标系',
      },
    },
    {
      fieldName: 'businessHours',
      label: '营业时间',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入营业时间',
      },
    },
    {
      fieldName: 'phoneNo',
      label: '联系电话',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入联系电话',
      },
    },
    {
      fieldName: 'coverUrl',
      label: '封面图地址',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入封面图地址',
      },
    },
    {
      fieldName: 'rating',
      label: '评分',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入评分',
      },
    },
    {
      fieldName: 'cost',
      label: '预计花费',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入预计花费',
      },
    },
    {
      fieldName: 'tagsJson',
      label: '标签JSON',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入标签JSON',
      },
    },
    {
      fieldName: 'skeleton',
      label: '节点骨架文案',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入节点骨架文案',
      },
    },
    {
      fieldName: 'detail',
      label: '节点详细文案',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入节点详细文案',
      },
    },
    {
      fieldName: 'status',
      label: '节点内容状态',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [],
        placeholder: '请选择节点内容状态',
      },
    },
    {
      fieldName: 'resolveStatus',
      label: '节点解析状态',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [],
        placeholder: '请选择节点解析状态',
      },
    },
    {
      fieldName: 'planningStatus',
      label: '节点排程状态',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [],
        placeholder: '请选择节点排程状态',
      },
    },
    {
      fieldName: 'poiVerificationStatus',
      label: 'POI校验状态',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [],
        placeholder: '请选择POI校验状态',
      },
    },
    {
      fieldName: 'mustVisit',
      label: '是否必去',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [],
        placeholder: '请选择是否必去',
      },
    },
    {
      fieldName: 'locked',
      label: '是否锁定',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [],
        placeholder: '请选择是否锁定',
      },
    },
    {
      fieldName: 'source',
      label: '节点来源',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入节点来源',
      },
    },
    {
      fieldName: 'provider',
      label: 'POI数据供应商',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入POI数据供应商',
      },
    },
    {
      fieldName: 'poiSnapshotJson',
      label: 'POI快照JSON',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入POI快照JSON',
      },
    },
    {
      fieldName: 'candidatesJson',
      label: '候选POI JSON',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入候选POI JSON',
      },
    },
    {
      fieldName: 'citationIdsJson',
      label: '引用来源ID JSON',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入引用来源ID JSON',
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
export function useGridColumns(): VxeTableGridOptions<GiftUserItineraryDayItemApi.UserItineraryDayItem>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: '用户行程节点记录ID',
      minWidth: 120,
    },
    {
      field: 'userItineraryId',
      title: '用户行程ID',
      minWidth: 120,
    },
    {
      field: 'userItineraryDayId',
      title: '用户行程日程ID',
      minWidth: 120,
    },
    {
      field: 'itemId',
      title: '行程节点业务ID',
      minWidth: 120,
    },
    {
      field: 'day',
      title: '所属行程天数',
      minWidth: 120,
    },
    {
      field: 'type',
      title: '节点类型',
      minWidth: 120,
    },
    {
      field: 'slot',
      title: '节点时段',
      minWidth: 120,
    },
    {
      field: 'label',
      title: '节点展示标签',
      minWidth: 120,
    },
    {
      field: 'sort',
      title: '当日节点排序值',
      minWidth: 120,
    },
    {
      field: 'startTime',
      title: '计划开始时间',
      minWidth: 120,
    },
    {
      field: 'endTime',
      title: '计划结束时间',
      minWidth: 120,
    },
    {
      field: 'durationMinutes',
      title: '建议停留分钟数',
      minWidth: 120,
    },
    {
      field: 'poiId',
      title: 'POI供应商地点ID',
      minWidth: 120,
    },
    {
      field: 'poiName',
      title: 'POI名称',
      minWidth: 120,
    },
    {
      field: 'provinceId',
      title: 'POI省级区域ID',
      minWidth: 120,
    },
    {
      field: 'cityId',
      title: 'POI城市ID',
      minWidth: 120,
    },
    {
      field: 'districtId',
      title: 'POI区县ID',
      minWidth: 120,
    },
    {
      field: 'city',
      title: 'POI城市名称',
      minWidth: 120,
    },
    {
      field: 'area',
      title: 'POI所在区域',
      minWidth: 120,
    },
    {
      field: 'addressDetail',
      title: 'POI详细地址',
      minWidth: 120,
    },
    {
      field: 'longitude',
      title: 'POI经度',
      minWidth: 120,
    },
    {
      field: 'latitude',
      title: 'POI纬度',
      minWidth: 120,
    },
    {
      field: 'coordinateSystem',
      title: '坐标系',
      minWidth: 120,
    },
    {
      field: 'businessHours',
      title: '营业时间',
      minWidth: 120,
    },
    {
      field: 'phoneNo',
      title: '联系电话',
      minWidth: 120,
    },
    {
      field: 'coverUrl',
      title: '封面图地址',
      minWidth: 120,
    },
    {
      field: 'rating',
      title: '评分',
      minWidth: 120,
    },
    {
      field: 'cost',
      title: '预计花费',
      minWidth: 120,
    },
    {
      field: 'tagsJson',
      title: '标签JSON',
      minWidth: 120,
    },
    {
      field: 'skeleton',
      title: '节点骨架文案',
      minWidth: 120,
    },
    {
      field: 'detail',
      title: '节点详细文案',
      minWidth: 120,
    },
    {
      field: 'status',
      title: '节点内容状态',
      minWidth: 120,
    },
    {
      field: 'resolveStatus',
      title: '节点解析状态',
      minWidth: 120,
    },
    {
      field: 'planningStatus',
      title: '节点排程状态',
      minWidth: 120,
    },
    {
      field: 'poiVerificationStatus',
      title: 'POI校验状态',
      minWidth: 120,
    },
    {
      field: 'mustVisit',
      title: '是否必去',
      minWidth: 120,
    },
    {
      field: 'locked',
      title: '是否锁定',
      minWidth: 120,
    },
    {
      field: 'source',
      title: '节点来源',
      minWidth: 120,
    },
    {
      field: 'provider',
      title: 'POI数据供应商',
      minWidth: 120,
    },
    {
      field: 'poiSnapshotJson',
      title: 'POI快照JSON',
      minWidth: 120,
    },
    {
      field: 'candidatesJson',
      title: '候选POI JSON',
      minWidth: 120,
    },
    {
      field: 'citationIdsJson',
      title: '引用来源ID JSON',
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
