import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/SearchView.vue')
    },
    {
      path: '/shows/:id',
      name: 'ShowView',
      component: () => import('@/views/MobileShowView.vue')
    },
    {
      path: '/shows/hot',
      name: 'NewHotShowsView',
      component: () => import('@/views/NewHotShows.vue')
    },
    {
      path: '/watchlist',
      name: 'WatchListView',
      component: () => import('@/views/WatchListView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFOundView',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

export default router
