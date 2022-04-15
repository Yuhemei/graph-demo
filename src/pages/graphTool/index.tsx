import React, { useEffect, useState, useContext } from 'react';
import { message, } from 'antd';
import GGEditor, { Koni } from 'gg-editor';
import type { TooltipValue } from '@antv/graphin';
import Graphin, { IG6GraphEvent, GraphinContext, Utils, Components } from '@antv/graphin';
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
      // anchorPoints: [
      //   [0, 1],
      //   [0.5, 1],
      // ],
    },
    {
      id: 'node1',
      x: 300,
      y: 200,
      // anchorPoints: [
      //   [0.5, 0],
      //   [1, 0.5],
      // ],
    },
    {
      id: 'node2',
      x: 300,
      y: 200,
      // anchorPoints: [
      //   [0.5, 0],
      //   [1, 0.5],
      // ],
      type: 'rect',
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
// hover提示工具
const { Tooltip, SnapLine, MiniMap } = Components;
export type PlacementType = 'top' | 'bottom' | 'right' | 'left';
const styleTextToolTip = {
  background:"#fff",
  width:"200px"
}
// 画布基准线
const optionShapLine = {
  line: {
    stroke: 'lightgreen',
    lineWidth: 0.5,
  },
}

// 小地图
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
      // props.onClickElement(model)
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



export default function GraphTool() {
  const graphinRef: any = React.createRef();
  const toolbarRef: any = React.createRef()
  const [nodeList, setNodeList] = useState(nodeListTest)
  const [visibleDrawer, setVisibleDrawer] = useState(false)
  const [contentDrawer, setContentDrawer] = useState({})

  // 关闭抽屉
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
  // 元素点击弹出属性抽屉
  const onClickElement = (element: any) => {
    setVisibleDrawer(true)
    setContentDrawer(element)
  }
  // canvas工具
  const toolbar = new G6.ToolBar({
    // container: toolbarRef
  });
  const graphOption = {
    // container: graphinRef.current,

    modes: {
      default: ['drag-canvas', 'drag-node', 'zoom-canvas']
    },
    // 节点交互状态配置
    nodeStateStyles: {
      hover: {
        stroke: 'red',
        lineWidth: 3
      }
    },
    edgeStateStyles: {
      hover: {
        stroke: 'blue',
        lineWidth: 3
      }
    },
    layout: {
      type: 'dagre',
      rankdir: 'LR',
      nodesep: 30,
      ranksep: 100
    },
    plugins: [toolbar], // 配置 ToolBar 插件
  }
  return (
    <div id="graph-container">
      <div id="graph-toolbar" style={{height: '20px',position:'relative'} } ref={toolbarRef}></div>
      <Graphin data={nodeList} ref={graphinRef} {...graphOption} >
        <ContextMenu style={{ width: '80px' }} bindType="node">
          <NodeMenu nodeList={nodeList} graphinRef={graphinRef} />
        </ContextMenu>
        <ContextMenu style={{ width: '180px' }} bindType="canvas">
          <CanvasMenu />
        </ContextMenu>
        <SampleBehavior onClickElement={onClickElement} />
        <MiniMap />
        <SnapLine options={optionShapLine} visible />
        <Tooltip bindType="node" placement={'top'} hasArrow={true} style={{...styleTextToolTip}}>
          {(value: TooltipValue) => {
            if (value.model) {
              const { model } = value;
              if (model.id === 'node-6') {
                // node-6 节点不可以Tooltip
                return null;
              }
              return (
                <div>
                  {Object.keys(model).map((key) => {
                    return <li key={key}>{key}:{JSON.stringify(model[key])}</li>
                  })}
                </div>
              );
            }
            return null;
          }}
        </Tooltip>
      </Graphin>
      <DrawerGraphTool content={contentDrawer} onCloseDrawer={onCloseDrawer} visibleDrawer={visibleDrawer} />
    </div >
  );
}
