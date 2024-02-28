import { PrototypeConfig } from 'graphix-engine';
import { NodeType, ShapeType } from './types';
import InputSetter from './setter/input-setter';
import { TaskIcon } from '../icon';

const prototype: PrototypeConfig = {
  icon: TaskIcon,
  type: NodeType.Task,
  view: {
    shape: ShapeType.Common,
  },
  props: {
    name: 'Task',
    description: 'Task'
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
