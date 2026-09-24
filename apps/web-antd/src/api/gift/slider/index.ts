import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace GiftSliderApi {
  /** 轮播信息 */
  export interface Slider {
    id: number; // 主键
    positionCode: string; // 轮播位置
    cityId?: number; // 城市ID
  }
}

/** 查询轮播分页 */
export function getSliderPage(params: PageParam) {
  return requestClient.get<PageResult<GiftSliderApi.Slider>>(
    '/gift/slider/page',
    { params },
  );
}

/** 查询轮播详情 */
export function getSlider(id: number) {
  return requestClient.get<GiftSliderApi.Slider>(`/gift/slider/get?id=${id}`);
}

/** 新增轮播 */
export function createSlider(data: GiftSliderApi.Slider) {
  return requestClient.post('/gift/slider/create', data);
}

/** 修改轮播 */
export function updateSlider(data: GiftSliderApi.Slider) {
  return requestClient.put('/gift/slider/update', data);
}

/** 删除轮播 */
export function deleteSlider(id: number) {
  return requestClient.delete(`/gift/slider/delete?id=${id}`);
}

/** 批量删除轮播 */
export function deleteSliderList(ids: number[]) {
  return requestClient.delete(`/gift/slider/delete-list?ids=${ids.join(',')}`);
}

/** 导出轮播 */
export function exportSlider(params: any) {
  return requestClient.download('/gift/slider/export-excel', { params });
}
