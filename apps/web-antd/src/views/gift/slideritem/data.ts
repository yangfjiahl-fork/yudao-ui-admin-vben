import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { GiftSliderItemApi } from '#/api/gift/slideritem';

import { DICT_TYPE } from '@vben/constants';
import { getDictLabel, getDictOptions } from '@vben/hooks';

import { getSliderPage } from '#/api/gift/slider';

async function getSliderOptions() {
  const data = await getSliderPage({ pageNo: 1, pageSize: 100 });
  return data.list.map((slider) => {
    const position =
      getDictLabel(DICT_TYPE.GIFT_SLIDER_POSITION, slider.positionCode) ||
      slider.positionCode;
    const city = slider.cityId ? `城市 ${slider.cityId}` : '全部城市';
    return {
      ...slider,
      label: `${position} / ${city}（ID: ${slider.id}）`,
    };
  });
}

/** 新增/修改的表单 */
export function useFormSchema(options?: {
  onImageDelete?: () => void;
  onImageFileSelect?: (file: File) => void;
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
      fieldName: 'sliderId',
      label: '关联轮播',
      rules: 'required',
      component: 'ApiSelect',
      componentProps: {
        api: getSliderOptions,
        labelField: 'label',
        placeholder: '请选择轮播',
        showSearch: true,
        valueField: 'id',
      },
    },
    {
      fieldName: 'imageUrl',
      label: '图片',
      rules: 'required',
      component: 'ImageUpload',
      componentProps: {
        maxNumber: 1,
        onDelete: options?.onImageDelete,
        onFileSelect: options?.onImageFileSelect,
      },
    },
    {
      fieldName: 'imageWidth',
      label: '图片宽度',
      rules: 'required',
      component: 'InputNumber',
      componentProps: {
        disabled: true,
        min: 1,
        placeholder: '上传图片后自动填写',
      },
    },
    {
      fieldName: 'imageHeight',
      label: '图片高度',
      rules: 'required',
      component: 'InputNumber',
      componentProps: {
        disabled: true,
        min: 1,
        placeholder: '上传图片后自动填写',
      },
    },
    {
      fieldName: 'sort',
      label: '顺序',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入顺序',
      },
    },
    {
      fieldName: 'jumpPage',
      label: '跳转页面',
      rules: 'required',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.GIFT_SLIDER_ITEM_JUMP_PAGE, 'string'),
        placeholder: '请选择跳转页面',
      },
    },
    {
      fieldName: 'jumpPageId',
      label: '跳转页面ID',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入跳转页面ID',
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'sliderId',
      label: '关联轮播',
      component: 'ApiSelect',
      componentProps: {
        allowClear: true,
        api: getSliderOptions,
        labelField: 'label',
        placeholder: '请选择轮播',
        showSearch: true,
        valueField: 'id',
      },
    },
    {
      fieldName: 'jumpPage',
      label: '跳转页面',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: getDictOptions(DICT_TYPE.GIFT_SLIDER_ITEM_JUMP_PAGE, 'string'),
        placeholder: '请选择跳转页面',
      },
    },
  ];
}

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions<GiftSliderItemApi.SliderItem>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: '主键',
      minWidth: 120,
    },
    {
      field: 'sliderId',
      title: '关联轮播ID',
      minWidth: 120,
    },
    {
      field: 'imageUrl',
      title: '图片',
      minWidth: 120,
      cellRender: {
        name: 'CellImage',
      },
    },
    {
      field: 'imageWidth',
      title: '图片宽度',
      minWidth: 120,
    },
    {
      field: 'imageHeight',
      title: '图片高度',
      minWidth: 120,
    },
    {
      field: 'sort',
      title: '顺序',
      minWidth: 120,
    },
    {
      field: 'jumpPage',
      title: '跳转页面',
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.GIFT_SLIDER_ITEM_JUMP_PAGE },
      },
    },
    {
      field: 'jumpPageId',
      title: '跳转页面ID',
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
