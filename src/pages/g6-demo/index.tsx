import React, { useEffect, useState } from 'react';
import { data } from './data';
import G6 from '@antv/g6';
import { NodeTooltips, EdgeToolTips, NodeContextMenu } from './component'
import './registerShape';
import './index.less'

// 防抖
function preventShake(todo, time = 500) {
  let timeout: any
  clearTimeout(timeout)
  timeout = setTimeout(
    todo, time
  )
  // return function () {
  //   clearTimeout(timeout)
  //   timeout = setTimeout(
  //     todo, time
  //   )
  // }
}
const toolbar = new G6.ToolBar({
  container:'#g6-demo-toolbar'
})
export default function () {
  const ref = React.useRef(null)
  
  let graph :any = null
  let mouseenter = false
  // 边tooltip坐标
  const [showEdgeTooltip, setShowEdgeTooltip] = useState(false)
  const [edgeTooltipX, setEdgeTooltipX] = useState(0)
  const [edgeTooltipY, setEdgeTooltipY] = useState(0)

  // 节点tooltip坐标
  const [showNodeTooltip, setShowNodeTooltip] = useState(false)
  const [nodeTooltipX, setNodeToolTipX] = useState(0)
  const [nodeTooltipY, setNodeToolTipY] = useState(0)

  // 节点ContextMenu坐标
  const [showNodeContextMenu, setShowNodeContextMenu] = useState(false)
  const [nodeContextMenuX, setNodeContextMenuX] = useState(0)
  const [nodeContextMenuY, setNodeContextMenuY] = useState(0)
  const bindEvents = () => {
    // 监听edge上面mouse事件
    graph.on('edge:mouseenter', evt => {
      const { item, target } = evt
      const type = target.get('type')
      if (type !== 'text') {
        return
      }
      const model = item.getModel()
      const { endPoint } = model
      // y=endPoint.y - height / 2，在同一水平线上，x值=endPoint.x - width - 10

      const y = endPoint.y - 35
      const x = endPoint.x - 150 - 10
      const point = graph.getCanvasByPoint(x, y)
      setEdgeTooltipX(point.x)
      setEdgeTooltipY(point.y)
      setShowEdgeTooltip(true)
    })

    graph.on('edge:mouseleave', () => {
      setShowEdgeTooltip(false)
    })

    // 监听node上面mouse事件
    graph.on('node:mouseenter', evt => {
      const { item } = evt
      const model = item.getModel()
      const { x, y } = model
      const point = graph.getCanvasByPoint(x, y)
      setNodeToolTipX(point.x - 75)
      setNodeToolTipY(point.y + 15)
      // setShowNodeTooltip(true)
      console.log("debugger:evt",evt);
      
    })

    // 节点上面触发mouseleave事件后隐藏tooltip和ContextMenu
    graph.on('node:mouseleave',
      () => {
        setShowNodeTooltip(false)
        setShowNodeContextMenu(false)
      }
    )
    graph.on('canvas:mouseenter', () => {
      setShowNodeTooltip(false)
      setShowNodeContextMenu(false)
    })
    // 监听节点上面右键菜单事件
    graph.on('node:contextmenu', evt => {
      // setShowNodeTooltip(false)
      // setShowNodeContextMenu(false)
      evt.preventDefault();
      const { item } = evt
      const model = item.getModel()
      const { x, y } = model
      const point = graph.getCanvasByPoint(x, y)
      setNodeContextMenuX(point.x)
      setNodeContextMenuY(point.y)
      setShowNodeContextMenu(true)
    })
  }

  useEffect(() => {
    if (!graph) {
      const miniMap = new G6.Minimap()
      graph = new G6.Graph({
        container: ref.current,
        width: 1450,
        height: 500,
        modes: {
          default: ['drag-canvas', 'drag-node','zoom-canvas']
        },
        defaultNode: {
          shape: 'node',
          // 节点文本样式
          labelCfg: {
            style: {
              fill: '#000000A6',
              fontSize: 15
            }
          },
          size: 60,
          // 节点默认样式
          style: {
            stroke: '#72CC4A',
            width: 100
          }
        },
        defaultEdge: {
          shape: 'polyline'
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
        plugins: [miniMap]
      })
    }

    graph.data(data)

    graph.render()

    const edges = graph.getEdges()
    edges.forEach(edge => {
      const line = edge.getKeyShape()
      const stroke = line.attr('stroke')
      const targetNode = edge.getTarget()
      targetNode.update({
        style: { stroke }
      })
    })
    graph.paint()

    bindEvents()
  }, [])

  return (
    <div id='g6-demo-container' ref={ref}>
      <div id = "g6-demo-toolbar" ></div>
      {showEdgeTooltip && <EdgeToolTips x={edgeTooltipX} y={edgeTooltipY} />}
      {showNodeTooltip && <NodeTooltips x={nodeTooltipX} y={nodeTooltipY} />}
      {showNodeContextMenu && <NodeContextMenu x={nodeContextMenuX} y={nodeContextMenuY} />}
    </div>
  );
}
