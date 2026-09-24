import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { GiftItineraryDayItemApi } from '#/api/gift/itinerarydayitem';

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
      label: '通用行程ID',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入通用行程ID',
      },
    },
    {
      fieldName: 'itineraryDayId',
      label: '通用行程日程ID',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入通用行程日程ID',
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
      component: 'Input',
      componentProps: {
        placeholder: '请输入节点时段',
      },
    },
    {
      fieldName: 'title',
      label: '节点标题',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入节点标题',
      },
    },
    {
      fieldName: 'subTitle',
      label: '节点副标题',
      component: 'Input',
      componentProps: {
        placeholder: '请输入节点副标题',
      },
    },
    {
      fieldName: 'description',
      label: '节点描述',
      rules: 'required',
      component: 'RichTextarea',
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
      fieldName: 'provinceId',
      label: 'POI省级区域ID',
      component: 'Input',
      componentProps: {
        placeholder: '请输入POI省级区域ID',
      },
    },
    {
      fieldName: 'cityId',
      label: 'POI城市ID',
      component: 'Input',
      componentProps: {
        placeholder: '请输入POI城市ID',
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
      fieldName: 'coverUrl',
      label: '封面图地址',
      component: 'Input',
      componentProps: {
        placeholder: '请输入封面图地址',
      },
    },
    {
      fieldName: 'coverWidth',
      label: '封面图宽度',
      component: 'Input',
      componentProps: {
        placeholder: '请输入封面图宽度',
      },
    },
    {
      fieldName: 'coverHeight',
      label: '封面图高度',
      component: 'Input',
      componentProps: {
        placeholder: '请输入封面图高度',
      },
    },
    {
      fieldName: 'picUrls',
      label: '图片地址集合',
      component: 'Input',
      componentProps: {
        placeholder: '请输入图片地址集合',
      },
    },
    {
      fieldName: 'picSizes',
      label: '图片尺寸集合',
      component: 'Input',
      componentProps: {
        placeholder: '请输入图片尺寸集合',
      },
    },
    {
      fieldName: 'tags',
      label: '标签集合',
      component: 'Input',
      componentProps: {
        placeholder: '请输入标签集合',
      },
    },
    {
      fieldName: 'gdPosition',
      label: '高德地图坐标',
      component: 'Input',
      componentProps: {
        placeholder: '请输入高德地图坐标',
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
      label: '联系电话',
      component: 'Input',
      componentProps: {
        placeholder: '请输入联系电话',
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'itineraryId',
      label: '通用行程ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入通用行程ID',
      },
    },
    {
      fieldName: 'itineraryDayId',
      label: '通用行程日程ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入通用行程日程ID',
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
      fieldName: 'title',
      label: '节点标题',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入节点标题',
      },
    },
    {
      fieldName: 'subTitle',
      label: '节点副标题',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入节点副标题',
      },
    },
    {
      fieldName: 'description',
      label: '节点描述',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入节点描述',
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
      label: 'POI城市ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入POI城市ID',
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
      fieldName: 'coverUrl',
      label: '封面图地址',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入封面图地址',
      },
    },
    {
      fieldName: 'coverWidth',
      label: '封面图宽度',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入封面图宽度',
      },
    },
    {
      fieldName: 'coverHeight',
      label: '封面图高度',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入封面图高度',
      },
    },
    {
      fieldName: 'picUrls',
      label: '图片地址集合',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入图片地址集合',
      },
    },
    {
      fieldName: 'picSizes',
      label: '图片尺寸集合',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入图片尺寸集合',
      },
    },
    {
      fieldName: 'tags',
      label: '标签集合',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入标签集合',
      },
    },
    {
      fieldName: 'gdPosition',
      label: '高德地图坐标',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入高德地图坐标',
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
      label: '联系电话',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入联系电话',
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
export function useGridColumns(): VxeTableGridOptions<GiftItineraryDayItemApi.ItineraryDayItem>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: '通用行程节点ID',
      minWidth: 120,
    },
    {
      field: 'itineraryId',
      title: '通用行程ID',
      minWidth: 120,
    },
    {
      field: 'itineraryDayId',
      title: '通用行程日程ID',
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
      field: 'title',
      title: '节点标题',
      minWidth: 120,
    },
    {
      field: 'subTitle',
      title: '节点副标题',
      minWidth: 120,
    },
    {
      field: 'description',
      title: '节点描述',
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
      field: 'coverUrl',
      title: '封面图地址',
      minWidth: 120,
    },
    {
      field: 'coverWidth',
      title: '封面图宽度',
      minWidth: 120,
    },
    {
      field: 'coverHeight',
      title: '封面图高度',
      minWidth: 120,
    },
    {
      field: 'picUrls',
      title: '图片地址集合',
      minWidth: 120,
    },
    {
      field: 'picSizes',
      title: '图片尺寸集合',
      minWidth: 120,
    },
    {
      field: 'tags',
      title: '标签集合',
      minWidth: 120,
    },
    {
      field: 'gdPosition',
      title: '高德地图坐标',
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
      title: '联系电话',
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
