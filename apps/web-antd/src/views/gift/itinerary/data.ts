import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { GiftItineraryApi } from '#/api/gift/itinerary';

import { getItineraryCategoryPage } from '#/api/gift/itinerarycategory';
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
      fieldName: 'cityId',
      label: '城市ID',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入城市ID',
      },
    },
    {
      fieldName: 'categoryId',
      label: '行程类别',
      rules: 'required',
      component: 'ApiSelect',
      componentProps: {
        api: async () => {
          const data = await getItineraryCategoryPage({
            pageNo: 1,
            pageSize: 100,
          });
          return data.list;
        },
        labelField: 'title',
        placeholder: '请选择行程类别',
        showSearch: true,
        valueField: 'id',
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
      rules: 'required',
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
      fieldName: 'icon',
      label: '图标',
      component: 'Input',
      componentProps: {
        placeholder: '请输入图标',
      },
    },
    {
      fieldName: 'picUrls',
      label: '多图片',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入多图片',
      },
    },
    {
      fieldName: 'picSizes',
      label: '图片尺寸',
      component: 'Input',
      componentProps: {
        placeholder: '请输入图片尺寸',
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
      fieldName: 'coverUrl',
      label: '封面图',
      component: 'Input',
      componentProps: {
        placeholder: '请输入封面图',
      },
    },
    {
      fieldName: 'coverWidth',
      label: '封面宽度',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入封面宽度',
      },
    },
    {
      fieldName: 'coverHeight',
      label: '封面高度',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入封面高度',
      },
    },
    {
      fieldName: 'firstCoverUrl',
      label: '首图封面',
      component: 'Input',
      componentProps: {
        placeholder: '请输入首图封面',
      },
    },
    {
      fieldName: 'firstCoverHeight',
      label: '首图高度',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入首图高度',
      },
    },
    {
      fieldName: 'firstCoverWidth',
      label: '首图宽度',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入首图宽度',
      },
    },
    {
      fieldName: 'nextCityId',
      label: '城市ID',
      component: 'Input',
      componentProps: {
        placeholder: '请输入城市ID',
      },
    },
    {
      fieldName: 'viewCnt',
      label: '浏览数',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入浏览数',
      },
    },
    {
      fieldName: 'likeCnt',
      label: '点赞数',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入点赞数',
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
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'cityId',
      label: '城市ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入城市ID',
      },
    },
    {
      fieldName: 'categoryId',
      label: '行程类别',
      component: 'ApiSelect',
      componentProps: {
        allowClear: true,
        api: async () => {
          const data = await getItineraryCategoryPage({
            pageNo: 1,
            pageSize: 100,
          });
          return data.list;
        },
        labelField: 'title',
        placeholder: '请选择行程类别',
        showSearch: true,
        valueField: 'id',
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
      fieldName: 'icon',
      label: '图标',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入图标',
      },
    },
    {
      fieldName: 'picUrls',
      label: '多图片',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入多图片',
      },
    },
    {
      fieldName: 'picSizes',
      label: '图片尺寸',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入图片尺寸',
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
      label: '封面宽度',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入封面宽度',
      },
    },
    {
      fieldName: 'coverHeight',
      label: '封面高度',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入封面高度',
      },
    },
    {
      fieldName: 'firstCoverUrl',
      label: '首图封面',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入首图封面',
      },
    },
    {
      fieldName: 'firstCoverHeight',
      label: '首图高度',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入首图高度',
      },
    },
    {
      fieldName: 'firstCoverWidth',
      label: '首图宽度',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入首图宽度',
      },
    },
    {
      fieldName: 'nextCityId',
      label: '城市ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入城市ID',
      },
    },
    {
      fieldName: 'viewCnt',
      label: '浏览数',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入浏览数',
      },
    },
    {
      fieldName: 'likeCnt',
      label: '点赞数',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入点赞数',
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
export function useGridColumns(): VxeTableGridOptions<GiftItineraryApi.Itinerary>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: '主键',
      minWidth: 120,
    },
    {
      field: 'cityId',
      title: '城市ID',
      minWidth: 120,
    },
    {
      field: 'categoryId',
      title: '行程类别ID',
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
      field: 'icon',
      title: '图标',
      minWidth: 120,
    },
    {
      field: 'picUrls',
      title: '多图片',
      minWidth: 120,
    },
    {
      field: 'picSizes',
      title: '图片尺寸',
      minWidth: 120,
    },
    {
      field: 'tags',
      title: '标签',
      minWidth: 120,
    },
    {
      field: 'coverUrl',
      title: '封面图',
      minWidth: 120,
    },
    {
      field: 'coverWidth',
      title: '封面宽度',
      minWidth: 120,
    },
    {
      field: 'coverHeight',
      title: '封面高度',
      minWidth: 120,
    },
    {
      field: 'firstCoverUrl',
      title: '首图封面',
      minWidth: 120,
    },
    {
      field: 'firstCoverHeight',
      title: '首图高度',
      minWidth: 120,
    },
    {
      field: 'firstCoverWidth',
      title: '首图宽度',
      minWidth: 120,
    },
    {
      field: 'nextCityId',
      title: '城市ID',
      minWidth: 120,
    },
    {
      field: 'viewCnt',
      title: '浏览数',
      minWidth: 120,
    },
    {
      field: 'likeCnt',
      title: '点赞数',
      minWidth: 120,
    },
    {
      field: 'sort',
      title: '排序',
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
