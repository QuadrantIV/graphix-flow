import { init, pluginRegistry, prototypeRegistry, skeleton, AreaType, render } from 'graphix-engine';
import { DemoSchema } from './schema/demo';
import {
  Start,
  End,
  Task,
  Edge,
  Choice,
} from './component';
import TopbarPlugin from './plugin/topbar';
import Designer from './plugin/designer';
import Toolbar from './plugin/toolbar';
import 'graphix-engine/dist/index.css';
import '@alifd/next/index.css';

(async () => {
  // skeleton
  skeleton.getArea(AreaType.RightArea)?.setTitle('Global Settings');

  // 注册组件
  [Start, End, Task, Choice, Edge].forEach((comp) => {
    prototypeRegistry.register(comp);
  });

  // 注册插件
  await pluginRegistry.register(TopbarPlugin);
  await pluginRegistry.register(Toolbar);
  await pluginRegistry.register(Designer);

  // 启动
  init({
    schema: DemoSchema,
  });
})();
