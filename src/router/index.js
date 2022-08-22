import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import TaskHistory from '../views/TaskHistory.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/task-history',
    name: 'task-history',
    component: TaskHistory
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
