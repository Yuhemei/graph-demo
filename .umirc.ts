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
        { path: '/', redirect: '/graphin' },
        { path: '/graphin', component: '@/pages/index' },
        { path: '/G6Demo', component: '@/pages/g6-demo/index' },
        { path: '/flow', component: '@/pages/editor/flow/index' },
        { path: '/koni', component: '@/pages/editor/koni/index' },
        { path: '/mind', component: '@/pages/editor/mind/index' },
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
  mfsu: {},
  exportStatic:{}
});
