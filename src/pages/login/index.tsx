import React from 'react';
import styles from './index.less';
import { connect, Redirect, Dispatch } from 'umi';
import { ConnectState, ConnectProps, UserModelState } from '@/models/connect';
// 组件引入
import { message } from 'antd';
import ProForm, { ProFormText, ProFormCaptcha } from '@ant-design/pro-form';
import { MobileOutlined, MailOutlined } from '@ant-design/icons';

interface LoginProps extends ConnectProps {
  user: UserModelState;
  dispatch: Dispatch;
}

// 延迟时间
const waitTime = (time: number = 100) => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(true);
  //   }, time);
  // });
};

const Login: React.FC<LoginProps> = ({ user, location, dispatch }) => {
  // 登录校验

  const { userId } = user.currentUser;
  console.log('debugger:user', user);

  const isLogin = !!userId;
  if (isLogin) {
    const { from = '/' } = location.state || {};
    return <Redirect to={from} />;
  } else {
    message.success('登陆失败');
  }
  return (
    <div
      style={{
        width: 330,
        margin: 'auto',
      }}
    >
      <ProForm
        onFinish={async () => {
          // await waitTime(2000);
          if (dispatch) {
            dispatch({ type: 'user/fetchCurrent' });
          }
          const { userId } = user.currentUser;
          const isLogin = !!userId;
          if (isLogin) {
            const { from = '/' } = location.state || {};
            message.success('登陆成功');
            return <Redirect to={from} />;
          } else {
            message.success('登陆失败');
          }
          console.log('debugger:user', user);
        }}
        submitter={{
          searchConfig: { submitText: '登录' },
          render: (_, dom: any) => dom.pop(),
          submitButtonProps: {
            size: 'large',
            style: { width: '100%' },
          },
        }}
      >
        <h1
          style={{
            textAlign: 'center',
          }}
        >
          <img
            style={{
              height: '44px',
              marginRight: 16,
            }}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          />
          Ant Design
        </h1>
        <div
          style={{
            marginTop: 12,
            textAlign: 'center',
            marginBottom: 40,
          }}
        >
          Ant Design 是西湖区最具影响力的 Web 设计规范
        </div>
        <ProFormText
          fieldProps={{
            size: 'large',
            prefix: <MobileOutlined />,
          }}
          name="phone"
          placeholder="请输入手机号"
          rules={[
            {
              required: true,
              message: '请输入手机号!',
            },
            {
              pattern: /^1\d{10}$/,
              message: '不合法的手机号格式!',
            },
          ]}
        />
        <ProFormCaptcha
          fieldProps={{
            size: 'large',
            prefix: <MailOutlined />,
          }}
          captchaProps={{
            size: 'large',
          }}
          phoneName="phone"
          name="captcha"
          rules={[
            {
              required: true,
              message: '请输入验证码',
            },
          ]}
          placeholder="请输入验证码"
          onGetCaptcha={async (phone) => {
            // await waitTime(1000);
            message.success(`手机号 ${phone} 验证码发送成功!`);
          }}
        />
      </ProForm>
    </div>
  );
};

export default connect(({ user }: ConnectState) => ({ user }))(Login);
