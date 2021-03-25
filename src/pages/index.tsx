import React, { useEffect, useState, useContext } from 'react';
import { Button, message } from 'antd';
import Graphin, { IG6GraphEvent, GraphinContext } from '@antv/graphin';
import { INode, NodeConfig } from '@antv/g6';
import { ContextMenu } from '@antv/graphin-components';
import { TagFilled, DeleteFilled, ExpandAltOutlined } from '@ant-design/icons';
import './index.less';

const styles = {
  root: {
    background: '#fafafa',
    display: 'flex',
    position: 'absolute',
    bottom: '0px',
    left: '68px',
    right: '28px',
  },
  itemContainer: {
    height: '100px',
    flex: 1,
    background: 'rgb(250, 250, 250)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
  itemBar: {
    height: '100%',
    margin: '0px 42%',
    background: '#ddd',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    cursor: 'pointer',
  },
  itemTime: {
    position: 'relative',
    textAlign: 'center',
    borderTop: '1px solid #ddd',
  },
};

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

// 时序菜单

const TimeBar = (props: any) => {
  const {
    data = [
      { time: '2020-3-21', nodeCount: 10 },
      { time: '2020-3-22', nodeCount: 14 },
      { time: '2020-3-23', nodeCount: 20 },
      { time: '2020-3-24', nodeCount: 30 },
      { time: '2020-3-25', nodeCount: 30 },
      { time: '2020-3-26', nodeCount: 30 },
      { time: '2020-3-27', nodeCount: 30 },
      { time: '2020-3-28', nodeCount: 30 },
      { time: '2020-3-29', nodeCount: 30 },
    ],
    onChange = () => {},
    style = {},
  } = props;
  const maxHeight = data.reduce((acc, curr) => {
    return Math.max(acc, curr.nodeCount);
  }, 0);

  const handleClick = (timeStamp) => {
    onChange(timeStamp);
  };

  return (
    <div>
      <ul style={{ ...styles.root, style }}>
        {data.map((c) => {
          return (
            <li
              key={c.time}
              style={styles.itemContainer}
              onClick={() => {
                handleClick(c);
              }}
            >
              <div style={styles.itemBar}>
                <div
                  style={{
                    height: `${(c.nodeCount / maxHeight) * 100}%`,
                    background: '#873bf4',
                  }}
                ></div>
              </div>
              <div style={styles.itemTime}>{c.time}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// 交互式事件
const SampleBehavior = () => {
  const { graph, apis } = useContext(GraphinContext);
  useEffect(() => {
    // 初始化聚焦到`node-1`
    // 点击事件
    const handleClick = (evt: IG6GraphEvent) => {
      console.log('evt', evt);
      const node = evt.item as INode;
      const model = node.getModel() as NodeConfig;
      message.info(model.id);
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

// 布局设定
const layout = {
  type: 'graphin-force',
};
// 右键菜单
const { Menu } = ContextMenu;

export default function IndexPage() {
  const [nodeList, setNodeList] = useState(nodeListTest);
  const newEdge = { source: '', target: '' };
  const graphinRef: any = React.createRef();
  useEffect(() => {
    const { graph, apis } = graphinRef.current;
  });
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
      setNodeList(nodeListTest);
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
  // 节点菜单
  const NodeMenu = () => {
    const { graph, contextmenu } = React.useContext(GraphinContext);
    const context = contextmenu.canvas;
    const targetNode = contextmenu.node;
    const handleDownload = () => {
      graph.downloadFullImage('canvas-contextmenu');
      context.handleClose();
    };
    const addNewEdgeSource = () => {
      newEdge.source = targetNode.item._cfg.id;
      context.handleClose();
    };
    const addNewEdgeTarget = () => {
      newEdge.target = targetNode.item._cfg.id;
      nodeList.edges.push({ source: newEdge.source, target: newEdge.target });
      graphinRef.current.graph.addItem('edge', nodeList.edges.lastItem);
      message.info(`添加关系成功`);
      console.log('nodeList.edges', nodeList.edges);
      context.handleClose();
    };
    const handleStopLayout = () => {
      context.handleClose();
    };
    return (
      <Menu bindType="canvas">
        <Menu.Item onClick={addNewEdgeSource}>添加关系(设为开始节点)</Menu.Item>
        <Menu.Item onClick={addNewEdgeTarget}>添加关系(设为结束节点)</Menu.Item>
        <Menu.Item onClick={handleStopLayout}>添加属性</Menu.Item>
        <Menu.Item >删除节点</Menu.Item>
      </Menu>
    );
  };

  return (
    <div id="graph-container">
      <Graphin data={nodeList} layout={layout} ref={graphinRef} checked={false}>
        <ContextMenu style={{ width: '80px' }} bindType="node">
          <NodeMenu />
        </ContextMenu>
        <ContextMenu style={{ width: '180px' }} bindType="canvas">
          <CanvasMenu />
        </ContextMenu>
        <SampleBehavior />
        <TimeBar />
      </Graphin>
      <div>
        <Button type="primary">添加数据</Button>
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
      </div>
    </div>
  );
}
