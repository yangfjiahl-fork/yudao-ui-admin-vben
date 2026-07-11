import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace GiftWoolApi {
  /** 羊毛信息 */
  export interface Wool {
    id: number; // 编号
    bizType?: string; // 业务场景
    bizId?: string; // 业务编号
    amount?: number; // 数量
    status?: string; // 状态
    memberId?: number; // 会员编号
  }
}

/** 查询羊毛分页 */
export function getWoolPage(params: PageParam) {
  return requestClient.get<PageResult<GiftWoolApi.Wool>>('/gift/wool/page', {
    params,
  });
}

/** 查询羊毛详情 */
export function getWool(id: number) {
  return requestClient.get<GiftWoolApi.Wool>(`/gift/wool/get?id=${id}`);
}

/** 新增羊毛 */
export function createWool(data: GiftWoolApi.Wool) {
  return requestClient.post('/gift/wool/create', data);
}

/** 修改羊毛 */
export function updateWool(data: GiftWoolApi.Wool) {
  return requestClient.put('/gift/wool/update', data);
}

/** 删除羊毛 */
export function deleteWool(id: number) {
  return requestClient.delete(`/gift/wool/delete?id=${id}`);
}

/** 批量删除羊毛 */
export function deleteWoolList(ids: number[]) {
  return requestClient.delete(`/gift/wool/delete-list?ids=${ids.join(',')}`);
}

/** 导出羊毛 */
export function exportWool(params: any) {
  return requestClient.download('/gift/wool/export-excel', { params });
}
