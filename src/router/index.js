import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/demo'
    },
    {
      path: '/demo',
      component: () => import('@/view/demo/index.vue'),
      name: 'demo',
      meta: { title: '' }
    },
    {
      path: '/v3',
      component: () => import('@/view/vue3/index.vue'),
      name: 'vue3',
      meta: { title: 'v3' }
    }
  ]
})

export default router
