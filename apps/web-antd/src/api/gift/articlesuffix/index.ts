import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace GiftArticleSuffixApi {
  /** 文章后缀信息 */
  export interface ArticleSuffix {
    title?: string; // 签名标题
    content?: string; // 签名内容
  }
}

/** 查询文章后缀分页 */
export function getArticleSuffixPage(params: PageParam) {
  return requestClient.get<PageResult<GiftArticleSuffixApi.ArticleSuffix>>(
    '/gift/article-suffix/page',
    { params },
  );
}

/** 查询文章后缀详情 */
export function getArticleSuffix(id: number) {
  return requestClient.get<GiftArticleSuffixApi.ArticleSuffix>(
    `/gift/article-suffix/get?id=${id}`,
  );
}

/** 新增文章后缀 */
export function createArticleSuffix(data: GiftArticleSuffixApi.ArticleSuffix) {
  return requestClient.post('/gift/article-suffix/create', data);
}

/** 修改文章后缀 */
export function updateArticleSuffix(data: GiftArticleSuffixApi.ArticleSuffix) {
  return requestClient.put('/gift/article-suffix/update', data);
}

/** 删除文章后缀 */
export function deleteArticleSuffix(id: number) {
  return requestClient.delete(`/gift/article-suffix/delete?id=${id}`);
}

/** 批量删除文章后缀 */
export function deleteArticleSuffixList(ids: number[]) {
  return requestClient.delete(
    `/gift/article-suffix/delete-list?ids=${ids.join(',')}`,
  );
}

/** 导出文章后缀 */
export function exportArticleSuffix(params: any) {
  return requestClient.download('/gift/article-suffix/export-excel', {
    params,
  });
}
