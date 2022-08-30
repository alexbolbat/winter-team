import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'popular', query: { page: 1 } },
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchPage.vue'),
    props: true
  },
  {
    path: '/popular',
    name: 'popular',
    component: () => import('../components/PopularFilmList.vue'),
    props: true
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
