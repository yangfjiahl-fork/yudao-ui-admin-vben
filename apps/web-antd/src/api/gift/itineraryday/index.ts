import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace GiftItineraryDayApi {
  /** 通用行程每日安排信息 */
  export interface ItineraryDay {
    id: number; // 通用行程日程ID
    itineraryId?: number; // 通用行程ID
    day?: number; // 行程第几天，从1开始
    cityId: number; // 当日城市ID
    cityName?: string; // 当日城市名称
    provinceName?: string; // 当日省份名称
    districtId: number; // 当日区县ID
    title: string; // 当日标题
    description: string; // 当日描述
    sort?: number; // 排序值
  }
}

/** 查询通用行程每日安排分页 */
export function getItineraryDayPage(params: PageParam) {
  return requestClient.get<PageResult<GiftItineraryDayApi.ItineraryDay>>(
    '/gift/itinerary-day/page',
    { params },
  );
}

/** 查询通用行程每日安排详情 */
export function getItineraryDay(id: number) {
  return requestClient.get<GiftItineraryDayApi.ItineraryDay>(
    `/gift/itinerary-day/get?id=${id}`,
  );
}

/** 新增通用行程每日安排 */
export function createItineraryDay(data: GiftItineraryDayApi.ItineraryDay) {
  return requestClient.post('/gift/itinerary-day/create', data);
}

/** 修改通用行程每日安排 */
export function updateItineraryDay(data: GiftItineraryDayApi.ItineraryDay) {
  return requestClient.put('/gift/itinerary-day/update', data);
}

/** 删除通用行程每日安排 */
export function deleteItineraryDay(id: number) {
  return requestClient.delete(`/gift/itinerary-day/delete?id=${id}`);
}

/** 批量删除通用行程每日安排 */
export function deleteItineraryDayList(ids: number[]) {
  return requestClient.delete(
    `/gift/itinerary-day/delete-list?ids=${ids.join(',')}`,
  );
}

/** 导出通用行程每日安排 */
export function exportItineraryDay(params: any) {
  return requestClient.download('/gift/itinerary-day/export-excel', { params });
}
