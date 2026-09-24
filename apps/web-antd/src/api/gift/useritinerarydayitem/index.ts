import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace GiftUserItineraryDayItemApi {
  /** 用户行程节点信息 */
  export interface UserItineraryDayItem {
    id: number; // 用户行程节点记录ID
    userItineraryId?: number; // 用户行程ID
    userItineraryDayId?: number; // 用户行程日程ID
    itemId?: string; // 行程节点业务ID
    day?: number; // 所属行程天数
    type?: string; // 节点类型
    slot?: string; // 节点时段
    label: string; // 节点展示标签
    sort?: number; // 当日节点排序值
    startTime: string; // 计划开始时间
    endTime: string; // 计划结束时间
    durationMinutes: number; // 建议停留分钟数
    poiId: string; // POI供应商地点ID
    poiName: string; // POI名称
    provinceId: number; // POI省级区域ID
    cityId: number; // POI城市ID
    districtId: number; // POI区县ID
    city: string; // POI城市名称
    area: string; // POI所在区域
    addressDetail: string; // POI详细地址
    longitude: number; // POI经度
    latitude: number; // POI纬度
    coordinateSystem: string; // 坐标系
    businessHours: string; // 营业时间
    phoneNo: string; // 联系电话
    coverUrl: string; // 封面图地址
    rating: number; // 评分
    cost: number; // 预计花费
    tagsJson: string; // 标签JSON
    skeleton: string; // 节点骨架文案
    detail: string; // 节点详细文案
    status?: string; // 节点内容状态
    resolveStatus?: number; // 节点解析状态
    planningStatus: string; // 节点排程状态
    poiVerificationStatus: string; // POI校验状态
    mustVisit?: boolean; // 是否必去
    locked?: boolean; // 是否锁定
    source: string; // 节点来源
    provider: string; // POI数据供应商
    poiSnapshotJson: string; // POI快照JSON
    candidatesJson: string; // 候选POI JSON
    citationIdsJson: string; // 引用来源ID JSON
  }
}

/** 查询用户行程节点分页 */
export function getUserItineraryDayItemPage(params: PageParam) {
  return requestClient.get<
    PageResult<GiftUserItineraryDayItemApi.UserItineraryDayItem>
  >('/gift/user-itinerary-day-item/page', { params });
}

/** 查询用户行程节点详情 */
export function getUserItineraryDayItem(id: number) {
  return requestClient.get<GiftUserItineraryDayItemApi.UserItineraryDayItem>(
    `/gift/user-itinerary-day-item/get?id=${id}`,
  );
}

/** 新增用户行程节点 */
export function createUserItineraryDayItem(
  data: GiftUserItineraryDayItemApi.UserItineraryDayItem,
) {
  return requestClient.post('/gift/user-itinerary-day-item/create', data);
}

/** 修改用户行程节点 */
export function updateUserItineraryDayItem(
  data: GiftUserItineraryDayItemApi.UserItineraryDayItem,
) {
  return requestClient.put('/gift/user-itinerary-day-item/update', data);
}

/** 删除用户行程节点 */
export function deleteUserItineraryDayItem(id: number) {
  return requestClient.delete(`/gift/user-itinerary-day-item/delete?id=${id}`);
}

/** 批量删除用户行程节点 */
export function deleteUserItineraryDayItemList(ids: number[]) {
  return requestClient.delete(
    `/gift/user-itinerary-day-item/delete-list?ids=${ids.join(',')}`,
  );
}

/** 导出用户行程节点 */
export function exportUserItineraryDayItem(params: any) {
  return requestClient.download('/gift/user-itinerary-day-item/export-excel', {
    params,
  });
}
