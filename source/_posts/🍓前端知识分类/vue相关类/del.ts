import { isPrimitive } from "util";

/* createElement */
function createElement(
  context: Component,
  tag: any,
  data: any,
  children: any,
  normalizationType: any, // ？？ normalizationType是个啥
  alwaysNormalize: boolean
): VNode | Array<VNode> {
  // 若data是数组，？？ 或原始结点 ？？isPrimitive是什么操作？
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }

  // ？？ 如果总是规范化？
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(
  context: Component,
  tag?: string | Class<Component> | Function | Object,
  data?: VNodeData,
  children?: any,
  normalizationType?: number
):VNode|Array<VNode> {
  if (isDef(data) && isDef(data: any).__ob__) { 
    // ？？ 说实话我没见过这个警告
    // 避免将observed对象当作数据
    // 始终在每个渲染中创建新的 vnode 对象
    process.env.NODE_ENV !== 'production' && warn(
      `Avoid using objseved data object as vnode data:$(JSON.string(data)\n)` +
      'Always create fresh vnode data Object in each render!',
      context
    )
    return  createEmptyVNode()
  }

  // v-bind 的对象语法
  if (isDef(data) && isDef(data.is)) { 
    tag = data.is
  }
  if (!tag) { 
    // 如果组件 :is 被设为假值
    return createEmptyVNode()
  }

  // warn against non-primitive key 警告非原始密钥 ??
  // ?? isDef() 和 isPrimitive() 具体是干嘛的
  if (process.env.NODE_ENV !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) { 
    if (!__WEEX__ || !('@binding' in data.key)) { 
      warn(
        'Avoid using non-primitive value as key,' + // 避免使用非原始值作为键
        'use string/numver value instead.', 
        context
      )
    }
  }

  // ...............

  // 把children拍平，搞成 一维数组
  if (normalizationType === ALWAY_NORMALIZE) {
    children = normalizeChildren(children)
  } else if (normalizationType === SIMPLE_NORMALIZE) { 
    children = simpleNormalizeChildren(children)
  }

}
