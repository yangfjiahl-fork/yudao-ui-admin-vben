import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { GiftVideoApi } from '#/api/gift/video';

import { h } from 'vue';

import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

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
      fieldName: 'title',
      label: '视频标题',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入视频标题',
      },
    },
    {
      fieldName: 'status',
      label: '状态',
      rules: 'required',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.GIFT_VIDEO_STATUS, 'number'),
        placeholder: '请选择状态',
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'vodVideoId',
      label: '阿里云 VOD VideoId',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入阿里云 VOD VideoId',
      },
    },
    {
      fieldName: 'status',
      label: '状态',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: getDictOptions(DICT_TYPE.GIFT_VIDEO_STATUS, 'number'),
        placeholder: '请选择状态',
      },
    },
    {
      fieldName: 'quality',
      label: '清晰度',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: getDictOptions(DICT_TYPE.GIFT_VIDEO_QUALITY, 'number'),
        placeholder: '请选择清晰度',
      },
    },
  ];
}

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions<GiftVideoApi.Video>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: '编号',
      minWidth: 120,
    },
    {
      field: 'vodVideoId',
      title: '阿里云 VOD VideoId',
      minWidth: 120,
    },
    {
      field: 'title',
      title: '视频标题',
      minWidth: 120,
    },
    {
      field: 'status',
      title: '状态',
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.GIFT_VIDEO_STATUS },
      },
    },
    {
      field: 'coverUrl',
      title: '视频封面图',
      minWidth: 120,
      // 使用 slots.default 替代 cellRender
      slots: {
        default: ({ row }) => {
          if (!row.coverUrl) return '-';
          return h(
            'a',
            {
              href: row.coverUrl,
              target: '_blank',
              rel: 'noopener noreferrer',
              class: 'text-primary hover:underline',
            },
            '查看封面图片',
          );
        },
      },
    },
    {
      field: 'playUrl',
      title: '基础播放地址',
      minWidth: 120,
      // 使用 slots.default 替代 cellRender
      slots: {
        default: ({ row }) => {
          if (!row.playUrl) return '-';
          return h(
            'a',
            {
              href: row.playUrl,
              target: '_blank',
              rel: 'noopener noreferrer',
              class: 'text-primary hover:underline',
            },
            '查看视频',
          );
        },
      },
    },
    {
      field: 'duration',
      title: '视频时长毫秒',
      minWidth: 120,
    },
    {
      field: 'width',
      title: '视频宽度',
      minWidth: 120,
    },
    {
      field: 'height',
      title: '视频高度',
      minWidth: 120,
    },
    {
      field: 'fileSize',
      title: '文件大小',
      minWidth: 120,
    },
    {
      field: 'quality',
      title: '清晰度',
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.GIFT_VIDEO_QUALITY },
      },
    },
    {
      field: 'createTime',
      title: '创建时间',
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
