import type { Component } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

import { defineAsyncComponent, defineComponent, h } from 'vue';

const GiftArticleForm = defineAsyncComponent(
  () => import('#/views/gift/article/modules/form.vue'),
);
const GiftItineraryForm = defineAsyncComponent(
  () => import('#/views/gift/itinerary/modules/form.vue'),
);
const GiftItineraryDayItemForm = defineAsyncComponent(
  () => import('#/views/gift/itinerarydayitem/modules/form.vue'),
);

function createFormRoute(name: string, FormComponent: Component) {
  return defineComponent({
    name,
    setup: () => () => h(FormComponent),
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
        component: createFormRoute('GiftArticleAdd', GiftArticleForm),
      },
      {
        path: String.raw`edit/:id(\d+)`,
        name: 'GiftArticleEdit',
        meta: {
          title: '修改文章',
          activePath: '/gift/article',
          keepAlive: true,
        },
        component: createFormRoute('GiftArticleEdit', GiftArticleForm),
      },
      {
        path: String.raw`detail/:id(\d+)`,
        name: 'GiftArticleDetail',
        meta: {
          title: '文章详情',
          activePath: '/gift/article',
          keepAlive: true,
        },
        component: createFormRoute('GiftArticleDetail', GiftArticleForm),
      },
    ],
  },
  {
    path: '/gift/itinerary',
    name: 'GiftItineraryFormCenter',
    meta: {
      title: '行程管理',
      hideInMenu: true,
      keepAlive: true,
    },
    children: [
      {
        path: 'add',
        name: 'GiftItineraryAdd',
        meta: {
          title: '新增行程',
          activePath: '/gift/itinerary',
          keepAlive: true,
        },
        component: createFormRoute('GiftItineraryAdd', GiftItineraryForm),
      },
      {
        path: String.raw`edit/:id(\d+)`,
        name: 'GiftItineraryEdit',
        meta: {
          title: '编辑行程',
          activePath: '/gift/itinerary',
          keepAlive: true,
        },
        component: createFormRoute('GiftItineraryEdit', GiftItineraryForm),
      },
    ],
  },
  {
    path: '/gift/itinerarydayitem',
    name: 'GiftItineraryDayItemFormCenter',
    meta: {
      title: '行程节点管理',
      hideInMenu: true,
      keepAlive: true,
    },
    children: [
      {
        path: 'add',
        name: 'GiftItineraryDayItemAdd',
        meta: {
          title: '新增行程节点',
          activePath: '/gift/itinerarydayitem',
          keepAlive: true,
        },
        component: createFormRoute(
          'GiftItineraryDayItemAdd',
          GiftItineraryDayItemForm,
        ),
      },
      {
        path: String.raw`edit/:id(\d+)`,
        name: 'GiftItineraryDayItemEdit',
        meta: {
          title: '编辑行程节点',
          activePath: '/gift/itinerarydayitem',
          keepAlive: true,
        },
        component: createFormRoute(
          'GiftItineraryDayItemEdit',
          GiftItineraryDayItemForm,
        ),
      },
    ],
  },
];

export default routes;
