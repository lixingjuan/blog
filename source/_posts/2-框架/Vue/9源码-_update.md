# _update

`_update` 方法的主要作用就是将 VNode 渲染为真实 DOM，定义在 `src/core/instance/lifecycle.js` 中；
`_update` 是vue 实例的一个私有方法，他被调用的时机有两个：
1. 一个是首次渲染；
2. 另一个是数据更新的时候；(响应式原理)

## 主要代码

`_update` 的主要代码如下

```js
/* _update */
Vue.prototype._update = function(vnode: VNode, hydrating?: boolean) {
  const vm: Component = this;
  const pervE1 = vm.$el;
  const prevVnode = vm._vnode;
  const pervActiveInstance = activeInstance;
  activeInstance = vm;
  vm._vnode = vnode;
  // Vue.prototype._patch_ is injected inentry points 被注入入口
  // based on the rendering backend used 基于使用的渲染后端
  if (!prevVnode) {
    // 初始化渲染
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
  } else {
    // updates
    vm.$el = vm.__patch__(prevVnode, vnode);
  }
  activeInstance = pervActiveInstance;
  // update __vue__ reference

  // ?? 判断的是？
  if (prevE1) {
    pervE1.__vue__ = null;
  }
  // ?? 判断的是？
  if (vm.$el) {
    vm.$el.__vue__ = vm;
  }

  // 如果父元素是HOC, 则也要更新他的 $el
  if (vm.$vnode && vm.parent && vm.$vnode === vm.$parent._vnode) {
    vm.$parent.$el = vm.$el;
  }
  // updated hook is called by the scheduler to ensure that children are
  // updated in a parent's updated hook.
  // 调用进程将调用更新的钩子，以便子进程在父母的更新钩子中更新
};

```


## `__patch__`

_update 的核心就是调用 `vm.__patch__` 方法 , 这个方法实际上在不同的平台上的定义是不一样的，比如web和weex，所以在web平台他的定义是在 `platforms/web/runtime/index.js` 中；

`Vue.prototype.__patch__ = inBrower ? patch :noop$$`

可以看到，甚至在web 平台上，是否是服务端渲染也会对该方法产生影响：
1. 在服务端渲染，没有真实的浏览器DOM环境，所以不需要把 VNode 最终转换为DOM，因此是一个空函数；
2. 在浏览器端，他指向了patch方法；(定义在 `src/platforms/web/runtime/patch.js`中，如下所示)

```js
import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import baseModules fomr 'core/vdom/modules/index' // 用于处理DOM上的 class、id、props等属性
import { platformModules } from "web/runtime/modules/index";

// the directive module should be applied last, after all built-in modules have been applied
// 在应用了所有内置模块后，应最后应用指令模块
const modules = platformModules.concat(baseModules)

export const patch: Function = createPatchFunction({nodeOps, modules})
```

该方法实际上是调用 `createPatchFunction` 方法的返回值，这里传入了一个对象，包含nodeOps参数 和 modules 参数；
其中，nodeOps 封装了一系列DOM操作的方法；
modules定义了一些模块的钩子函数的实现；

看一下总的实现 =>

```js
const hooks = ["create", "activate", "update", "remove", "destory"];

export function createPathFunction(backend) {
  let i, j;
  const cbs = {};

  const { modules, nodeOps } = backend
  
  // 该处理是为了在不同阶段执行不同的钩子
  for ( i = 0; i < hooks.length; ++i) {
    if (j = 0; j < modules.length; ++j) { 
      if (isDef(modules[j][hooks[i]])) { 
        cbs[hooks[i]].push(modules[j][hooks[i]])
      }
    }
  }

  // ..............

  return function patch(oldVnode, vnode, hydrating, removeOnly) { 
    if (isUndef(vnode)) { 
      if (ifDef(oldVnode)) { 
        invokeDestoryHook(oldVnode) // 调用销毁钩子
        return 
      }
    }

    let isInitialPatch = false
    const insertedVnodeQueue = []

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true
      createElm(vnode, insertedVnodeQueue)
    } else { 
      const isRealElement = isDef(oldVnode, nodeType)
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node 
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly)
      } else { 
        
      }
    }
  }
}

```

 


真实的插入DOM主要靠的就是 `insert` 方法
先插入子结点 createChildren
再插入父节点 createElement
最后挂载真实的DOM上
（创建一个DOM(如app),然后替换原来的DOM(app)）