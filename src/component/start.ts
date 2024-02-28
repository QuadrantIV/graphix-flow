import { PrototypeConfig } from 'graphix-engine';
import { NodeType } from './types';
import { StartEventView } from './shape';

const prototype: PrototypeConfig = {
  type: NodeType.Start,
  view: StartEventView,
  props: [],
  settings: [],
};

export default prototype;
