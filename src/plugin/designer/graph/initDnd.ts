import { getContext } from 'graphix-engine';
import { Edge, Graph, Node, Point } from '@antv/x6';
import { Dnd } from '@antv/x6-plugin-dnd';
import { cloneDeep } from 'lodash';
import { EdgeType } from 'src/component/types';
import { Graph as Graphlib, json } from 'graphlib';

/**
 * 组装 graphlib 图结构数据
 * @returns
 */
export function getGrahlib() {
  const nodes = getContext()
    .getNodes()
    .filter((n) => n.getType() !== EdgeType.Edge);
  const edges = getContext()
    .getNodes()
    .filter((e) => e.getType() === EdgeType.Edge);

  const g = new Graphlib({ multigraph: true });
  nodes.forEach((n) => {
    g.setNode(n.getId());
  });
  edges.forEach((e) => g.setEdge(e.getPropData('source'), e.getPropData('target'), null, e.getId()));
  return g;
}

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
      edges = edges.filter((edge) => {
        const view = graph.findViewByCell(edge);
        // @ts-ignore
        return boxLines.some((line) => view.path.intersectsWithLine(line)) || bbox.containsPoint(view.path.end);
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
    validateNode: (draggingNode: Node) => {
      const nodeId = draggingNode.data.id;
      if (intersectedEdge) {
        const context = getContext();
        const type = draggingNode.data.type;
        const target = intersectedEdge.getTargetCellId();
        const source = intersectedEdge.getSourceCellId();
        const g = getGrahlib();
        if (nodeId) {
          // 节点直接移动插入
          const inEdges = g.inEdges(nodeId) as any;
          const outEdges = g.outEdges(nodeId) as any;
          if ([...inEdges, ...outEdges].find((e) => e.name === intersectedEdge?.id)) {
            clear();
            return false;
          }
          const { v, w, name: id } = outEdges[0];
          const defaultOutEdge = context.getNode(id);
          const nextNodeId = w;
          inEdges.forEach((inEdge: any) => {
            const { v, w, name: id } = inEdge;
            context.getNode(id)?.setPropData('target', nextNodeId);
          });
          defaultOutEdge?.setPropData('target', target);
          context.getNode(intersectedEdge.id)?.setPropData('target', nodeId);
        } else {
          // 左侧拖入节点插入
          const node = context.addNode({
            type,
          });
          context.addNode({
            type: EdgeType.Edge,
            props: {
              source: node.getId(),
              target: target,
            },
          });
          const edge = context.getNode(intersectedEdge.id);
          edge?.setPropData('target', node.getId());
        }
      }
      clear();
      return false;
    },
  });
  return dnd;
}
