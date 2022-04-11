/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';

const codeMessages = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
  401: '用户没有权限（令牌、用户名、密码错误）',
  403: '用户得到授权，但是访问的地址是错误的',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得',
  410: '请求的资源永久删除，且不会再得到的',
  422: '当创建一个对象时，发生一个验证错误',
  500: '服务器发生错误，请检查服务器',
  502: '网管错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
};

// 异常处理程序
export interface response {
  status: number;
}

// 错误处理
interface ErrorInfoStructure {
  success: boolean; // if request is success
  data?: any; // response data
  errorCode?: string; // code for errorType
  errorMessage?: string; // message display to user
  showType?: number; // error display type： 0 silent; 1 message.warn; 2 message.error; 4 notification; 9 page
  traceId?: string; // Convenient for back-end Troubleshooting: unique request ID
  host?: string; // Convenient for backend Troubleshooting: host of current access server
}

// 抛出异常
interface RequestError extends Error {
  data?: any; // 这里是后端返回的原始数据
  info?: ErrorInfoStructure;
}

// 默认错误处理
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessages[response.status] || response.statusText;
    const { status, url } = response;
    console.log({
      messages: `请求错误${status}:${url}`,
      description: errorText,
    });
  } else if (!response) {
    console.error({
      description: '您的网络异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

// 配置request请求时的默认参数
const request = extend({
  errorHandler, //默认错误处理
  credentials: 'include', //默认请求是否带上cookie
  prefix: '/api/v1',
  timeout: 1000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  requestType: 'json',
  getResponse: false
});

// Middleware拦截
request.use(async (ctx, next) => {
  const { req } = ctx;
  const { url, options } = req;
  // enhance request 请求再封装
  if (url.indexOf('/api') !== 0) {
    ctx.req.url = `/api/v1/${url}`;
  }
  ctx.req.options = {
    ...options,
    // foo: 'foo',
  };

  await next();

  const { res } = ctx;
  const { success = false } = res;
  if (!success) {
    console.log('请求失败');
  }
});
request.use(async (ctx, next) => {
  console.log('instanceA1');
  await next();
  console.log('instanceA2');
});
request.use(async (ctx, next) => {
  console.log('instanceB1');
  await next();
  console.log('instanceB2');
});
request.use(
  async (ctx, next) => {
    console.log('globalA1');
    await next();
    console.log('globalA2');
  },
  { global: true }
);
request.use(
  async (ctx, next) => {
    console.log('coreA1');
    await next();
    console.log('coreA2');
  },
  { core: true }
);

export default request;
