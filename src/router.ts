import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/home/home.vue';
import Login from '@/pages/login/login.vue';
import Report from '@/pages/report/report.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/report',
      name: 'report',
      component: Report,
    },
  ],
});
