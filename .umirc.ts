import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/login', component: '@/pages/login' },
    {
      path: '/',
      component: '@/layouts/BasicLayout',
      routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: '@/pages/index' },
        { path: '/cart', component: '@/pages/cart/index' },
        { path: '/olist', component: '@/pages/olist/index' },
        { path: '/user', component: '@/pages/user/index' },
        { path: '/design', component: '@/pages/design/index' },
      ],
    },
  ],
  fastRefresh: {},
});
