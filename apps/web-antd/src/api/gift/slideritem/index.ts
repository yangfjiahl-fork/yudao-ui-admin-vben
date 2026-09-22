import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace GiftSliderItemApi {
  /** 轮播图信息 */
  export interface SliderItem {
    id: number; // 主键
    sliderId?: number; // 轮播ID
    imageUrl?: string; // 图片地址
    imageWidth?: number; // 图片宽度
    imageHeight?: number; // 图片高度
    sort?: number; // 顺序
    jumpPage?: string; // 跳转页面
    jumpPageId?: number; // 跳转页面ID
  }
}

/** 查询轮播图分页 */
export function getSliderItemPage(params: PageParam) {
  return requestClient.get<PageResult<GiftSliderItemApi.SliderItem>>(
    '/gift/slider-item/page',
    { params },
  );
}

/** 查询轮播图详情 */
export function getSliderItem(id: number) {
  return requestClient.get<GiftSliderItemApi.SliderItem>(
    `/gift/slider-item/get?id=${id}`,
  );
}

/** 新增轮播图 */
export function createSliderItem(data: GiftSliderItemApi.SliderItem) {
  return requestClient.post('/gift/slider-item/create', data);
}

/** 修改轮播图 */
export function updateSliderItem(data: GiftSliderItemApi.SliderItem) {
  return requestClient.put('/gift/slider-item/update', data);
}

/** 删除轮播图 */
export function deleteSliderItem(id: number) {
  return requestClient.delete(`/gift/slider-item/delete?id=${id}`);
}

/** 批量删除轮播图 */
export function deleteSliderItemList(ids: number[]) {
  return requestClient.delete(
    `/gift/slider-item/delete-list?ids=${ids.join(',')}`,
  );
}

/** 导出轮播图 */
export function exportSliderItem(params: any) {
  return requestClient.download('/gift/slider-item/export-excel', { params });
}
