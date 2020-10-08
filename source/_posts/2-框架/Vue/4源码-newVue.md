# new Vue 发生了什么

首先看下Vue构造函数

```js
/* src/core/instance/index.js  */
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
```


`this._init` 方法在定义在 `initMixin` 中


```js
/* src/core/instance/init.js */
export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    // ......

    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }

    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    // ......
  }
}

```


Vue 初始化的过程做了几件事情，==合并配置==，==初始化生命周期==，==初始化事件中心，==初始化渲染==，==初始化 data、props、computed、watcher==等等

在初始化的最后，监测到如果有 el 属性，则调用 vm.$mount 方法挂载 vm, 挂载的目标就是把模版渲染成最终的DOM