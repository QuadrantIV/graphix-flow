import { getContext } from 'graphix-engine';
import { Edge, Graph, Node, Point } from "@antv/x6";
import { Dnd } from "@antv/x6-plugin-dnd";
import { cloneDeep } from 'lodash';
import { EdgeType } from 'src/component/types';

// 扩展 onDragging 事件
class ExtDnd extends Dnd {
  onDragging(evt: any) {
    super.onDragging(evt);
    // @ts-ignore
    this.options.onDragging(this.draggingNode, evt);
  }
}

export let dnd: Dnd;
export default function initDnd(graph: Graph) {
  let tempAttr: any = undefined;
  let intersectedEdge: Edge | undefined = undefined;
  let dragHintH: HTMLElement | undefined = undefined;

  const clear = () => {
    if (intersectedEdge) {
      intersectedEdge.attrs = tempAttr;
      tempAttr = undefined;
      intersectedEdge = undefined;
    }
    dragHintH?.parentNode?.removeChild(dragHintH);
  };

  dnd = new ExtDnd({
    target: graph,
    // @ts-ignore
    onDragging: (draggingNode: Node, evt: any) => {
      const bbox = draggingNode.getBBox();
      const boxLines = [bbox.leftLine, bbox.rightLine, bbox.topLine, bbox.bottomLine];
      let edges = graph.getEdges();
      edges = edges.filter(edge => {
        const view = graph.findViewByCell(edge);
        // @ts-ignore
        return boxLines.some(line => view.path.intersectsWithLine(line)) || bbox.containsPoint(view.path.end);
      });
      if (edges.length) {
        clear();
        const edge = edges[0];
        tempAttr = cloneDeep(edge.attrs);
        intersectedEdge = edge;
        edge.attr('line/stroke', 'rgb(92, 144, 255)');
        edge.attr('line/strokeWidth', 2);
  
        const view = graph.findViewByCell(edge);
        // @ts-ignore
        const point = view.path.pointAt(0.5);
        const position = graph.localToClient(point);
        dragHintH = document.createElement('div');
        dragHintH.classList.add('drag-hint-h');
        document.body.appendChild(dragHintH);
        dragHintH.style.left = position.x - 120 + 'px';
        dragHintH.style.top = position.y + 'px';
      } else {
        clear();
      }
    },
    validateNode: (draggingNode: Node, options: any) => {
      const nodeId = draggingNode.data.id;
      if (intersectedEdge) {
        const context = getContext();
        // 插入节点 type
        const type = draggingNode.data.type;
        // 相交线 target
        const targetId = intersectedEdge.getTargetCellId();
        // 相交线 source
        const source = intersectedEdge.getSourceCellId();
        if (nodeId) {
          // 画布节点移动
          // verticalNodeMove(node, intersectedEdge);
        } else {
          // 左侧拖入进来的节点
          const node = context.addNode({
            type,
          });

          context.addNode({
            type: EdgeType.Edge,
            props: {
              source: node.getId(),
              target: targetId,
            },
          });
      
          const edge = context.getNode(intersectedEdge.id);
          edge?.setPropData('target', node.getId());
        }
      }
      clear();
      return false;
    }
  });
  return dnd;
}