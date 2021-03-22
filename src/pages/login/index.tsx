import React from 'react';
import styles from './index.less';
import { connect, Redirect } from 'umi';
import { ConnectState, ConnectProps, UserModelState } from '@/models/connect';

interface LoginProps extends ConnectProps {
  user: UserModelState;
}

const Login: React.FC<LoginProps> = ({ user, location }) => {
  const { userId } = user.currentUser;
  console.log('userid', userId);

  const isLogin = !!userId;
  console.log('isLogin', isLogin);

  if (isLogin) {
    const { from = '/' } = location.state || {};
    return <Redirect to={from} />;
  }
  return (
    <div>
      <h1 className={styles.title}>Page login/index</h1>
    </div>
  );
};

export default connect(({ user }: ConnectState) => ({ user }))(Login);
