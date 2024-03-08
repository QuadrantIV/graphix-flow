import { Edge, Node, PointLike } from "@antv/x6";
import dagre from 'dagre';

/**
 * dagre 布局
 * @param nodes
 * @param edges 
 * @param groupId 
 * @returns 
 */
export default function dagreLayout(nodes: Node[], edges: Edge[], groupId: string = '') {
  const g = new dagre.graphlib.Graph();
  g.setGraph({
    ranksep: 50,
    nodesep: 20
  });
  g.setDefaultEdgeLabel(function() { return {}; });

  for (const node of nodes) {
    const { width, height } = node.size();
    g.setNode(node.id, { width, height });
  }
  for (const edge of edges) {
    g.setEdge(edge.getSourceCellId(), edge.getTargetCellId());
  }
  dagre.layout(g);

  nodes.forEach(node => {
    const position = g.node(node.id);
    const { width, height } = node.size();
    let _position = {
      x: position.x - width / 2,
      y: position.y - height / 2,
    };
    node.position(_position.x, _position.y);
  });

  edges.forEach(e => {
    const points = g.edge(e.getSourceCellId(), e.getTargetCellId()).points;
    points.shift();
    points.pop();
    e.setVertices(points);
  });
  return {
    nodes,
    edges,
  };
}