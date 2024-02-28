import { PrototypeConfig } from 'graphix-engine';
import { NodeType, ShapeType } from './types';
import InputSetter from './setter/input-setter';
import { ChoiceIcon } from '../icon';

const prototype: PrototypeConfig = {
  icon: ChoiceIcon,
  type: NodeType.Choice,
  view: {
    shape: ShapeType.Common,
  },
  props: {
    name: 'Choice',
    description: 'Choice',
  },
  settings: [
    {
      target: 'name',
      setter: InputSetter,
    },
    {
      target: 'description',
      setter: InputSetter,
    }
  ],
};

export default prototype;
