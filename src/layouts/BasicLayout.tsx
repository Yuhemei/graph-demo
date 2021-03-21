import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { history, Location, Dispatch, connect } from 'umi';
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

const findPathName = (link: string) => {
  console.log('link', link);
  let newTitle = TopNavMenu.find((element) => element.link === link).name;
  return newTitle;
};

interface BasicLayoutProps {
  pathname: string;
  location: Location;
  dispatch: Dispatch;
  user: any;
}
const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const { children, location, user, dispatch } = props;
  const pageIndex = location.pathname.split('/')[1];
  console.log('user', props);
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
            onClick={({ item, key, keyPath, domEvent }) => {
              // setTile("啥也")
              // console.log("item",item);
              // console.log("key",key);
              // console.log("keyPath",keyPath)
              // console.log("domEvent",domEvent)

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
export default connect(({ user }) => ({user}))(BasicLayout);
