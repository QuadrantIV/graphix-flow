import { prototypeRegistry, PropsData } from 'graphix-engine';
import { Graph, Node } from '@antv/x6';
import React, { memo, useEffect, useRef } from 'react';
import { isEqual } from 'lodash';

interface Props {
  graph: Graph;
  id: string;
  type: string;
  nodeProps: PropsData;
  onMountNode: (node: Node) => void;
  onUnMountNode: (node: Node) => void;
}

export default class NodeComponent extends React.PureComponent<Props> {
  private x6Node: Node;

  componentDidMount() {
    const { id, type, graph, onMountNode } = this.props;
    const view = prototypeRegistry.getPrototypeByType(type)?.getView();
    // 创建 x6 node
    this.x6Node = graph.createNode({
      id,
      ...view,
    });
    // 收集 node 统一添加到画布
    onMountNode(this.x6Node);

    const { position, name, description } = this.props.nodeProps;
    this.x6Node.setPosition(position);
    this.x6Node.setData({
      type,
      name,
      description
    });
  }

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<{}>, nextContext: any): boolean {
    return !isEqual(nextProps.nodeProps, this.props.nodeProps);
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void {
    const { position, name, description } = this.props.nodeProps;
    this.x6Node.setPosition(position);
    this.x6Node.setData({
      type: this.props.type,
      name,
      description
    });
  }

  componentWillUnmount() {
    const { onUnMountNode } = this.props;
    onUnMountNode(this.x6Node);
  }

  render() {
    return null;
  }
}
