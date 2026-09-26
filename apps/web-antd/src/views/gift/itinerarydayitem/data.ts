import type { VbenFormApi, VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { GiftItineraryDayItemApi } from '#/api/gift/itinerarydayitem';

import { markRaw } from 'vue';

import { AreaLevelEnum, DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

import { getItineraryPage } from '#/api/gift/itinerary';
import { getItineraryDayPage } from '#/api/gift/itineraryday';
import { AreaCascader } from '#/components/area';

/** 获取行程下拉选项 */
async function getItineraryOptions() {
  const data = await getItineraryPage({ pageNo: 1, pageSize: 100 });
  return data.list;
}

/** 格式化行程每日安排选项 */
function getItineraryDayLabel(item: Record<string, unknown>) {
  const title = typeof item.title === 'string' ? item.title : '';
  return `第${Number(item.day)}天${title ? ` - ${title}` : ''}`;
}

/** 选择行程后再加载每日安排 */
function shouldFetchItineraryDays(params: Record<string, unknown>) {
  return Boolean(params.itineraryId);
}

/** 级联选择后同步 POI 省市编号，区县编号由表单字段自动回写。 */
function handlePoiAreaChange(formApi?: VbenFormApi, areaPath?: number[]) {
  formApi?.setFieldValue('provinceId', areaPath?.[0]);
  formApi?.setFieldValue('cityId', areaPath?.[1]);
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
      fieldName: 'itineraryId',
      label: '行程',
      rules: 'required',
      component: 'ApiSelect',
      componentProps: {
        api: getItineraryOptions,
        labelField: 'title',
        onChange: () => formApi?.setFieldValue('itineraryDayId', undefined),
        placeholder: '请选择行程',
        showSearch: true,
        valueField: 'id',
      },
    },
    {
      fieldName: 'itineraryDayId',
      label: '行程每日安排',
      rules: 'required',
      component: 'ApiSelect',
      dependencies: {
        triggerFields: ['itineraryId'],
        componentProps: (values) => ({
          api: getItineraryDayPage,
          disabled: !values.itineraryId,
          labelFn: getItineraryDayLabel,
          params: {
            itineraryId: values.itineraryId,
            pageNo: 1,
            pageSize: 100,
          },
          placeholder: values.itineraryId
            ? '请选择行程每日安排'
            : '请先选择行程',
          resultField: 'list',
          shouldFetch: shouldFetchItineraryDays,
          showSearch: true,
          valueField: 'id',
        }),
      },
    },
    {
      fieldName: 'type',
      label: '节点类型',
      rules: 'required',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.GIFT_AMAP_POI_TYPE, 'string'),
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
      component: 'Input',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
    {
      fieldName: 'cityId',
      component: 'Input',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
    {
      fieldName: 'districtId',
      label: 'POI省市区',
      component: markRaw(AreaCascader),
      componentProps: {
        allowClear: true,
        class: '!w-full',
        level: AreaLevelEnum.DISTRICT,
        onPathChange: (areaPath?: number[]) =>
          handlePoiAreaChange(formApi, areaPath),
        placeholder: '请选择省市区',
        showSearch: true,
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
      label: '行程',
      component: 'ApiSelect',
      componentProps: {
        allowClear: true,
        api: getItineraryOptions,
        labelField: 'title',
        placeholder: '请选择行程',
        showSearch: true,
        valueField: 'id',
      },
    },
    {
      fieldName: 'itineraryDayId',
      label: '行程每日安排',
      component: 'ApiSelect',
      dependencies: {
        triggerFields: ['itineraryId'],
        componentProps: (values) => ({
          allowClear: true,
          api: getItineraryDayPage,
          disabled: !values.itineraryId,
          labelFn: getItineraryDayLabel,
          params: {
            itineraryId: values.itineraryId,
            pageNo: 1,
            pageSize: 100,
          },
          placeholder: values.itineraryId
            ? '请选择行程每日安排'
            : '请先选择行程',
          resultField: 'list',
          shouldFetch: shouldFetchItineraryDays,
          showSearch: true,
          valueField: 'id',
        }),
      },
    },
    {
      fieldName: 'type',
      label: '节点类型',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: getDictOptions(DICT_TYPE.GIFT_AMAP_POI_TYPE, 'string'),
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
      fieldName: 'districtId',
      label: 'POI省市区',
      component: markRaw(AreaCascader),
      componentProps: {
        allowClear: true,
        class: '!w-full',
        level: AreaLevelEnum.DISTRICT,
        placeholder: '请选择省市区',
        showSearch: true,
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
      field: 'provinceName',
      title: 'POI省份',
      minWidth: 120,
    },
    {
      field: 'cityName',
      title: 'POI城市',
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
