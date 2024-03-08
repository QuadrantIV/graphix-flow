import { Graph, Edge } from '@antv/x6';
import React, { memo, useEffect, useRef } from 'react';
import { PropsData, prototypeRegistry } from 'graphix-engine';
import { isEqual } from 'lodash';

interface Props {
  graph: Graph;
  id: string;
  type: string;
  nodeProps: PropsData;
  onMountEdge: (edge: Edge) => void;
  onUnMountEdge: (edge: Edge) => void;
}

export default class EdgeComponent extends React.PureComponent<Props> {
  private x6Edge: Edge;

  componentDidMount() {
    const { id, type, graph } = this.props;
    const view = prototypeRegistry.getPrototypeByType(type)?.getView();
    // 创建 x6 edge
    this.x6Edge = graph.createEdge({
      id,
      ...view
    });
    // 收集 edge 统一添加到画布
    this.props.onMountEdge(this.x6Edge);

    const { source, target } = this.props.nodeProps;
    this.x6Edge.setSource({ cell: source });
    this.x6Edge.setTarget({ cell: target });
  }

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<{}>, nextContext: any): boolean {
    return !isEqual(nextProps.nodeProps, this.props.nodeProps);
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void {
    const { source, target } = this.props.nodeProps;
    this.x6Edge.setSource({ cell: source });
    this.x6Edge.setTarget({ cell: target });
  }

  componentWillUnmount() {
    this.props.onUnMountEdge(this.x6Edge);
  }

  render() {
    return null;
  }
}

