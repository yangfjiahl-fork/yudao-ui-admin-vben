import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { GiftArticleApi } from '#/api/gift/article';

import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';
import { handleTree } from '@vben/utils';

import { getArticleCategoryList } from '#/api/gift/articlecategory';

const COVER_ORIENTATION_LABEL_MAP = {
  landscape: '横屏',
  portrait: '竖屏',
  square: '方形',
} as const;

/** 新增/修改的表单 */
export function useFormSchema(options?: {
  onCoverDelete?: () => void;
  onCoverFileSelect?: (file: File) => void;
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
      fieldName: 'memberId',
      component: 'Input',
      defaultValue: 1,
      dependencies: {
        triggerFields: [''],
        show: () => false,
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
      fieldName: 'categoryId',
      label: '文章分类',
      component: 'ApiTreeSelect',
      componentProps: {
        api: async () => {
          const data = await getArticleCategoryList({});
          return handleTree(data);
        },
        fieldNames: { label: 'name', value: 'id', children: 'children' },
        placeholder: '请选择文章分类',
      },
      rules: 'required',
    },
    {
      fieldName: 'author',
      label: '作者',
      component: 'Input',
      componentProps: {
        placeholder: '请输入作者',
      },
    },
    {
      fieldName: 'officialName',
      label: '官方名称',
      component: 'Input',
      componentProps: {
        placeholder: '请输入官方名称',
      },
    },
    {
      fieldName: 'summary',
      label: '摘要',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入摘要',
      },
    },
    {
      fieldName: 'coverImage',
      label: '封面图',
      rules: 'required',
      component: 'ImageUpload',
      componentProps: {
        onDelete: options?.onCoverDelete,
        onFileSelect: options?.onCoverFileSelect,
      },
    },
    {
      fieldName: 'coverWidth',
      component: 'Input',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
    {
      fieldName: 'coverHeight',
      component: 'Input',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
    {
      fieldName: 'coverOrientation',
      component: 'Input',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
    {
      fieldName: 'sliderPicUrls',
      label: '轮播图',
      component: 'ImageUpload',
      componentProps: {
        maxNumber: 9,
        multiple: true,
      },
      defaultValue: [],
    },
    {
      fieldName: 'content',
      label: '富文本正文',
      rules: 'required',
      component: 'RichTextarea',
    },
    {
      fieldName: 'viewCount',
      label: '浏览次数',
      rules: 'required',
      component: 'InputNumber',
      defaultValue: Math.floor(Math.random() * 100),
      componentProps: {
        class: 'w-full',
        min: 0,
        placeholder: '请输入浏览次数',
        precision: 0,
      },
    },
    {
      fieldName: 'likeCount',
      label: '点赞次数',
      rules: 'required',
      component: 'InputNumber',
      defaultValue: Math.floor(Math.random() * 100),
      componentProps: {
        class: 'w-full',
        min: 0,
        placeholder: '请输入点赞次数',
        precision: 0,
      },
    },
    {
      fieldName: 'sort',
      label: '排序值',
      rules: 'required',
      component: 'InputNumber',
      defaultValue: 10,
      componentProps: {
        class: 'w-full',
        min: 0,
        placeholder: '请输入排序值',
        precision: 0,
      },
    },
    {
      fieldName: 'status',
      label: '状态',
      rules: 'required',
      component: 'Select',
      defaultValue: 1,
      componentProps: {
        options: getDictOptions(DICT_TYPE.GIFT_ARTICLE_STATUS, 'number'),
        placeholder: '请选择状态',
      },
    },
    {
      fieldName: 'publishTime',
      label: '发布时间',
      rules: 'required',
      component: 'DatePicker',
      defaultValue: new Date(),
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'x',
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'title',
      label: '文章标题',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入文章标题',
      },
    },
    {
      fieldName: 'categoryId',
      label: '文章分类',
      component: 'ApiTreeSelect',
      componentProps: {
        allowClear: true,
        api: async () => {
          const data = await getArticleCategoryList({});
          return handleTree(data);
        },
        fieldNames: { label: 'name', value: 'id', children: 'children' },
        placeholder: '请选择文章分类',
      },
    },
    {
      fieldName: 'status',
      label: '状态',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: getDictOptions(DICT_TYPE.GIFT_ARTICLE_STATUS, 'number'),
        placeholder: '请选择状态',
      },
    },
  ];
}

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions<GiftArticleApi.Article>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'memberId',
      title: '会员编号',
      minWidth: 100,
    },
    {
      field: 'categoryName',
      title: '文章分类',
      minWidth: 100,
    },
    {
      field: 'title',
      title: '标题',
      minWidth: 150,
    },
    {
      field: 'author',
      title: '作者',
      minWidth: 120,
    },
    {
      field: 'officialName',
      title: '官方名称',
      minWidth: 120,
    },
    {
      field: 'summary',
      title: '摘要',
      minWidth: 120,
    },
    {
      field: 'coverImage',
      title: '封面图',
      minWidth: 120,
      cellRender: {
        name: 'CellImage',
      },
    },
    {
      field: 'coverOrientation',
      title: '尺寸与方向',
      minWidth: 160,
      formatter: ({ row }) => {
        const direction = row.coverOrientation
          ? COVER_ORIENTATION_LABEL_MAP[row.coverOrientation]
          : '-';
        return `${row.coverWidth ?? '-'} x ${row.coverHeight ?? '-'} 方向: ${direction}`;
      },
    },
    // {
    //   field: 'sliderPicUrls',
    //   title: '轮播图地址数组',
    //   minWidth: 120,
    // },
    // {
    //   field: 'content',
    //   title: '富文本正文',
    //   minWidth: 120,
    // },
    {
      field: 'viewCount',
      title: '浏览次数',
      minWidth: 80,
    },
    {
      field: 'likeCount',
      title: '点赞次数',
      minWidth: 80,
    },
    {
      field: 'sort',
      title: '排序',
      minWidth: 80,
    },
    {
      field: 'status',
      title: '状态',
      minWidth: 80,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.GIFT_ARTICLE_STATUS },
      },
    },
    {
      field: 'publishTime',
      title: '发布时间',
      minWidth: 150,
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
