import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace GiftArticleApi {
  /** 图片尺寸 */
  export interface ImageSize {
    h: number;
    w: number;
  }

  /** 文章信息 */
  export interface Article {
    id?: number; // 主键
    memberId?: number; // 文章作者会员编号
    categoryId?: number; // 文章分类编号，发布时要求为末级分类
    suffixId?: number; // 文章后缀编号
    title?: string; // 标题
    author?: string; // 作者
    officialName?: string; // 官方名称
    summary?: string; // 摘要
    coverImage?: string; // 封面图地址
    coverWidth?: null | number; // 封面图显示宽度
    coverHeight?: null | number; // 封面图显示高度
    coverOrientation?: 'landscape' | 'portrait' | 'square' | null; // 封面图方向
    sliderPicUrls?: string[]; // 轮播图地址数组
    sliderPicSize?: ImageSize[]; // 轮播图尺寸数组
    content?: string; // 站内富文本正文
    viewCount?: number; // 浏览次数
    likeCount?: number; // 点赞次数
    sort?: number; // 排序值，越大越靠前
    status?: number; // 状态：1-草稿，3-已下线，5-已发布
    publishTime?: string; // 发布时间，后端下发格式：YYYY-MM-DD HH:mm:ss
  }

  /** 保存文章请求 */
  export interface ArticleSaveReq extends Omit<Article, 'publishTime'> {
    publishTime?: number; // 发布时间，毫秒时间戳
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
export function createArticle(data: GiftArticleApi.ArticleSaveReq) {
  return requestClient.post('/gift/article/create', data);
}

/** 修改文章 */
export function updateArticle(data: GiftArticleApi.ArticleSaveReq) {
  return requestClient.put('/gift/article/update', data);
}

/** 修改文章状态 */
export function changeArticleStatus(ids: number[], status: number) {
  return requestClient.put('/gift/article/change-status', { ids, status });
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
