import type { UploadFile } from 'ant-design-vue';

import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { GiftItineraryApi } from '#/api/gift/itinerary';

import { markRaw } from 'vue';

import { AreaLevelEnum } from '@vben/constants';

import { getItineraryCategoryPage } from '#/api/gift/itinerarycategory';
import { AreaCascader } from '#/components/area';

/** 新增/修改的表单 */
export function useFormSchema(options?: {
  onCoverDelete?: (file: UploadFile) => void;
  onCoverFileSelect?: (file: File) => void;
  onPicDelete?: (file: UploadFile) => void;
  onPicFileSelect?: (file: File) => void;
}): VbenFormSchema[] {
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
      component: 'Textarea',
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
      component: 'ImageUpload',
      componentProps: {
        checkDuplicate: true,
        maxNumber: 10,
        maxSize: 30,
        multiple: true,
        onDelete: options?.onPicDelete,
        onFileSelect: options?.onPicFileSelect,
      },
      defaultValue: [],
    },
    {
      fieldName: 'picSizes',
      label: '图片尺寸',
      component: 'Textarea',
      defaultValue: '[]',
      componentProps: {
        disabled: true,
        placeholder: '上传图片后自动填充',
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
      rules: 'required',
      component: 'ImageUpload',
      defaultValue: '',
      componentProps: {
        checkDuplicate: true,
        maxSize: 30,
        onDelete: options?.onCoverDelete,
        onFileSelect: options?.onCoverFileSelect,
      },
    },
    {
      fieldName: 'coverWidth',
      label: '封面宽度',
      rules: 'required',
      component: 'InputNumber',
      componentProps: {
        disabled: true,
        placeholder: '上传封面后自动填充',
      },
    },
    {
      fieldName: 'coverHeight',
      label: '封面高度',
      rules: 'required',
      component: 'InputNumber',
      componentProps: {
        disabled: true,
        placeholder: '上传封面后自动填充',
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
      fieldName: 'viewCnt',
      label: '浏览数',
      rules: 'required',
      component: 'InputNumber',
      defaultValue: Math.floor(Math.random() * 100),
      componentProps: {
        min: 0,
        placeholder: '请输入浏览数',
      },
    },
    {
      fieldName: 'likeCnt',
      label: '点赞数',
      rules: 'required',
      component: 'InputNumber',
      defaultValue: Math.floor(Math.random() * 100),
      componentProps: {
        min: 0,
        placeholder: '请输入点赞数',
      },
    },
    {
      fieldName: 'sort',
      label: '排序',
      rules: 'required',
      component: 'InputNumber',
      defaultValue: 0,
      componentProps: {
        min: 0,
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
      field: 'provinceName',
      title: '省份',
      minWidth: 120,
    },
    {
      field: 'cityName',
      title: '城市',
      minWidth: 120,
    },
    {
      field: 'categoryName',
      title: '行程类别',
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
