import React, { useEffect } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { history } from 'umi';
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
];

interface BasicLayoutProps {
  location:object;
}
const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const { children ,location } = props;
  console.log(props);
  
  useEffect(() => {}, []);
  return (
    <div>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['home']}
            defaultOpenKeys={['home']}
            onClick={({ key }) => {

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
              <Breadcrumb.Item>{location.pathname}</Breadcrumb.Item>
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
export default BasicLayout;
