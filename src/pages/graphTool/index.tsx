import React, { useEffect, useState, useContext } from 'react';
import { Drawer, message } from 'antd';
import Graphin, { IG6GraphEvent, GraphinContext, Utils } from '@antv/graphin';
import { INode, NodeConfig } from '@antv/g6';
import { ContextMenu, Toolbar } from '@antv/graphin-components';
import { NodeMenu } from '@/pages/graphTool/components/NodeMenu';
import DrawerGraphTool from '@/pages/graphTool/components/Drawer'; //元素属性抽屉
import './index.less';
import '@antv/graphin/dist/index.css'; // Graphin CSS
import '@antv/graphin-components/dist/index.css'; // Graphin 组件 CSS
import G6 from '@antv/g6';

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
// 布局设定
const layout = {
  type: 'graphin-force',
};
// 右键菜单
const { Menu } = ContextMenu;

// 小地图
const Minimap:any = new G6.Minimap({
  size: [100, 100],
  className: 'minimap',
  type: 'delegate',
});

const MOCK_DATA = Utils.mock(10).circle().graphin();

// 交互式事件
const SampleBehavior = (props: any) => {
  const { graph, apis } = useContext(GraphinContext);
  useEffect(() => {
    // 初始化聚焦到`node-1`
    // 点击事件
    const handleClick = (evt: IG6GraphEvent) => {
      const node = evt.item as INode;
      const model = node.getModel() as NodeConfig;
      props.onClickElement(model)
      // apis.focusNodeById(model.id);
    };
    // 每次点击聚焦到点击节点上
    graph.on('node:click', handleClick);
    return () => {
      graph.off('node:click', handleClick);
    };
  }, []);
  return null;
};

export default function GraphTool() {
  const [nodeList, setNodeList] = useState(MOCK_DATA);
  const graphinRef: any = React.createRef();
  const [visibleDrawer, setVisibleDrawer] = useState(false)
  const [contentDrawer, setContentDrawer] = useState({})
  const onCloseDrawer = () => {
    setVisibleDrawer(false)
  }

  // 画布右键菜单
  const CanvasMenu = () => {
    const { graph, contextmenu } = React.useContext(GraphinContext);
    const context = contextmenu.canvas;
    const handleDownload = () => {
      graph.downloadFullImage('canvas-contextmenu');
      context.handleClose();
    };
    const handleClear = () => {
      setNodeList({ nodes: [], edges: [] });
      message.info(`清除画布成功`);
      context.handleClose();
    };
    const handleStopLayout = () => {
      setNodeList(MOCK_DATA);
      context.handleClose();
    };
    const addNode = (evt: Event) => {
      console.log('evt', contextmenu);

      nodeList.nodes.push({
        id: 'node' + nodeList.nodes.length,
        x: context.x,
        y: context.y,
      });
      graphinRef.current.graph.addItem('node', nodeList.nodes.lastItem);
    };
    return (
      <Menu bindType="canvas">
        <Menu.Item onClick={addNode}>添加节点</Menu.Item>
        <Menu.Item onClick={handleClear}>清除画布</Menu.Item>
        <Menu.Item onClick={handleStopLayout}>初始化数据</Menu.Item>
        <Menu.Item onClick={handleDownload}>下载画布</Menu.Item>
      </Menu>
    );
  };
  const onClickElement = (element: any) => {
    setVisibleDrawer(true)
    setContentDrawer(element)
  }
  return (
    <div id="graph-container">
      <Graphin data={nodeList} layout={{ name: 'concentric' }} ref={graphinRef}>
        <Toolbar />
        <ContextMenu style={{ width: '80px' }} bindType="node">
          <NodeMenu nodeList={nodeList} graphinRef={graphinRef} />
        </ContextMenu>
        <ContextMenu style={{ width: '180px' }} bindType="canvas">
          <CanvasMenu />
        </ContextMenu>
        <SampleBehavior onClickElement={onClickElement} />
      </Graphin>
      <DrawerGraphTool content={contentDrawer} onCloseDrawer={onCloseDrawer} visibleDrawer={visibleDrawer} />
    </div>
  );
}
