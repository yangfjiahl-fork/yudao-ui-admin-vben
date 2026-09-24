import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace GiftUserFeedbackApi {
  /** 用户反馈信息 */
  export interface UserFeedback {
    id: number; // 用户反馈ID
    memberId: number; // 会员ID
    category: number; // 问题分类
    status: number; // 处理状态
    content: string; // 反馈问题与建议
    processRemark?: string; // 处理说明
    poiId?: string; // POI供应商地点ID
    poiName?: string; // POI名称快照
    poiProvider?: string; // POI数据供应商
    createTime?: Date; // 创建时间
  }
}

/** 查询用户反馈分页 */
export function getUserFeedbackPage(params: PageParam) {
  return requestClient.get<PageResult<GiftUserFeedbackApi.UserFeedback>>(
    '/gift/user-feedback/page',
    { params },
  );
}

/** 查询用户反馈详情 */
export function getUserFeedback(id: number) {
  return requestClient.get<GiftUserFeedbackApi.UserFeedback>(
    `/gift/user-feedback/get?id=${id}`,
  );
}

/** 新增用户反馈 */
export function createUserFeedback(data: GiftUserFeedbackApi.UserFeedback) {
  return requestClient.post('/gift/user-feedback/create', data);
}

/** 修改用户反馈 */
export function updateUserFeedback(data: GiftUserFeedbackApi.UserFeedback) {
  return requestClient.put('/gift/user-feedback/update', data);
}

/** 处理用户反馈 */
export function processUserFeedback(id: number, processRemark: string) {
  return requestClient.put('/gift/user-feedback/process', {
    id,
    processRemark,
  });
}

/** 删除用户反馈 */
export function deleteUserFeedback(id: number) {
  return requestClient.delete(`/gift/user-feedback/delete?id=${id}`);
}

/** 批量删除用户反馈 */
export function deleteUserFeedbackList(ids: number[]) {
  return requestClient.delete(
    `/gift/user-feedback/delete-list?ids=${ids.join(',')}`,
  );
}

/** 导出用户反馈 */
export function exportUserFeedback(params: any) {
  return requestClient.download('/gift/user-feedback/export-excel', { params });
}
