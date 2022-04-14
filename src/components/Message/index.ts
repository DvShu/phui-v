import { VNode, h, render } from 'vue';
import MessageTemplate from './Message.vue';

const messageTypes = ['info', 'success', 'error', 'warn'];
const instances: VNode[] = []; // 保存所有的消息体
let seed = 0; // 用于构建多个消息时，构建消息的id，避免重复

/** 消息配置 */
interface MessageOption {
  /** 显示时间，单位为毫秒，默认为：3000。 设为 0 则不会自动关闭 */
  duration?: number;
  /** 显示的消息 */
  message: string;
  /** 消息类型：error、warning、success、info */
  type?: string;
  /** 宽度 *
  width?: string;
  /** 自定义类名 */
  'custom-class'?: string;
}

interface MessageInstance {
  (option: string | MessageOption): void;
  info: (msg: string | MessageOption) => void;
  warn: (msg: string | MessageOption) => void;
  success: (msg: string | MessageOption) => void;
  error: (msg: string | MessageOption) => void;
  [index: string]: any;
}

/** 关闭消息 */
function close(id: string) {
  // 查询需要删除的消息节点
  let idx = instances.findIndex((vm) => {
    if (vm.component != null) {
      return vm.component.props.id === id;
    }
    return false;
  });
  if (idx === -1) return;
  // 从消息列表中移除消息
  let removedVm = instances.splice(idx, 1)[0];
  if (removedVm == null) return;
  let removedHeight = 15;
  if (removedVm.el != null) {
    removedHeight = removedVm.el.offsetHeight;
  }
  const len = instances.length;
  if (len === 0) return;
  // 消息移除后，重新构建后续消息的 top
  for (let i = idx; i < len; i++) {
    let instance = instances[i];
    if (instance.el != null && instance.component != null) {
      const offset =
        parseInt(instance.el.style['top'], 10) - removedHeight - 15;
      instance.component.props.offset = offset;
    }
  }
}

const Message: MessageInstance = ((option: string | MessageOption) => {
  // 构建一个新的节点用来渲染提示信息
  let container = document.createElement('div');
  // 计算消息的位置
  let offset = 15;
  for (let vm of instances) {
    if (vm.el != null) {
      offset += vm.el.offsetHeight + 15;
    }
  }

  // 消息id
  const id = `message${++seed}`;
  const props: any = typeof option === 'string' ? { message: option } : option;
  props.id = id;
  props.offset = offset;
  props.onClose = () => {
    close(id);
  };
  props.onDestroy = () => {
    // 动画结束后，节点已经隐藏，同时将节点移除
    render(null, container);
    container = null as any;
  };

  const vm = h(MessageTemplate, props);

  render(vm, container);
  instances.push(vm);
  document.body.appendChild(container.firstElementChild as any);
}) as any;

messageTypes.forEach((type: string) => {
  Message[type] = (options: string | MessageOption) => {
    let opts: MessageOption =
      typeof options === 'string' ? { message: options } : options;
    opts.type = type as any;
    Message(opts);
  };
});

export default Message;
