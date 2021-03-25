import React, { useEffect, useState, useContext } from 'react';
import { Button, message } from 'antd';
import Graphin, { IG6GraphEvent, GraphinContext } from '@antv/graphin';
import { INode, NodeConfig } from '@antv/g6';
import { ContextMenu } from '@antv/graphin-components';
import { TagFilled, DeleteFilled, ExpandAltOutlined } from '@ant-design/icons';
import styles from './index.less';

// 测试部分
const nodeListTest = {
  nodes: [
    {
      id: 'node0',
      x: 100,
      y: 200,
    },
    {
      id: 'node1',
      x: 300,
      y: 200,
    },
    {
      id: 'node2',
      x: 500,
      y: 500,
    },
  ],
  // 边集
  edges: [
    // 表示一条从 node1 节点连接到 node2 节点的边
    {
      source: 'node0',
      target: 'node1',
    },
  ],
};

// 交互式事件
const SampleBehavior = () => {
  const { graph, apis } = useContext(GraphinContext);
  useEffect(() => {
    // 初始化聚焦到`node-1`
    apis.focusNodeById('node-1');
    // 点击事件
    const handleClick = (evt: IG6GraphEvent) => {
      console.log('evt', evt);
      const node = evt.item as INode;
      const model = node.getModel() as NodeConfig;
      message.info(model.id);
      apis.focusNodeById(model.id);
    };
    // 每次点击聚焦到点击节点上
    graph.on('node:click', handleClick);
    return () => {
      graph.off('node:click', handleClick);
    };
  }, []);
  return null;
};

// 布局设定
const layout = {
  type: 'graphin-force',
};
// 右键菜单
const { Menu } = ContextMenu;
const options = [
  {
    key: 'tag',
    icon: <TagFilled />,
    name: '打标',
  },
  {
    key: 'delete',
    icon: <DeleteFilled />,
    name: '删除',
  },
  {
    key: 'expand',
    icon: <ExpandAltOutlined />,
    name: '扩散',
  },
];

// 画布右键菜单
const CanvasMenu = () => {
  const { graph, contextmenu } = React.useContext(GraphinContext);
  const context = contextmenu.canvas;
  const handleDownload = () => {
    graph.downloadFullImage('canvas-contextmenu');
    context.handleClose();
  };
  const handleClear = () => {
    message.info(`清除画布成功`);
    context.handleClose();
  };
  const handleStopLayout = () => {
    message.info(`停止布局成功`);
    context.handleClose();
  };
  return (
    <Menu bindType="canvas">
      <Menu.Item onClick={handleClear}>清除画布</Menu.Item>
      <Menu.Item onClick={handleStopLayout}>停止布局</Menu.Item>
      <Menu.Item onClick={handleDownload}>下载画布</Menu.Item>
    </Menu>
  );
};
export default function IndexPage() {
  const [nodeList, setNodeList] = useState(nodeListTest);
  const handleChange = (menuItem:any, menuData:any) => {
    message.info(`元素：${menuData.id}，动作：${menuItem.name}`);
  };
  const graphinRef: any = React.createRef();
  const { graph, contextmenu } = React.useContext(GraphinContext);
  useEffect(() => {
    const { graph, apis } = graphinRef.current;
  });
  return (
    <div id="graph-container">
      <Graphin data={nodeList} layout={layout} ref={graphinRef} checked={false}>
        <ContextMenu style={{ width: '80px' }}>
          <Menu options={options} onChange={handleChange} bindType="node" />
        </ContextMenu>
        <ContextMenu style={{ width: '80px' }} bindType="canvas">
          <CanvasMenu />
        </ContextMenu>
        <SampleBehavior />
      </Graphin>
      <div>
        <Button
          type="primary"
          onClick={() => {
            nodeList.nodes.push({
              id: 'node' + nodeList.nodes.length,
              x: Math.random() * 400,
              y: Math.random() * 200,
            });
            graphinRef.current.graph.addItem('node', nodeList.nodes.lastItem);
          }}
        >
          添加数据
        </Button>
        <Button
          type="primary"
          onClick={() => {
            nodeList.edges.push({
              source: nodeList.nodes.lastItem.id,
              target: 'node0',
            });
            console.log(nodeList.edges);
            graphinRef.current.graph.addItem('edge', nodeList.edges.lastItem);
          }}
        >
          添加边
        </Button>
        <Button
          type="primary"
          onClick={() => {
            console.log(nodeList.nodes);
          }}
        >
          查看数据信息
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setNodeList({ nodes: [], edges: [] });
          }}
        >
          清除数据
        </Button>
      </div>
    </div>
  );
}
