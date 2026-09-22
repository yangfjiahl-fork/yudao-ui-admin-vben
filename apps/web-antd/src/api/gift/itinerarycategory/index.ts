import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace GiftItineraryCategoryApi {
  /** 线路类别信息 */
  export interface ItineraryCategory {
    id: number; // 主键
    title?: string; // 标题
    icon?: string; // 图标
    sort?: number; // 排序
  }
}

/** 查询线路类别分页 */
export function getItineraryCategoryPage(params: PageParam) {
  return requestClient.get<
    PageResult<GiftItineraryCategoryApi.ItineraryCategory>
  >('/gift/itinerary-category/page', { params });
}

/** 查询线路类别详情 */
export function getItineraryCategory(id: number) {
  return requestClient.get<GiftItineraryCategoryApi.ItineraryCategory>(
    `/gift/itinerary-category/get?id=${id}`,
  );
}

/** 新增线路类别 */
export function createItineraryCategory(
  data: GiftItineraryCategoryApi.ItineraryCategory,
) {
  return requestClient.post('/gift/itinerary-category/create', data);
}

/** 修改线路类别 */
export function updateItineraryCategory(
  data: GiftItineraryCategoryApi.ItineraryCategory,
) {
  return requestClient.put('/gift/itinerary-category/update', data);
}

/** 删除线路类别 */
export function deleteItineraryCategory(id: number) {
  return requestClient.delete(`/gift/itinerary-category/delete?id=${id}`);
}

/** 批量删除线路类别 */
export function deleteItineraryCategoryList(ids: number[]) {
  return requestClient.delete(
    `/gift/itinerary-category/delete-list?ids=${ids.join(',')}`,
  );
}

/** 导出线路类别 */
export function exportItineraryCategory(params: any) {
  return requestClient.download('/gift/itinerary-category/export-excel', {
    params,
  });
}
