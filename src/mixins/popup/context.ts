import { OverlayConfig } from './overlay';

export type StackItem = {
  vm: any; // 每一个 popup 实例维护了一个与之对应的 overlay
  overlay: any; // overlay 实例，可以直接控制开关
  config: OverlayConfig;
};

export const context = {
  zIndex: 2000,
  lockCount: 0,
  stack: [] as StackItem[],
  find(vm: any): StackItem | undefined {
    // 全等也不怕，人家比较的是 this 指向的引用地址
    return this.stack.filter((item) => item.vm === vm)[0];
  },
  remove: function remove(vm: any) {
    const item = this.find(vm);
    if (!item) return;
    item.vm = null;
    item.overlay = null;
    const index = this.stack.indexOf(item);
    this.stack.splice(index, 1);
  },
};
