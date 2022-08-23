import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)



const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomePage.vue'),
  },
  {
    path: '/search/:query',
    name: 'search',
    component: () => import('../views/SearchPage.vue'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
