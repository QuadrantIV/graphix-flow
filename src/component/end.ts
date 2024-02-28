import { PrototypeConfig } from 'graphix-engine';
import { NodeType } from './types';
import { EndEventView } from './shape';

const prototype: PrototypeConfig = {
  type: NodeType.End,
  view: EndEventView,
  props: [],

  settings: [],
};

export default prototype;
