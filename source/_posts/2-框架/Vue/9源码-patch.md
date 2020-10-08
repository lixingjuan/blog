# patch
patch过程把 `VNode` 转换成真正的DOM节点。
通过之前的分析可知，在通过`createComponet`创建了组件Vnode, 接下来会走到`vm._update`, 执行 `vm.__patch__` 去吧 `VNode` 转换成真正的DOM节点;
但是针对一个普通的`VNode`节点，`VNode`创建过程有所不同;

整个patch过程实际上是一个深度遍历的过程，每次遍历都把激活的vm实例，赋值给 activeInstance , 在初始化子组件的时候，就将这个 activeInstance 作为参数传入，在 initLifecycle 的过程中，就可以拿到 当前的 vm 的实例， 然后将 之前保存的activeInstance作为当前的 vm 实例的父组件；initLifecycle中建立了父子关系；

本节目标：
1. 了解组件 patch 整体流程；
2. 了解组件 patch 流程中的 `activeInstance`、 `vm.$vnode`(占位符vnode)、`vm._vnode`;
3. 嵌套组件的插入顺序；

## 回顾createElm

patch 的过程会调用 `createElm` 创建元素节点
回顾下 `createElm` 的实现（定义在`src/core/vdom/patch.js`）

```js
function createElm(
  vnode,
  insertedVnodeQueue,
  parentElm,
  refElm,
  nested,
  ownerArray,
  index
) {
  // ......

  if( createComponent(vnode, insertedVnodeQueue, parentElm, refElm)){
    return
  }
  // ......
}
```

留下关键代码，可知判断了`createComponent(...)` 的返回值。如果为true, 则直接结束，再来看下 `createComponent`方法的实现：

## createComponent

```js
function createComponent(vnode, insertedVnodeQueue, parentElm, refElm){
  let i = vnode.data
  if( isDef(i) ) {
    const isReactivated = isDef( vnode.componentInstance) && i.keepAlive
    if ( isDef( i = i.hook ) && isDef( i = i.init )){
      i( vnode, false /* hydrating */ )
    }
    // 在调用了 init hook 之后，如果该 vnode 是一个 child component, 他应该被创建一个 child instance并且 mounted 
    // 这个child component 也应该被设置 vnode 元素作为占位符
    // 在这种情况下，我们只需返回元素并完成
    if( isDef( vnode.componentInstance) ){
      initComponent(vnode, insertedVnodeQueue)
      insert(parentElm, vnode.elm, refElm) // 组件的插入是在执行 insert 方法的时候
      if( isTrue(isReactivated) ){
        reactivatedComponent(vnode insertedVnodeQueue, parentElm, refElm)
      }
      return true
    }
  }
}
```

在 `createComponent` 中，首先对 `vnode.data` 做了一些判断， 如果 `vnode` 是一个组件 `VNode`, 那么条件就会满足，并且得到 `i` 就是 `init` 钩子函数;


## 回顾init

回顾上节在创建组件 `VNode` 的时候合并钩子函数就包含 `init` 钩子函数， 定义在`src/core/vdom/create-component.js` 中:

```javascript
function init(vnode: VNodeWithData, hydrating: boolean ): ?boolean {
  if(
    vnode.componentInstance && 
    !vnode.componentInstance._isDestoty && 
    vnode.data.keepAlive
  ){
    // kept-alive components, treat as a patch
    // keepAlive的情况是通过createComentInstanceForVnode 创建一个Vue 的实例，然后调用 $mount 方法挂载子组件 ？？ 这个确定是 keepAlive的情况？？
    const mountedNode: any = vnode // work around flow
    componentVNodeHooks.prepatch (mountedNode, mountedNode)
  } else {
    const child = vnode.componentInstance = createComponentInstanceForVnode( vnode, activeInstance )
    child.$mount(hydrating ? vnode.elm : undefined, hydrating)
  }
}
```
 

先来看一下 `createComponentInstanceForVnode` 的实现

```js
export function createComponentInstanceForVnode(
  vnode: any, // 我们知道他是MountedComponentVNode,但是 flow不知道
  parent: any
): Component {
  const options: InternalComponentOptions = {
    _isComponent: true,
    _parentVnode: vnode,
    parent
  };
  // 检查inlineTemplate渲染功能
  const inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options); // 对应子组件的构造函数
}
```

`createComponentInstanceForVnode` 函数构造的一个内部组件的参数，然后执行 `new vnode.componentOptions.Ctor(options)`,
这里的`vnode.componentOptions.Ctor(options)` 对应的就是子组件的构造函数，根据之前的分析可知， 它实际上是继承于 Vue 的一个构造器 `Sub`, 相当于 `new Sub(options)`



这里有几个关键参数要注意几个点：
1. `_isComponent` 为 true 表示他是一个组件；
2. `parent` 表示当前激活的组件实例(注意，这里比较有意思的是如何拿到组件实例，见后面章节)


所以子组件的实例化实例上就是这个时机执行的，并且他会执行实例的 `_init` 方法，这个过程和之前不同的地方单独列出来说明（代码位于 `src/core/instance/init.js`）;

```js
Vue.prototype._init = function(options?: Object) {
  const vm: Component = this;
  // merge options
  if (options && options._isComponent) {
    // 优化内部组件实例化
    // 因为动态选项合并非常慢，而且没有
    // 内部组件选项需要特殊处理
    initInternalComponent(vm, options);
  } else {
    vm.$options = mergeOptions(resoleConstructorOptiosn(vm.comstructor), options || {}, vm);
  }
  // ......
  if (vm.$optiosn.el) {
    vm.$mount(vm.$options.el);
  }
};

```






这里首先是合并 `options` 的过程有变化， `_isComponent` 为true , 所以走到了 `initComponent` 过程;

如下是 `initInternalComponent` 过程：

## initInternalComponent

```js
export function initInternalComponent (
  vm: Component, 
  options: InternalComponentOptions
) {
  const opts = vm.$options = Object.create(vm.constructor.options)
  // doing this because it's faster than dynamic enumeration.
  // 这三行代码是把我们之前通过createComponentInstanceForVnode函数传入的几个参数合并到内部的选项 $options里
  const parentVnode = options._parentVnode
  opts.parent = options.parent
  opts._parentVnode = parentVnode

  const vnodeComponentOptions = parentVnode.componentOptions
  opts.propsData = vnodeComponentOptions.propsData
  opts._parentListeners = vnodeComponentOptions.listeners
  opts._renderChildren = vnodeComponentOptions.children
  opts._componentTag = vnodeComponentOptions.tag

  if (options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}
```






再看下 `_init` 函数最后执行的代码

```js
if(vm.$options.el){
  vm.$moutn(vm.$options.el)
}
```

由于组件初始化的时候是不传 `el` 的，因此组件是自己接管了 `$mount` 的过程(详见)


回到组件 `init` 的过程， `componentVNodeHooks` 的 `init` 钩子函数，在完成实例化的 `_init` 后，接着会执行 `child.$mount(hydrating ? vnode.elm : undefined, hydrating)`;
这里的 hydrating为true 一般是服务器端渲染的情况;
目前只考虑客户端渲染，所以这里的$mount 相当于执行 child.$mount(undefined, false) 他最终会调用 mountComponet 方法，进而执行 vm._render() 方法：

```js
Vue.prototype._render = function (): VNode {
  const vm: Component = this
  const { render, _parentVnode } = vm.$options


  // 设置父vnode, 这使得渲染功能可以访问到占位符节点上的数据。
  vm.$vnode = _parentVnode

  // render self
  let vnode
  try {
    vnode = render.call(vm._renderProxy, vm.$createElement)
  } catch (e) {
    // ...
  }
  
  // set parent
  vnode.parent = _parentVnode
  return vnode
}
```



此处 =>
-  `_parentVnode` 即当前节点的 父VNode；
-  render函数生成 vnode 即当前组件渲染的vnode;
-  vnode 的parent 指向了 `_parentVnode`，也就是 vm.$vnode, 他们是一种父子关系






我们知道，执行完 `vm._render` 生成 VNode后，接下来就是要执行 `vm._update` 去渲染 VNode, 来看下组件渲染的过程中有哪些需要注意的 =>




## vm._update过程注意

vm._update 定义在 `src/core/instance/lifecycle.js`

```js
export let activeInstance: any = null

Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
  const vm: Component = this
  const prevEl = vm.$el
  const prevVnode = vm._vnode
  const prevActiveInstance = activeInstance
  activeInstance = vm
  vm._vnode = vnode
  
 
  // 根据使用的渲染后端， 将Vue.prototype .__ patch__注入入口点
  if (!prevVnode) {
    // initial render
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
  } else {
    // updates
    vm.$el = vm.__patch__(prevVnode, vnode)
  }

  activeInstance = prevActiveInstance

  // update __vue__ reference
  if (prevEl) {
    prevEl.__vue__ = null
  }
  if (vm.$el) {
    vm.$el.__vue__ = vm
  }
  
  // 如果父项是HOC，则也要更新其$ el
  if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
    vm.$parent.$el = vm.$el
  }

  // 调度程序将调用更新的钩子，以确保子进程处于父母的更新钩子中更新。 
}

```




**_update过程几个关键的逻辑：**

1. 注意点1:  `vm._vnode = vnode:` 这个vnode是通过 `vm._render()` 返回的组件渲染VNode, `vm._vnode` 和 `vm.$vnode` 的关系就是一种父子关系，用代码表示即 `vm._vnode.parent === vm.$vnode`


2. 注意点2: 如下代码：

```js
export let activeInstance: any = null;

Vue.prototype._update = function(vnode: VNode, hydrating?: viikean) {
  // ......
  const pervActiveInstance = activeInstance;
  activeInstance = vm;

  if (!prevVnode) {
    // initial render
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
  } else {
    // updates
    vm.$el = vm.__patch__(prevVnode, vnode);
  }
  activeInstance = prevActiveInstance;
};

```

上面代码中的`activeInstance`的作用就是保持当前上下文的 Vue 实例， 他是lifecyle模块的全局变量，定义在是`export let activeInstance: any = null`, 并且在之前我们调用 createComponentInstanceForVnode 方法的时候从`liftcycle` 模块获取， 并且作为参数传入；



因为实际上 javascript 是一个单线程， Vue 整个初始化是一个深度遍历的过程，在实例化子组件的过程中，他需要知道当前上下文的Vue实例是什么，并把它作为子组件的父Vue实例；
之前我们提到，对子组件的实例化过程先会调用 `initInternalComponent(vm, options)` 合并 options, 把 parent存储在 vm.$options 中，在 $mount 之前会调用 initLifecycle(vm)方法



```js
/* initLifecycle */
export function initLifecycle (vm: Component) {
  const options = vm.$options

  // 定位第一位非抽象父母
  let parent = options.parent
  
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }

  vm.$parent = parent
  
  // ......
}
```



可以看到， vm.$parent就是用来保留当前 vm的父实例，并且通过parent.$children.push(vm)来把当前的vm存储到父实例的 `$children` 中，在vm._update的过程中，把当前的 vm 赋值给 activeInstance, 同时通过 `const prevActiveInstance = activeInstance` 用 `prevActiveInstance` 保留上一次的 `activeInstance`;
实际上，`prevActiveInstance` 和当前的 vm 是一个父子关系，当一个vm实例完成他的所有子树的patch或者update过程后，`activeInstance` 会回到他的父实例，这样就完美的保证了`createComponentInstanceForVnode`整个深度遍历过程中，我们在实例化子组件的时候能传入当前子组件的父Vue 实例，并在_init 的过程中，通过 vm.$parent把这个父子关系保留；

回到 _update, 最后就是调用 `__patch__` 渲染 VNode 了

```js
removeOnly */)

function patch (oldVnode, vnode, hydrating, removeOnly) {
  // ...
  let isInitialPatch = false
  const insertedVnodeQueue = []

  if (isUndef(oldVnode)) {
    // empty mount (likely as component), create new root element
    isInitialPatch = true
    createElm(vnode, insertedVnodeQueue)
  } else {
    // ...
  }
  // ...
}
```


这里又回到了本节开始的过程， 之前分析过，负责渲染成DOM的函数是 `createElm`, 注意这里只传了两个参数，所以对应 parentElm 是 undefined, 再来看下他的定义：

```js
function createElm (
  vnode,
  insertedVnodeQueue,
  parentElm,
  refElm,
  nested,
  ownerArray,
  index
) {
  // ...
  if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
    return
  }

  const data = vnode.data
  const children = vnode.children
  const tag = vnode.tag
  if (isDef(tag)) {
    // ...

    vnode.elm = vnode.ns
      ? nodeOps.createElementNS(vnode.ns, tag)
      : nodeOps.createElement(tag, vnode)
    setScope(vnode)
  /* istanbul ignore if */
    if (__WEEX__) {
      // ...
    } else {
      createChildren(vnode, children, insertedVnodeQueue)
      if (isDef(data)) {
        invokeCreateHooks(vnode, insertedVnodeQueue)
      }
      insert(parentElm, vnode.elm, refElm)
    }

    // ...
  } else if (isTrue(vnode.isComment)) {
    vnode.elm = nodeOps.createComment(vnode.text)
    insert(parentElm, vnode.elm, refElm)
  } else {
    vnode.elm = nodeOps.createTextNode(vnode.text)
    insert(parentElm, vnode.elm, refElm)
  }
}

```

注意，我们这了传入的 vnode 是组件渲染的 vnode ,也就是我们之前说的 vm._vnode, 如果组件的跟节点是个普通元素，那么 vm._vnode也是普通的 vnode, 这里 createComponent(vnode, instanceVnodeQueue, parentElm)的返回值是false;
接下来的过程就和上一章一样了（？？），先创建一个父节点占位符，然后再遍历所有子VNode 递归调用 createElm, 在遍历的过程中，如果遇到 VNode是一个组件的 VNode， 则重复本节开始的过程， 这样通过一个递归的方式就完整的构建了整个组件树；
由于我们这个时候传入的 parentElm 是空， 所以对组件的插入，在createComponent 有这么一段逻辑：

```js
function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
  let i = vnode.data
  if (isDef(i)) {
    // ....
    if (isDef(i = i.hook) && isDef(i = i.init)) {
      i(vnode, false /* hydrating */)
    }
    // ...
    if (isDef(vnode.componentInstance)) {
      initComponent(vnode, insertedVnodeQueue)
      insert(parentElm, vnode.elm, refElm)
      if (isTrue(isReactivated)) {
        reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
      }
      return true
    }
  }
}
```

在完成组件的整个patch过程后，最后执行insert(parentElm, vnode.elm, refElm) 完成组件的 DOM 插入，
如果组件 patch 过程中又创建了子组件，那么DOM 的插入顺序是先子后父；





## 总结

到此，一个组件的VNode 如何创建、初始化、渲染的过程学习完毕；
<!-- 在对组件的实现又一个大概的了解后，接下来学习其中的细节，我们知道，编写一个组件实际上是编写一个 javascript对象，对象的描述就是i各种配置，之前我们提到的在 _init 的最初阶段就执行的就是 merge options 的逻辑，那么接下来学习从源码的角度分合并配置的过程； -->

1. patch的整体流程：createComponent => 子组件初始化(init, createComponentInstanceForVnode, 整个子组件的init过程(合并options,lifecycle初始化等和vue一样的初始化过程)) => 子组件render(生成子组件的渲染vnode) => 子组件patch(渲染子组件的vnode，渲染的过程中如果还有子组件，就递归渲染) 
2. activeInstance: 当前激活的vm实例（作为parent实例传入）；vm.$vnode: 组件的占位vnode; vm._vnode: 组件的渲染vnode;
3. 嵌套组件的插入顺序是先子后父；


