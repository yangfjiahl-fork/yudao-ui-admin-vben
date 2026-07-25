import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace GiftVideoApi {
  /** 视频信息 */
  export interface Video {
    id: number; // 编号
    title?: string; // 视频标题
    status?: number; // 状态
    coverUrl?: string; // 封面图片
    playUrl?: string; // 视频地址
  }
}

/** 查询视频分页 */
export function getVideoPage(params: PageParam) {
  return requestClient.get<PageResult<GiftVideoApi.Video>>('/gift/video/page', {
    params,
  });
}

/** 查询视频详情 */
export function getVideo(id: number) {
  return requestClient.get<GiftVideoApi.Video>(`/gift/video/get?id=${id}`);
}

/** 新增视频 */
export function createVideo(data: GiftVideoApi.Video) {
  return requestClient.post('/gift/video/create', data);
}

/** 修改视频 */
export function updateVideo(data: GiftVideoApi.Video) {
  return requestClient.put('/gift/video/update', data);
}

/** 删除视频 */
export function deleteVideo(id: number) {
  return requestClient.delete(`/gift/video/delete?id=${id}`);
}

/** 批量删除视频 */
export function deleteVideoList(ids: number[]) {
  return requestClient.delete(`/gift/video/delete-list?ids=${ids.join(',')}`);
}

/** 导出视频 */
export function exportVideo(params: any) {
  return requestClient.download('/gift/video/export-excel', { params });
}
