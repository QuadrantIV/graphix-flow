import { skeleton, PluginConfig } from "graphix-engine";
import Timelne from "./timeline";
import './index.less';

export default function(options: any): PluginConfig {
  return {
    name: 'Toolbar',
    init() {
      skeleton.add({
        area: 'toolbar',
        content: Timelne
      });
    }
  }
}