import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { history, Dispatch, connect, Redirect } from 'umi';
import { ConnectState, UserModelState, ConnectProps } from '@/models/connect';
// import './layout.less';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const TopNavMenu = [
  {
    name: '首页',
    link: 'home',
    disabled: false,
  },
  {
    name: '购物车',
    link: 'cart',
    disabled: false,
  },
  {
    name: '商品列表',
    link: 'olist',
    disabled: false,
  },
  {
    name: '用户',
    link: 'user',
    disabled: false,
  },
  {
    name: '关联分析',
    link: 'design',
    disabled: false,
  },
];
// 对路由进行处理，处理成汉字
const findPathName = (link: string) => {
  console.log('link', link);
  let newTitle = TopNavMenu.find((element) => element.link === link);
  if (newTitle) {
    return newTitle.name;
  } else if (link === 'login') {
    return '登录';
  }
};

interface BasicLayoutProps extends ConnectProps {
  dispatch: Dispatch;
  user: UserModelState;
}
const BasicLayout: React.FC<BasicLayoutProps> = ({
  children,
  location,
  user,
  dispatch,
}) => {
  console.log(
    "location.pathname.split('/')[1]",
    location.pathname.split('/')[1],
  );
  const pageIndex =
    location.pathname !== '/' ? location.pathname.split('/')[1] : 'home';
  const [title, setTile] = useState(findPathName(pageIndex));
  const [index, setIndex] = useState(pageIndex);
  console.log('pageIndex', location.pathname);

  useEffect(() => {
    // 获取用户信息
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);
  console.log('user.currentUser', user.currentUser);
  const { userId } = user.currentUser;
  console.log('userid', userId);
  const isLogin = !!userId;
  console.log('isLogin', isLogin);

  console.log('currentUser', user.currentUser);
  if (!isLogin) {
    return (
      <Redirect
        to={{ pathname: '/login', state: { from: location.pathname } }}
      />
    );
  }
  console.log('pageIndex', pageIndex);
  // 导航栏路由跳转
  const jump = ({
    item,
    key,
    keyPath,
    domEvent,
  }: {
    item: object;
    key: string;
    keyPath: any;
    domEvent: any;
  }) => {
    setTile('啥也');
    // console.log('item', item);
    // console.log('key', key);
    // console.log('keyPath', keyPath);
    // console.log('domEvent', domEvent);
    setTile(findPathName(key));
    history.push(key);
  };
  return (
    <div>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[pageIndex]}
            defaultOpenKeys={[pageIndex]}
            onClick={jump}
          >
            {TopNavMenu.map(({ name, link, disabled }) => {
              return <Menu.Item key={link}>{name}</Menu.Item>;
            })}
          </Menu>
        </Header>
        <Layout>
          <Sider theme="dark" width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                <Menu.Item key="1">option1</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                icon={<NotificationOutlined />}
                title="subnav 3"
              >
                <Menu.Item key="9">option9</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>React</Breadcrumb.Item>
              <Breadcrumb.Item>{title}</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: '80vh',
              }}
            >
              <article>{children}</article>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};
export default connect(({ user }: ConnectState) => ({ user }))(BasicLayout);
