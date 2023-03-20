# popup 源码学习

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7d34f461fd848538ee500bad9b29dac~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

https://vant-contrib.gitee.io/vant/v2/mobile.html#/zh-CN/popup

## 常用 api

官方文档（https://vant-contrib.gitee.io/vant/v2/#/zh-CN/popup）

- v-model
- overlay
- zIndex
- position: top,bottom
- close-on-click-overlay: true
- lock-scroll
- get-container="body"
- @click-overlay
- round
- teleport="body"
- @touchmove.prevent

## 动画交互

Transition 内置过渡组件（https://v2.cn.vuejs.org/v2/api/#transition，https://v2.cn.vuejs.org/v2/guide/transitions.html）

- **蒙层，**默认居中： van-fade
- **弹出层**
  - 底部弹出 ， van-popup-slide-bottom

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1de167dd239a4b868e3c6b51e4f354a5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

蒙层 CSS 过渡类名（animation.less） ：

- van-fade-enter（进入过渡开始）, **van-fade-enter-active**（进入过渡生效），van-fede-enter-to (进入过渡结束)
- Van-fade-leave（离开过渡开始）, **van-fade-leave-active**（离开过渡生效）, van-fade-leave-to (离开过渡结束)

```scss
@keyframes van-fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes van-fade-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
```

弹出过渡类名

- **van-popup-slide-bottom-enter,** van-popup-slide-bottom-enter-active，van-popup-slide-bottom-enter-to
- van-popup-slide-bottom-leave, **van-popup-slide-bottom-leave-active**, van-popup-slide-bottom-leave-to

```scss
@import '../style/var';

.van {
  &-overflow-hidden {
    overflow: hidden !important;
  }

  &-popup {
    position: fixed;
    max-height: 100%;
    overflow-y: auto;
    background-color: @popup-background-color;
    transition: @popup-transition;
    -webkit-overflow-scrolling: touch;

    &--center {
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);

      &.van-popup--round {
        border-radius: @popup-round-border-radius;
      }
    }

    &--bottom {
      bottom: 0;
      left: 0;
      width: 100%;

      &.van-popup--round {
        border-radius: @popup-round-border-radius @popup-round-border-radius 0 0;
      }
    }

    &-slide-bottom-enter-active {
      transition-timing-function: ease-out;
    }
    &-slide-bottom-enter,
    &-slide-bottom-leave-active {
      transform: translate3d(0, 100%, 0);
    }
  }
}
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c4523d0f64346359c0e3b0fc0720ab2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/becaddf964174d68b0ce95d0663be1dd~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

## 层级展示

当前后打开两个弹窗，用户的预期是按照打开的先后顺序，越后打开的弹窗在越上层，简而言之就是新弹窗永远在最上层。可以通过记录当前出现过的最大 zIndex，新弹窗`zIndex = zIndex+1`。 另外滑动穿透问题在多弹窗情况下也需要处理，对于非当前最高层级弹窗，不应当收到滚动影响。

```js
context.zIndex++;
this.$el.style.zIndex = context.zIndex + 1;
```

1.  zIndex 控制层级

通过 mixin 的方式 openOverlay 打开遮罩层组件 Overlay

```js
  renderOverlay() {
    if (this.$isServer || !this.value) {
      return;
    }

    this.$nextTick(() => {
      this.updateZIndex(this.overlay ? 1 : 0);

      if (this.overlay) {
        openOverlay(this, {
          zIndex: context.zIndex++,
          duration: this.duration,
          className: this.overlayClass,
          customStyle: this.overlayStyle,
        });
      } else {
        closeOverlay(this);
      }
    });
  },

  updateZIndex(value = 0) {
    this.$el.style.zIndex = ++context.zIndex + value;
  },

```

1.  层叠上下文

van-overlay、van-popup

```html
<div class="van-doc-demo-block__card">
  <div role="button" tabindex="0" class="van-cell van-cell--clickable">
    <div class="van-cell__title"><span>顶部弹出</span></div>
    <i class="van-icon van-icon-arrow van-cell__right-icon"><!----></i>
  </div>
  <div role="button" tabindex="0" class="van-cell van-cell--clickable">
    <div class="van-cell__title"><span>底部弹出</span></div>
    <i class="van-icon van-icon-arrow van-cell__right-icon"><!----></i>
  </div>
  <div role="button" tabindex="0" class="van-cell van-cell--clickable">
    <div class="van-cell__title"><span>左侧弹出</span></div>
    <i class="van-icon van-icon-arrow van-cell__right-icon"><!----></i>
  </div>
  <div role="button" tabindex="0" class="van-cell van-cell--clickable">
    <div class="van-cell__title"><span>右侧弹出</span></div>
    <i class="van-icon van-icon-arrow van-cell__right-icon"><!----></i>
  </div>
  <div class="van-overlay" style="z-index: 2003; display: none"></div>
  <div
    class="van-popup van-popup--top"
    style="height: 30%; z-index: 2004; display: none"
  ></div>
  <div class="van-overlay" style="z-index: 2001; display: none"></div>
  <div
    class="van-popup van-popup--bottom"
    style="height: 30%; z-index: 2002; display: none"
  ></div>
  <!----><!---->
</div>
```

## 滑动穿透

待定

- overflow: hidden （pc 端解决方案）
- Touch 事件（ios 设备）

```js
  addLock() {
    if (this.lockScroll) {
      on(document, 'touchstart', this.touchStart);
      on(document, 'touchmove', this.onTouchMove);

      if (!context.lockCount) {
        document.body.classList.add('van-overflow-hidden');
      }
      context.lockCount++;
    }
  },

  removeLock() {
    if (this.lockScroll && context.lockCount) {
      context.lockCount--;
      off(document, 'touchstart', this.touchStart);
      off(document, 'touchmove', this.onTouchMove);

      if (!context.lockCount) {
        document.body.classList.remove('van-overflow-hidden');
      }
    }
  },

```

## 参考连接

- [仿 van-popup 实现一个从底部弹出的 Popup - 掘金](https://juejin.cn/post/6866331596090736647)
- [vue 组件库之 popup 弹窗组件 - 掘金](https://juejin.cn/post/6844904030083219463)
- [NutUI 组件 popup 源码分析 - 掘金](https://juejin.cn/post/6844904196739694605)
