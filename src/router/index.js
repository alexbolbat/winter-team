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
    component: () => import('../views/SearchPage.vue'),
    props: true
  },
  {
    path: '/popular',
    name: 'popular',
    component: () => import('../components/PopularMovies.vue'),
    props: true
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component: () => import('../components/Movie.vue'),
    props: true
  },
  {
    path: '/person/:id',
    name: 'person',
    component: () => import('../components/Person.vue'),
    props: true
  },
  {
    path: '/tv/:id',
    name: 'tv',
    component: () => import('../components/TV.vue'),
    props: true
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
