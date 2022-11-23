import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/components/layouts/Layout.vue'
import EmptyLayout from '@/components/layouts/EmptyLayout.vue'
import Welcome from '@/pages/Welcome.vue'
import NeedAuth from '@/pages/NeedAuth.vue'
import NotFound from '@/pages/NotFound.vue'
import NoPermission from '@/pages/NoPermission.vue'
import { setupRouterGuard } from './guards'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'welcome',
        component: Welcome,
        meta: {
          title: '欢迎页',
          ignoreAuth: true,
        },
      },
      {
        path: 'need-auth',
        component: NeedAuth,
        meta: {
          title: '管理页',
          ignoreAuth: false,
        },
      },
    ],
  },
  {
    path: '/',
    component: EmptyLayout,
    children: [
      {
        path: '/not-found',
        component: NotFound,
        meta: {
          ignoreAuth: true,
        },
      },
      {
        path: '/no-permission',
        component: NoPermission,
        meta: {
          ignoreAuth: true,
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: EmptyLayout,
    children: [
      {
        path: '',
        name: 'notfound',
        component: NotFound,
        meta: {
          ignoreAuth: true,
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

setupRouterGuard(router)

export default router
