import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace GiftUserItineraryLikedApi {
  /** 收藏行程信息 */
  export interface UserItineraryLiked {
    id: number; // 主键
    itineraryId?: number; // 行程ID
    itineraryName?: string; // 行程名称
    memberId?: number; // 会员ID
    memberName?: string; // 会员名称
  }
}

/** 查询收藏行程分页 */
export function getUserItineraryLikedPage(params: PageParam) {
  return requestClient.get<
    PageResult<GiftUserItineraryLikedApi.UserItineraryLiked>
  >('/gift/user-itinerary-liked/page', { params });
}

/** 查询收藏行程详情 */
export function getUserItineraryLiked(id: number) {
  return requestClient.get<GiftUserItineraryLikedApi.UserItineraryLiked>(
    `/gift/user-itinerary-liked/get?id=${id}`,
  );
}

/** 新增收藏行程 */
export function createUserItineraryLiked(
  data: GiftUserItineraryLikedApi.UserItineraryLiked,
) {
  return requestClient.post('/gift/user-itinerary-liked/create', data);
}

/** 修改收藏行程 */
export function updateUserItineraryLiked(
  data: GiftUserItineraryLikedApi.UserItineraryLiked,
) {
  return requestClient.put('/gift/user-itinerary-liked/update', data);
}

/** 删除收藏行程 */
export function deleteUserItineraryLiked(id: number) {
  return requestClient.delete(`/gift/user-itinerary-liked/delete?id=${id}`);
}

/** 批量删除收藏行程 */
export function deleteUserItineraryLikedList(ids: number[]) {
  return requestClient.delete(
    `/gift/user-itinerary-liked/delete-list?ids=${ids.join(',')}`,
  );
}

/** 导出收藏行程 */
export function exportUserItineraryLiked(params: any) {
  return requestClient.download('/gift/user-itinerary-liked/export-excel', {
    params,
  });
}
