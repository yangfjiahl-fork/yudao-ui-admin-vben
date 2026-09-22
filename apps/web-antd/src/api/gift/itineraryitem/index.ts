import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace GiftItineraryItemApi {
  /** 文章信息 */
  export interface ItineraryItem {
    id: number; // 主键
    itineraryId?: number; // 线路ID
    provinceId?: number; // 省ID
    cityId?: number; // 市ID
    districtId?: number; // 区ID
    title?: string; // 标题
    subTitle: string; // 副标题
    description?: string; // 描述
    coverUrl?: string; // 封面图
    coverWidth?: number; // 宽度
    coverHeight?: number; // 高度
    picUrls?: string; // 轮播图
    picSizes?: string; // 尺寸
    tags?: string; // 标签
    sort?: number; // 排序
    gdPosition?: string; // 位置
    businessTime: string; // 营业时间
    addressDetail: string; // 详细地址
    phoneNo: string; // 电话
  }
}

/** 查询文章分页 */
export function getItineraryItemPage(params: PageParam) {
  return requestClient.get<PageResult<GiftItineraryItemApi.ItineraryItem>>(
    '/gift/itinerary-item/page',
    { params },
  );
}

/** 查询文章详情 */
export function getItineraryItem(id: number) {
  return requestClient.get<GiftItineraryItemApi.ItineraryItem>(
    `/gift/itinerary-item/get?id=${id}`,
  );
}

/** 新增文章 */
export function createItineraryItem(data: GiftItineraryItemApi.ItineraryItem) {
  return requestClient.post('/gift/itinerary-item/create', data);
}

/** 修改文章 */
export function updateItineraryItem(data: GiftItineraryItemApi.ItineraryItem) {
  return requestClient.put('/gift/itinerary-item/update', data);
}

/** 删除文章 */
export function deleteItineraryItem(id: number) {
  return requestClient.delete(`/gift/itinerary-item/delete?id=${id}`);
}

/** 批量删除文章 */
export function deleteItineraryItemList(ids: number[]) {
  return requestClient.delete(
    `/gift/itinerary-item/delete-list?ids=${ids.join(',')}`,
  );
}

/** 导出文章 */
export function exportItineraryItem(params: any) {
  return requestClient.download('/gift/itinerary-item/export-excel', {
    params,
  });
}
