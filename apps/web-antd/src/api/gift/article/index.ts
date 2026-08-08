import type { Dayjs } from 'dayjs';

import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace GiftArticleApi {
  /** 文章信息 */
  export interface Article {
    id?: number; // 主键
    memberId?: number; // 文章作者会员编号
    categoryId?: number; // 文章分类编号，发布时要求为末级分类
    title?: string; // 标题
    summary?: string; // 摘要
    coverImage?: string; // 封面图地址
    sliderPicUrls?: string[]; // 轮播图地址数组
    content?: string; // 站内富文本正文
    viewCount?: number; // 浏览次数
    likeCount?: number; // 点赞次数
    sort?: number; // 排序值，越大越靠前
    status?: number; // 状态：0-草稿，1-已发布，2-已下架
    publishTime?: Dayjs | string; // 发布时间
  }
}

/** 查询文章分页 */
export function getArticlePage(params: PageParam) {
  return requestClient.get<PageResult<GiftArticleApi.Article>>(
    '/gift/article/page',
    { params },
  );
}

/** 查询文章详情 */
export function getArticle(id: number) {
  return requestClient.get<GiftArticleApi.Article>(
    `/gift/article/get?id=${id}`,
  );
}

/** 新增文章 */
export function createArticle(data: GiftArticleApi.Article) {
  return requestClient.post('/gift/article/create', data);
}

/** 修改文章 */
export function updateArticle(data: GiftArticleApi.Article) {
  return requestClient.put('/gift/article/update', data);
}

/** 删除文章 */
export function deleteArticle(id: number) {
  return requestClient.delete(`/gift/article/delete?id=${id}`);
}

/** 批量删除文章 */
export function deleteArticleList(ids: number[]) {
  return requestClient.delete(`/gift/article/delete-list?ids=${ids.join(',')}`);
}

/** 导出文章 */
export function exportArticle(params: any) {
  return requestClient.download('/gift/article/export-excel', { params });
}
