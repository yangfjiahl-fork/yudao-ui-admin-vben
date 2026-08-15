import { requestClient } from '#/api/request';

export namespace GiftArticleCategoryApi {
  /** 文章分类信息 */
  export interface ArticleCategory {
    id: number;
    parentId: number; // 父分类编号，0 表示一级分类
    name?: string; // 分类名称
    picUrl?: string; // 分类图片地址
    sort?: number; // 排序值，越大越靠前
    status?: number; // 状态：0-禁用，1-启用
    children?: ArticleCategory[];
  }
}

/** 查询文章分类列表 */
export function getArticleCategoryList(params: any) {
  return requestClient.get<GiftArticleCategoryApi.ArticleCategory[]>(
    '/gift/article-category/list',
    { params },
  );
}

/** 查询文章分类详情 */
export function getArticleCategory(id: number) {
  return requestClient.get<GiftArticleCategoryApi.ArticleCategory>(
    `/gift/article-category/get?id=${id}`,
  );
}

/** 新增文章分类 */
export function createArticleCategory(
  data: GiftArticleCategoryApi.ArticleCategory,
) {
  return requestClient.post('/gift/article-category/create', data);
}

/** 修改文章分类 */
export function updateArticleCategory(
  data: GiftArticleCategoryApi.ArticleCategory,
) {
  return requestClient.put('/gift/article-category/update', data);
}

/** 删除文章分类 */
export function deleteArticleCategory(id: number) {
  return requestClient.delete(`/gift/article-category/delete?id=${id}`);
}

/** 导出文章分类 */
export function exportArticleCategory(params: any) {
  return requestClient.download('/gift/article-category/export-excel', {
    params,
  });
}
