// Context
import { context } from './context';
import {
  openOverlay,
  closeOverlay,
  updateOverlay,
  removeOverlay,
} from './overlay';

// Utils
import { on, off, preventDefault } from '../../utils/dom/event';
import { removeNode } from '../../utils/dom/node';
import { getScroller } from '../../utils/dom/scroll';
import { log } from '../../utils';

// Mixins
import { TouchMixin } from '../touch';
import { PortalMixin } from '../portal';
import { CloseOnPopstateMixin } from '../close-on-popstate';

export const popupMixinProps = {
  // Initial rendering animation
  transitionAppear: Boolean,
  // whether to show popup
  value: Boolean,
  // whether to show overlay
  overlay: Boolean,
  // overlay custom style
  overlayStyle: Object,
  // overlay custom class name
  overlayClass: String,
  // whether to close popup when overlay is clicked
  closeOnClickOverlay: Boolean,
  // z-index
  zIndex: [Number, String],
  // prevent body scroll
  lockScroll: {
    type: Boolean,
    default: true,
  },
  // whether to lazy render
  lazyRender: {
    type: Boolean,
    default: true,
  },
};

export function PopupMixin(options = {}) {
  return {
    mixins: [
      TouchMixin,
      CloseOnPopstateMixin,
      PortalMixin({
        afterPortal() {
          if (this.overlay) {
            updateOverlay();
          }
        },
      }),
    ],

    provide() {
      return {
        vanPopup: this,
      };
    },

    props: popupMixinProps,

    data() {
      this.onReopenCallback = [];
      return {
        inited: this.value,
      };
    },

    computed: {
      shouldRender() {
        return this.inited || !this.lazyRender;
      },
    },

    watch: {
      // 手动设置修改开关
      value(val) {
        const type = val ? 'open' : 'close';
        this.inited = this.inited || this.value;
        this[type]();

        if (!options.skipToggleEvent) {
          this.$emit(type);
        }
      },

      overlay: 'renderOverlay',
    },

    mounted() {
      if (this.value) {
        this.open();
      }
    },

    /* istanbul ignore next */
    activated() {
      if (this.shouldReopen) {
        this.$emit('input', true);
        this.shouldReopen = false;
      }
    },

    beforeDestroy() {
      removeOverlay(this);

      if (this.opened) {
        this.removeLock();
      }

      if (this.getContainer) {
        removeNode(this.$el);
      }
    },

    /* istanbul ignore next */
    deactivated() {
      if (this.value) {
        this.close();
        this.shouldReopen = true;
      }
    },

    methods: {
      open() {
        /* istanbul ignore next */
        if (this.$isServer || this.opened) {
          return;
        }
        log('打开 vant popup');

        // cover default zIndex
        if (this.zIndex !== undefined) {
          context.zIndex = this.zIndex;
        }

        this.opened = true;
        this.renderOverlay();
        this.addLock();
        this.onReopenCallback.forEach((callback) => {
          callback();
        });
      },

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
      // 默认点击 Overlay 可以触发
      close() {
        if (!this.opened) {
          return;
        }

        closeOverlay(this);
        this.opened = false;
        this.removeLock();
        this.$emit('input', false);
      },

      onTouchMove(event) {
        console.log('touchmove 事件触发：');
        this.touchMove(event);
        const direction = this.deltaY > 0 ? '10' : '01'; // 10 向上， 01 向下
        const el = getScroller(event.target, this.$el);
        // scrollTop 已经滚动的高度（内容顶部卷起来的部分 >= 0）
        // scrollHeight 可滚动内容的高度
        // offsetHeight 元素内部的高度（含内边距）
        const { scrollHeight, offsetHeight, scrollTop } = el;
        let status = '11';

        /* istanbul ignore next */
        // 默认状态下，能滚动也还没滚
        if (scrollTop === 0) {
          // 00 不能滚，01 可以滚
          status = offsetHeight >= scrollHeight ? '00' : '01';
        } else if (scrollTop + offsetHeight >= scrollHeight) {
          // 10 可以滚
          status = '10';
        }

        console.log({
          el,
          scrollHeight,
          offsetHeight,
          scrollTop,
          status,
          direction,
        });

        /* istanbul ignore next */
        if (
          status !== '11' &&
          this.direction === 'vertical' &&
          // ! 拦截向上下两个方向不能滑动的情况，不要穿透了
          // 第一个 parseInt：选中 00 不能滚的情况 ('00', 2) = 0
          // & 按位与（在 a,b 的位表示中，每一个对应的位都为 1 则返回 1，否则返回 0） https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_Operators
          // 第二个 parseInt：选中上下两个方向，('10', 2) => 2, ('01', 2) => 1
          !(parseInt(status, 2) & parseInt(direction, 2))
        ) {
          console.log('滚动穿透被拦截了！');
          preventDefault(event, true);
        }
      },

      renderOverlay() {
        if (this.$isServer || !this.value) {
          return;
        }

        this.$nextTick(() => {
          // popup 有遮罩直接加 2，否则 + 1
          this.updateZIndex(this.overlay ? 1 : 0);
          // 遮罩在 context.zIndex 的基础上加 1
          if (this.overlay) {
            openOverlay(this, {
              zIndex: context.zIndex++, // ++在后，下一轮再自增，遮罩始终必 popup 小 1
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
        // ++ 在前，zIndex会本轮自增
        this.$el.style.zIndex = ++context.zIndex + value;
      },

      onReopen(callback) {
        this.onReopenCallback.push(callback);
      },
    },
  };
}
