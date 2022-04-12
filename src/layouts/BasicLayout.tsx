import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { history, Dispatch, connect, Redirect } from 'umi';
import { ConnectState, UserModelState, ConnectProps } from '@/models/connect.d';
import './layout.less';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const TopNavMenu: {
  name: string;
  link: string;
  disabled: boolean;
}[] = [
  {
    name: '首页',
    link: 'home',
    disabled: false,
  },
  {
    name: '工作台',
    link: 'workbench',
    disabled: false,
  },
  {
    name: '流程图',
    link: 'flow',
    disabled: false,
  },
  {
    name: '拓扑图',
    link: 'koni',
    disabled: false,
  },
  {
    name: '脑图',
    link: 'mind',
    disabled: false,
  },
];
// 对路由进行处理，处理成汉字
const findPathName = (link: string) => {
  if (link) {
    let el: any = TopNavMenu.find((element) => element.link === link);
    return el.name;
  } else {
  }
};

interface BasicLayoutProps extends ConnectProps {
  dispatch: Dispatch;
  user: UserModelState;
}
const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const { children, location, user, dispatch } = props;
  const pageIndex = location.pathname.split('/')[1];
  console.log('debugger:props', props);
  const [title, setTile] = useState(findPathName(pageIndex));
  const [index, setIndex] = useState(pageIndex);
  useEffect(() => {
    // 获取用户信息
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);
  const { userId } = user.currentUser;
  // 判断是否已登陆
  // const isLogin = !!userId;
  const isLogin = true;

  if (!isLogin) {
    return (
      <Redirect
        to={{ pathname: '/login', state: { from: location.pathname } }}
      />
    );
  }
  // 导航栏路由跳转
  const jump = ({ key }: { key: string }) => {
    setTile(findPathName(key));
    console.log();
    history.push(key);
  };
  return (
    <div className="basic-layout">
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[pageIndex]}
            defaultOpenKeys={[pageIndex]}
            onClick={({  key, keyPath, domEvent }) => {
              setTile('啥也');
              console.log('key', key);
              console.log('keyPath', keyPath);
              console.log('domEvent', domEvent);
              setTile(findPathName(key));
              history.push(key);
            }}
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
                padding: 5,
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
export default connect(({ user }) => ({ user }))(BasicLayout);
