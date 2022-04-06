import Graphin, { IG6GraphEvent, GraphinContext } from '@antv/graphin';
import React, { useEffect, useState, useContext } from 'react';
import { ContextMenu } from '@antv/graphin-components';
import { Button, message } from 'antd';
const { Menu } = ContextMenu;

// 节点菜单
export const NodeMenu = (props: any) => {
  const { graph, contextmenu } = React.useContext(GraphinContext);
  const context = contextmenu.canvas;
  const targetNode = contextmenu.node;
  const { nodeList, graphinRef } = props;
  const { lastItem } = nodeList.edges;

  const targetEdge = { source: lastItem.source, target: '' };
  const addtargetEdgeSource = () => {
    targetEdge.source = targetNode.item._cfg.id;
    let newEdge = { source: targetEdge.source, target: '' };
    nodeList.edges.pop();
    nodeList.edges.push(newEdge);
    context.handleClose();
  };
  const addtargetEdgeTarget = () => {
    targetEdge.target = targetNode.item._cfg.id;
    graphinRef.current.graph.addItem('edge', targetEdge);
    message.info(`添加关系成功`);
    context.handleClose();
  };
  const nodePropsHandle = () => {};
  return (
    <Menu bindType="canvas">
      <Menu.Item onClick={addtargetEdgeSource}>
        添加关系(设为开始节点)
      </Menu.Item>
      <Menu.Item onClick={addtargetEdgeTarget}>
        添加关系(设为结束节点)
      </Menu.Item>
      <Menu.Item onClick={nodePropsHandle}>添加属性</Menu.Item>
      <Menu.Item>删除节点</Menu.Item>
    </Menu>
  );
};
