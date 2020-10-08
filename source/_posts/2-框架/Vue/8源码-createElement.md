# createElement 创建VNode的过程


 

vue.js使用`createElement`创建`VNode`，定义在 `src/core/create-element.js`中；

```js
/* createElement */

function createElement(
  context: Component,
  tag: any,
  data: any,
  children: any,
  normalizationType: any, // ？？ normalizationType是个啥
  alwaysNormalize: boolean
): VNode | Array<VNode> {
  // 若data是数组，？？ 或原始结点 ？？isPrimitive是什么操作？=> 满足这个判断条件，说明第三个位置传递的实际上是第四个参数，children
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
```


`createElement`实际上是对 `_createElement`做了一层封装，它允许传入的参数更加灵活，在处理完这些参数后，再去调用真正创建 `VNode`的函数 `_createElement`；

```js
function _createElement(
  context: Component,
  tag?: string | Class<Component> | Function | Object,
  data?: VNodeData,
  children?: any,
  normalizationType?: number
):VNode|Array<VNode> {


  // 以下这些是对参数一致的处理，因为data是可以没有的，如果没有传递该参数的化，后免的桉树依次前移

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

  // 处理tag
  if(typeof tag === 'string'){  // tag 是字符串
    if(){
      // 如果是原生结点，创建 VNode 即可
    }else if(){
      // 组件tag,一堆处理
    }
  }else {                       // tag 是函数组件

  }
}
```
 
`_createElement` 有五个参数；
1. `context`, 代表上下文环境，他是`Component`类型；
2. `tag`, 代表标签，可以是一个`字符串`或`Component`
3. `data`, 表示VNode的数据，他是一个`VNodeData`类型；
4. `children`, 表示当前结点的字节点，任意类型；
5. `normalizationType`, 表示字节点规范的类型，类型不同规范的方法就不同，它主要参考render函数是编译生成的还是用户手写的；


## children 的规范化

由于`virtual DOM`实际上是一个树状结构，每一个`VNode`可能会有若干个字节点，这些字节点也应该是 `VNode` 类型，因为需要把他们规范化为 `VNode`类型





TODO: 。。。。。。。这里还有好多详细的，晚点在看


## 总结

大致了解了 `createElement` 创建 `VNode`的过程， 每个 `VNode`都有 `children`, `children` 每个元素也是一个 `VNode`，这样就形成了 **VNode Tree**, 他很好的描述了我们的 **DOM tree**

回到 mountComponent 函数的过程，我们已经知道 vm._render 是如何创建了一个 `VNode`，接下来就是要把这个`VNode`渲染为一个真实的DOM并渲染出来，这个过程是通过 vm._update完成的