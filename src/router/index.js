import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: { name: 'popular', query: { page: 1 } }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchedMovies.vue'),
    props: true
  },
  {
    path: '/popular',
    name: 'popular',
    component: () => import('../views/PopularMovies.vue'),
    props: true
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component: () => import('../views/Movie.vue'),
    props: true
  },
  {
    path: '/person/:id',
    name: 'person',
    component: () => import('../views/Person.vue'),
    props: true
  },
  {
    path: '/tv/:id',
    name: 'tv',
    component: () => import('../views/TV.vue'),
    props: true
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
