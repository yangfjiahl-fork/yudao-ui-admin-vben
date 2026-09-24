import type { Dayjs } from 'dayjs';

import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace GiftUserItineraryDayApi {
  /** 用户行程每日安排信息 */
  export interface UserItineraryDay {
    id: number; // 用户行程日程ID
    userItineraryId?: number; // 用户行程ID
    day?: number; // 行程第几天，从1开始
    date: Dayjs | string; // 行程日期
    provinceId: number; // 当日省级区域ID
    cityId: number; // 当日城市ID
    districtId: number; // 当日区县ID
    city: string; // 当日城市名称
    area: string; // 当日游玩区域
    theme: string; // 当日行程主题
    anchorPoiNamesJson: string; // 当日锚点POI名称JSON
    sort?: number; // 排序值
    overviewStatus: string; // 每日总览生成状态
    overviewSkeleton: string; // 每日总览骨架文案
    overviewDetail: string; // 每日总览详细文案
    planner: string; // 当日规划器
    planningStatus: string; // 当日排程状态
    macroSource: string; // 宏观路线来源
    selectionStatus: string; // 景点选择状态
    budgetStatus: string; // 预算校验状态
    requestedScenicCount: number; // 期望景点数量
    selectedScenicCount: number; // 实际选择景点数量
    dayStartTime: string; // 当日开始时间
    dayEndTime: string; // 当日结束时间
    droppedNodeIdsJson: string; // 排程丢弃的节点ID JSON
    candidateCountsJson: string; // 各类候选数量JSON
  }
}

/** 查询用户行程每日安排分页 */
export function getUserItineraryDayPage(params: PageParam) {
  return requestClient.get<
    PageResult<GiftUserItineraryDayApi.UserItineraryDay>
  >('/gift/user-itinerary-day/page', { params });
}

/** 查询用户行程每日安排详情 */
export function getUserItineraryDay(id: number) {
  return requestClient.get<GiftUserItineraryDayApi.UserItineraryDay>(
    `/gift/user-itinerary-day/get?id=${id}`,
  );
}

/** 新增用户行程每日安排 */
export function createUserItineraryDay(
  data: GiftUserItineraryDayApi.UserItineraryDay,
) {
  return requestClient.post('/gift/user-itinerary-day/create', data);
}

/** 修改用户行程每日安排 */
export function updateUserItineraryDay(
  data: GiftUserItineraryDayApi.UserItineraryDay,
) {
  return requestClient.put('/gift/user-itinerary-day/update', data);
}

/** 删除用户行程每日安排 */
export function deleteUserItineraryDay(id: number) {
  return requestClient.delete(`/gift/user-itinerary-day/delete?id=${id}`);
}

/** 批量删除用户行程每日安排 */
export function deleteUserItineraryDayList(ids: number[]) {
  return requestClient.delete(
    `/gift/user-itinerary-day/delete-list?ids=${ids.join(',')}`,
  );
}

/** 导出用户行程每日安排 */
export function exportUserItineraryDay(params: any) {
  return requestClient.download('/gift/user-itinerary-day/export-excel', {
    params,
  });
}
