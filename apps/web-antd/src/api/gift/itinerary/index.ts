import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace GiftItineraryApi {
  export interface ImageSize {
    h: number;
    w: number;
  }

  /** 线路信息 */
  export interface Itinerary {
    id: number; // 主键
    cityId?: number; // 城市ID
    cityName?: string; // 城市名称
    provinceName?: string; // 省份名称
    categoryId?: number; // 类别ID
    categoryName?: string; // 行程类别名称
    title?: string; // 标题
    subTitle?: string; // 副标题
    description?: string; // 描述
    icon: string; // 图标
    picUrls?: string; // 多图片
    picSizes: string; // 图片尺寸
    tags?: string; // 标签
    coverUrl: string; // 封面图
    coverWidth?: number; // 封面宽度
    coverHeight?: number; // 封面高度
    nextCityId: number; // 第二城市ID
    viewCnt?: number; // 浏览数
    likeCnt?: number; // 点赞数
    sort?: number; // 排序
  }
}

/** 查询线路分页 */
export function getItineraryPage(params: PageParam) {
  return requestClient.get<PageResult<GiftItineraryApi.Itinerary>>(
    '/gift/itinerary/page',
    { params },
  );
}

/** 查询线路详情 */
export function getItinerary(id: number) {
  return requestClient.get<GiftItineraryApi.Itinerary>(
    `/gift/itinerary/get?id=${id}`,
  );
}

/** 新增线路 */
export function createItinerary(data: GiftItineraryApi.Itinerary) {
  return requestClient.post('/gift/itinerary/create', data);
}

/** 修改线路 */
export function updateItinerary(data: GiftItineraryApi.Itinerary) {
  return requestClient.put('/gift/itinerary/update', data);
}

/** 删除线路 */
export function deleteItinerary(id: number) {
  return requestClient.delete(`/gift/itinerary/delete?id=${id}`);
}

/** 批量删除线路 */
export function deleteItineraryList(ids: number[]) {
  return requestClient.delete(
    `/gift/itinerary/delete-list?ids=${ids.join(',')}`,
  );
}

/** 导出线路 */
export function exportItinerary(params: any) {
  return requestClient.download('/gift/itinerary/export-excel', { params });
}
