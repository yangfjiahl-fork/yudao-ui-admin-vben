import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace GiftItineraryDayItemApi {
  /** 通用行程节点信息 */
  export interface ItineraryDayItem {
    id: number; // 通用行程节点ID
    itineraryId?: number; // 通用行程ID
    itineraryDayId?: number; // 通用行程日程ID
    type?: string; // 节点类型
    slot: string; // 节点时段
    title?: string; // 节点标题
    subTitle: string; // 节点副标题
    description?: string; // 节点描述
    sort?: number; // 当日节点排序值
    startTime: string; // 计划开始时间
    durationMinutes: number; // 建议停留分钟数
    poiId: string; // POI供应商地点ID
    provinceId: number; // POI省级区域ID
    cityId: number; // POI城市ID
    cityName?: string; // POI城市名称
    provinceName?: string; // POI省份名称
    districtId: number; // POI区县ID
    longitude: number; // POI经度
    latitude: number; // POI纬度
    coverUrl: string; // 封面图地址
    coverWidth: number; // 封面图宽度
    coverHeight: number; // 封面图高度
    picUrls: string; // 图片地址集合
    picSizes: string; // 图片尺寸集合
    tags: string; // 标签集合
    gdPosition: string; // 高德地图坐标
    businessTime: string; // 营业时间
    addressDetail: string; // 详细地址
    phoneNo: string; // 联系电话
  }
}

/** 查询通用行程节点分页 */
export function getItineraryDayItemPage(params: PageParam) {
  return requestClient.get<
    PageResult<GiftItineraryDayItemApi.ItineraryDayItem>
  >('/gift/itinerary-day-item/page', { params });
}

/** 查询通用行程节点详情 */
export function getItineraryDayItem(id: number) {
  return requestClient.get<GiftItineraryDayItemApi.ItineraryDayItem>(
    `/gift/itinerary-day-item/get?id=${id}`,
  );
}

/** 新增通用行程节点 */
export function createItineraryDayItem(
  data: GiftItineraryDayItemApi.ItineraryDayItem,
) {
  return requestClient.post('/gift/itinerary-day-item/create', data);
}

/** 修改通用行程节点 */
export function updateItineraryDayItem(
  data: GiftItineraryDayItemApi.ItineraryDayItem,
) {
  return requestClient.put('/gift/itinerary-day-item/update', data);
}

/** 删除通用行程节点 */
export function deleteItineraryDayItem(id: number) {
  return requestClient.delete(`/gift/itinerary-day-item/delete?id=${id}`);
}

/** 批量删除通用行程节点 */
export function deleteItineraryDayItemList(ids: number[]) {
  return requestClient.delete(
    `/gift/itinerary-day-item/delete-list?ids=${ids.join(',')}`,
  );
}

/** 导出通用行程节点 */
export function exportItineraryDayItem(params: any) {
  return requestClient.download('/gift/itinerary-day-item/export-excel', {
    params,
  });
}
