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
        { path: '/workbench', component: '@/pages/workbench/index' },
        { path: '/design', component: '@/pages/design/index' },
        {
          path: '/knowledgeManagement',
          component: '@/pages/knowledgeManagement/index',
        },
        {
          path: '/configManagement',
          component: '@/pages/configManagement/index',
        },
      ],
    },
  ],
  fastRefresh: {},
});
