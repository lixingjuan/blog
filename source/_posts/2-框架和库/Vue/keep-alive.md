<iframe src="https://w7wyz.csb.app/" style="margin: 30px 0;border: none;"></iframe>

[测试代码地址](https://codesandbox.io/s/trusting-river-w7wyz?file=/index.html)



{% pullquote mindmap %}
#keep-alive
##实现
###四种绑定规则
####new
####显示绑定
####默认绑定
####隐式绑定
##渲染
###首次渲染
###更新渲染
{% endpullquote %}





`<keep-alive>` 本质上是 `vue` 框架实现的组件，通过自定义 render 函数并且利用了插槽;
`<keep-alive>` 在 created 钩子里定义了 this.cache 和 this.keys，本质上它就是去缓存已经创建过的 vnode;
获取到 this.$slot.default (即放在`<keep-alive>`获取到的是此处的vnode`</keep-alive>`)
判断 this.keys 中是否已经缓存过该组件
this.$slot.default 和 prop.children 感觉是担任相同的责任，都是一个对象(即虚拟 dom 的具体体现), 只不过在属性的定义上不同；

## 1. 实现


```js
export default {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created () {
    this.cache = Object.create(null)
    this.keys = []
  },

  destroyed () {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () {
    // 监听 include 和 exclude的变化，及时对cache 进行处理
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  render() {
    // 1. 获取vnode, keep-alive 只处理第一个子元素
    const slot = this.$slots.default
    const vnode: VNode = getFirstComponentChild(slot)

    // 2. 先判断是否不需要缓存 根据 includes / excludes 字段
    if(不需要缓存) {
        return vnode
    }

    // 3. 根据key, 判断当前 vnode 是否缓存过，做不同的处理
    const { cache, keys } = this

    if(已经缓存过){
        1. 返回缓存中的vnode
        2. 将该key从缓存数组中移除
        3. 将该key对应的vnode 放在数组最后位置
    }else {
        1. 将该vnode 放进缓存数组
        2. return 该 vnode
    }

    if(超过设置的max缓存数量){
        移除缓存数组最后几个
    }
  }
}
```

`pruneCache` ，其实就是对 cache 做遍历，发现缓存的节点名称和新的规则没有匹配上的时候，就把这个缓存节点从缓存中摘除。


```js
function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}
```

## 2. 首次渲染

Vue 的渲染最后都会到 patch 过程, patch 过程会执行 createComponent 方法

```js
function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
  let i = vnode.data
  if (isDef(i)) {
    /**
     * 首次渲染的时候，
     * vnode.componentInstance 为 undefined,
     * vnode.data.keepAlive 为 true ---- 因为它的父组件 <keep-alive> 的 render 函数会先执行
     * 所以 isReactivated 为 false,
     */
+   const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
    if (isDef(i = i.hook) && isDef(i = i.init)) {
      i(vnode, false /* hydrating */)
    }
    // after calling the init hook, if the vnode is a child component
    // it should've created a child instance and mounted it. the child
    // component also has set the placeholder vnode's elm.
    // in that case we can just return the element and be done.
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


接下来走正常的 init 的钩子函数执行组件的 mount， 当 vnode 已经执行完 patch 后，执行 initComponent 函数：

这里会有 vnode.elm 缓存了 vnode 创建生成的 DOM 节点。所以对于首次渲染而言，除了在 <keep-alive> 中建立缓存，和普通组件渲染没什么区别


## 3. DOM更新

当数据发送变化，在 patch 的过程中会执行 `patchVnode` 的逻辑，它会对比新旧 vnode 节点，甚至对比它们的子节点去做更新逻辑，但是对于组件 vnode 而言，是没有 children 的，
那么对于 `<keep-alive>` 组件而言，如何更新它包裹的内容呢？

patchVnode 在做各种 diff 之前，会先执行 `prepatch` 的钩子函数, `prepatch` 的核心就是执行 `updateChildComponent` 函数， `updateChildComponent` 方法主要是去更新组件实例的一些属性

```js
export function updateChildComponent (
  vm: Component,
  propsData: ?Object,
  listeners: ?Object,
  parentVnode: MountedComponentVNode,
  renderChildren: ?Array<VNode>
) {
  const hasChildren = !!(
    renderChildren ||
    vm.$options._renderChildren ||
    parentVnode.data.scopedSlots ||
    vm.$scopedSlots !== emptyObject
  )

  // ，，，在我们的例子中就是缓存的 A 组件，接着又会执行 patch 过程，再次执行到 createComponent 方法
  /**
   * 由于 <keep-alive> 组件本质上支持了 slot，所以它执行 prepatch 的时候，需要对自己的 children，也就是这些 slots 做重新解析，并触发 <keep-alive> 组件实例 $forceUpdate 逻辑
   * 也就是重新执行 <keep-alive> 的 render 方法
   * 这个时候如果它包裹的第一个组件 vnode 命中缓存，则直接返回缓存中的 vnode.componentInstance
   * 接着又会执行 patch 过程，再次执行到 createComponent 方法
   */
  if (hasChildren) {
+   vm.$slots = resolveSlots(renderChildren, parentVnode.context)
    vm.$forceUpdate()
  }
}
```

这次的 isReactivated 为true

```js
function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
  let i = vnode.data
  if (isDef(i)) {
    const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
    if (isDef(i = i.hook) && isDef(i = i.init)) {
      i(vnode, false /* hydrating */)
    }
    // after calling the init hook, if the vnode is a child component
    // it should've created a child instance and mounted it. the child
    // component also has set the placeholder vnode's elm.
    // in that case we can just return the element and be done.
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

执行到 `initComponent`


```js
function initComponent (vnode, insertedVnodeQueue) {
  if (isDef(vnode.data.pendingInsert)) {
    insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert)
    vnode.data.pendingInsert = null
  }

  vnode.elm = vnode.componentInstance.$el
  if (isPatchable(vnode)) {
    invokeCreateHooks(vnode, insertedVnodeQueue)
    setScope(vnode)
  } else {
    // empty component root.
    // skip all element-related modules except for ref (#3455)
    registerRef(vnode)
    // make sure to invoke the insert hook
    insertedVnodeQueue.push(vnode)
  }
}
```

并且在执行 init 钩子函数的时候不会再执行组件的 mount 过程了, 这也就是被 `<keep-alive>` 包裹的组件在有缓存的时候就不会在执行组件的 created、mounted 等钩子函数的原因了

```js
const componentVNodeHooks = {
  init (vnode: VNodeWithData, hydrating: boolean): ?boolean {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      const mountedNode: any = vnode // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode)
    } else {
      const child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      )
      child.$mount(hydrating ? vnode.elm : undefined, hydrating)
    }
  },
  // ...
}
```

由于 ，所以可以执行到函数 `reactivateComponent`

```js
function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
  let i
  // hack for #4339: a reactivated component with inner transition
  // does not trigger because the inner node's created hooks are not called
  // again. It's not ideal to involve module-specific logic in here but
  // there doesn't seem to be a better way to do it.
  let innerNode = vnode
  while (innerNode.componentInstance) {
    innerNode = innerNode.componentInstance._vnode
    if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
      for (i = 0; i < cbs.activate.length; ++i) {
        cbs.activate[i](emptyNode, innerNode)
      }
      insertedVnodeQueue.push(innerNode)
      break
    }
  }
  // unlike a newly created component,
  // a reactivated keep-alive component doesn't insert itself
  insert(parentElm, vnode.elm, refElm)
}
```



## 生命周期


由于使用 `<keep-alive>` 包裹的元素，在再次渲染的时候并不会调用 `this.$mount` 函数, 所以不会执行 `created`, `mounted` 等钩子函数，但是有些业务还是希望在dom重新渲染的时候做一些事情，vue提供了一个生命周期，`activated`, 在源码上他是如何实现的呢？


在渲染的最后一步，会执行 `invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)` 函数执行 vnode 的 insert 钩子函数

```js

const componentVNodeHooks = {
  insert (vnode: MountedComponentVNode) {
    const { context, componentInstance } = vnode
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true
      callHook(componentInstance, 'mounted')
    }
    if (vnode.data.keepAlive) {
      // 如果被 <keep-alive> 包裹的组件已经 mounted,
      // todo: ??既然发生在渲染前，为什么会有已经 mounted,
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance)
      } else {
        activateChildComponent(componentInstance, true /* direct */)
      }
    }
  },
  // ...
}
```

如果被 <keep-alive> 包裹的组件没有 mounted, 则执行 activateChildComponent函数，该函数实际上是递归去执行它的所有子组件的 activated 钩子函数。


```js
export function activateChildComponent (vm: Component, direct?: boolean) {
  if (direct) {
    vm._directInactive = false
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false
    for (let i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i])
    }
    callHook(vm, 'activated')
  }
}
```


如果被 <keep-alive> 包裹的组件已经 mounted, 会执行 `queueActivatedComponent`, 他的逻辑是把当前 vm 实例添加到 activatedChildren 数组中，

```js
export function queueActivatedComponent (vm: Component) {
  vm._inactive = false
  activatedChildren.push(vm)
}
```


等所有的渲染完毕，在 nextTick后会执行 flushSchedulerQueue，这个时候就会执行：

```js
function flushSchedulerQueue () {
  // ...
  const activatedQueue = activatedChildren.slice()
  callActivatedHooks(activatedQueue)
  // ...
}

function callActivatedHooks (queue) {
  for (let i = 0; i < queue.length; i++) {
    queue[i]._inactive = true
    activateChildComponent(queue[i], true)  }
}
```


也就是遍历所有的 activatedChildren，执行 activateChildComponent 方法，通过队列调的方式就是把整个 activated 时机延后了。




有 activated 钩子函数，也就有对应的 deactivated 钩子函数，它是发生在 vnode 的 destory 钩子函数，定义在 src/core/vdom/create-component.js 中：

```js
const componentVNodeHooks = {
  destroy (vnode: MountedComponentVNode) {
    const { componentInstance } = vnode
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy()
      } else {
        deactivateChildComponent(componentInstance, true /* direct */)
      }
    }
  }
}
```

对于 `<keep-alive>` 包裹的组件而言，它会执行 `deactivateChildComponent(componentInstance, true)` 方法，定义在 src/core/instance/lifecycle.js 中：

```js
export function deactivateChildComponent (vm: Component, direct?: boolean) {
  if (direct) {
    vm._directInactive = true
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true
    for (let i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i])
    }
    callHook(vm, 'deactivated')
  }
}
```


和 activateChildComponent 方法类似，就是执行组件的 `deacitvated` 钩子函数，并且递归去执行它的所有子组件的 `deactivated` 钩子函数




但是在实际的开发场景中，像数据量比较大的 tab conent(比如指标库 tree, 其实 dom 节点比较多)， 我会使用 v-show 的方式来控制显隐，因为我感觉 keep-alive, 其实是把这些变量存储在内存中了，每次切换的时候，dom 其实都是重建的;
