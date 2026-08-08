import type { RouteRecordRaw } from 'vue-router';

import { defineAsyncComponent, defineComponent, h } from 'vue';

const GiftArticleForm = defineAsyncComponent(
  () => import('#/views/gift/article/modules/form.vue'),
);

function createGiftArticleFormRoute(name: string) {
  return defineComponent({
    name,
    setup: () => () => h(GiftArticleForm),
  });
}

const routes: RouteRecordRaw[] = [
  {
    path: '/gift/article',
    name: 'GiftArticleCenter',
    meta: {
      title: '文章管理',
      hideInMenu: true,
      keepAlive: true,
    },
    children: [
      {
        path: 'add',
        name: 'GiftArticleAdd',
        meta: {
          title: '新增文章',
          activePath: '/gift/article',
          keepAlive: true,
        },
        component: createGiftArticleFormRoute('GiftArticleAdd'),
      },
      {
        path: String.raw`edit/:id(\d+)`,
        name: 'GiftArticleEdit',
        meta: {
          title: '修改文章',
          activePath: '/gift/article',
          keepAlive: true,
        },
        component: createGiftArticleFormRoute('GiftArticleEdit'),
      },
      {
        path: String.raw`detail/:id(\d+)`,
        name: 'GiftArticleDetail',
        meta: {
          title: '文章详情',
          activePath: '/gift/article',
          keepAlive: true,
        },
        component: createGiftArticleFormRoute('GiftArticleDetail'),
      },
    ],
  },
];

export default routes;
