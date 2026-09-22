import type { Dayjs } from 'dayjs';

import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace GiftUserItineraryApi {
  /** 用户行程信息 */
  export interface UserItinerary {
    id: number; // 主键
    memberId?: number; // 会员ID
    title?: string; // 标题
    coverUrl?: string; // 封面图
    coverWidth?: number; // 宽度
    coverHeight?: number; // 高度
    startDate: Dayjs | string; // 开始日期
    endDate: Dayjs | string; // 完成日期
    dayCnt?: number; // 天数
    cityId?: number; // 城市ID
    nextCityId: number; // 城市ID
    preference: string; // 偏好
  }
}

/** 查询用户行程分页 */
export function getUserItineraryPage(params: PageParam) {
  return requestClient.get<PageResult<GiftUserItineraryApi.UserItinerary>>(
    '/gift/user-itinerary/page',
    { params },
  );
}

/** 查询用户行程详情 */
export function getUserItinerary(id: number) {
  return requestClient.get<GiftUserItineraryApi.UserItinerary>(
    `/gift/user-itinerary/get?id=${id}`,
  );
}

/** 新增用户行程 */
export function createUserItinerary(data: GiftUserItineraryApi.UserItinerary) {
  return requestClient.post('/gift/user-itinerary/create', data);
}

/** 修改用户行程 */
export function updateUserItinerary(data: GiftUserItineraryApi.UserItinerary) {
  return requestClient.put('/gift/user-itinerary/update', data);
}

/** 删除用户行程 */
export function deleteUserItinerary(id: number) {
  return requestClient.delete(`/gift/user-itinerary/delete?id=${id}`);
}

/** 批量删除用户行程 */
export function deleteUserItineraryList(ids: number[]) {
  return requestClient.delete(
    `/gift/user-itinerary/delete-list?ids=${ids.join(',')}`,
  );
}

/** 导出用户行程 */
export function exportUserItinerary(params: any) {
  return requestClient.download('/gift/user-itinerary/export-excel', {
    params,
  });
}
