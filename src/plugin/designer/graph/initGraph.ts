import { CommonLineView } from '../../../component/shape';
import { Graph } from '@antv/x6';
import { Snapline } from '@antv/x6-plugin-snapline';
import { getContext } from 'graphix-engine';
import { EdgeType } from '../../../component/types';
import { dnd } from './initDnd';

export let graph: Graph = undefined!;
export default function initGraph(container: HTMLDivElement) {
  const context = getContext();
  graph = new Graph({
    container,
    autoResize: true,
    grid: 1,
    background: {
      color: '#fafafa',
      image: 'https://img.alicdn.com/imgextra/i3/O1CN01LVUi4y1e6WRzwnhIh_!!6000000003822-55-tps-22-22.svg',
      repeat: 'repeat',
      position: '0, 0',
      size: '11px',
    },
    panning: {
      enabled: true,
      eventTypes: ['leftMouseDown', 'mouseWheel'],
    },
    mousewheel: {
      enabled: true,
      modifiers: 'ctrl',
      factor: 1.1,
      maxScale: 1.5,
      minScale: 0.5,
    },
    interacting: false
  });

  graph.on('blank:click', ({ e, x, y}) => {
    context.getSelection().setKeys([]);
  });

  graph.on('cell:click', ({ e, x, y, cell, view }) => {
    context.getSelection().setKeys([cell.id]);
  });

  graph.on('node:mousedown', ({e}) => {
    graph.panning.disablePanning();
  });

  let moveing: boolean = false;
  graph.on('node:mousemove', ({ e, x, y, cell, view }) => {
    if (!moveing) {
      const node = cell.clone();
      node.setData({ id: cell.id });
      // @ts-ignore
      dnd.start(node, e);
    }
    moveing = true;
  });

  graph.on('node:mouseup', ({ e, x, y, cell, view  }) => {
    graph.panning.enablePanning();
    // @ts-ignore
    dnd.onDragEnd(e);
    moveing = false;
  });
  return graph;
}
