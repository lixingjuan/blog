

# computed

计算属性的初始化是发生在 Vue 实例初始化阶段的 initState 函数中，执行了 
`if (opts.computed) initComputed(vm, opts.computed)`


```js
/* src/core/instance/state.js */

const computedWatcherOptions = { lazy: true }

function initComputed (vm: Component, computed: Object) {
  // $flow-disable-line
  const watchers = vm._computedWatchers = Object.create(null)
  // computed properties are just getters during SSR
  const isSSR = isServerRendering()

  for (const key in computed) {
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        `Getter is missing for computed property "${key}".`,
        vm
      )
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      )
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm)
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm)
      }
    }
  }
}

```

函数首先创建 `vm._computedWatchers` 为一个空对象，接着对 computed 对象做遍历，拿到计算属性的每一个 userDef, 然后尝试获取这个 userDef 对应的 getter 函数, 拿不到则在开发环境下报警告。接下来为每一个 getter 创建一个 watcher, 这个 watcher 和渲染 watcher 有一点很大的不同，它是一个 computed watcher, 因为 `const computedWatcherOptions = { computed: true }`
(computed watcher 和普通 watcher 的差别后面介绍)
最后对判断如果 key 不是 vm 的属性，则调用 `defineComputed(vm, key, userDef)`，否则判断计算属性对于的 key 是否已经被 data 或者 prop 所占用，如果是的话则在开发环境报相应的警告

那么接下来需要重点关注 defineComputed 的实现

```js
/* src/core/instance/state.js */
export function defineComputed (
  target: any,
  key: string,
  userDef: Object | Function
) {
  const shouldCache = !isServerRendering()
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef)
    sharedPropertyDefinition.set = noop
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop
    sharedPropertyDefinition.set = userDef.set || noop
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        `Computed property "${key}" was assigned to but it has no setter.`,
        this
      )
    }
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

```


这段逻辑其实就是利用 Object.defineProperty 给计算属性对应的 key 值添加 getter 和 setter, setter 通常是计算属性是一个对象，并且拥有 set 方法的时候才有，否则是一个空函数。在平时的开发场景中，计算属性有 setter 的情况比较少，我们重点关注一下 getter 部分，缓存的配置也先忽略，最终 getter 对应的是 createComputedGetter(key) 的返回值，来看一下它的定义：


```js
/* src/core/instance/state.js */
function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate()
      }
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}
```


createComputedGetter 返回一个函数 computedGetter，它就是计算属性对应的 getter, 整个计算属性的初始化过程到此结束;

我们知道计算属性是一个 computed watcher，它和普通的 watcher 有什么区别呢，为了更加直观，接下来来我们来通过一个例子来分析 computed watcher 的实现:

```js

```



# watche

侦听属性的初始化也是发生在 Vue 的实例初始化阶段的 initState 函数中，在 computed 初始化之后，执行了

```js
if (opts.watch && opts.watch !== nativeWatch) {
  initWatch(vm, opts.watch)
}
```

initWatch 的实现

```js
function initWatch (vm: Component, watch: Object) {
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}
```

这里就是对 watch 对象做遍历，拿到每一个 handler，因为 Vue 是支持 watch 的同一个 key 对应多个 handler，所以如果 handler 是一个数组，则遍历这个数组，调用 createWatcher 方法，否则直接调用 createWatcher：

```js
function createWatcher (
  vm: Component,
  expOrFn: string | Function,
  handler: any,
  options?: Object
) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(expOrFn, handler, options)
}
```

也就是说，侦听属性 watch 最终会调用 $watch 方法，这个方法首先判断 cb 如果是一个对象，则调用 createWatcher 方法，这是因为 $watch 方法是用户可以直接调用的，它可以传递一个对象，也可以传递函数
接着执行 const watcher = new Watcher(vm, expOrFn, cb, options) 实例化了一个 watcher，这里需要注意一点这是一个 user watcher，因为 options.user = true
通过实例化 watcher 的方式，一旦我们 watch 的数据发送变化，它最终会执行 watcher 的 run 方法，执行回调函数 cb，并且如果我们设置了 immediate 为 true，则直接会执行回调函数 cb
最后返回了一个 unwatchFn 方法，它会调用 teardown 方法去移除这个 watcher



所以本质上侦听属性也是基于 Watcher 实现的，它是一个 user watcher。其实 Watcher 支持了不同的类型，下面我们梳理一下它有哪些类型以及它们的作用:

## Watcher options

Watcher 的构造函数对 options 做的了处理，代码如下

```js
if (options) {
  this.deep = !!options.deep
  this.user = !!options.user
  this.computed = !!options.computed
  this.sync = !!options.sync
  // ...
} else {
  this.deep = this.user = this.computed = this.sync = false
}
```

所以 watcher 总共有 4 种类型，我们来一一分析它们，看看不同的类型执行的逻辑有哪些差别

### deep watcher

通常，如果我们想对一下对象做深度观测的时候，需要设置这个属性为 true，考虑到这种情况

```js
var vm = new Vue({
  data() {
    a: {
      b: 1
    }
  },
  watch: {
    a: {
      handler(newVal) {
        console.log(newVal)
      }
    }
  }
})
vm.a.b = 2
```

这个时候是不会 log 任何数据的，因为我们是 watch 了 a 对象，只触发了 a 的 getter，并没有触发 a.b 的 getter，所以并没有订阅它的变化，导致我们对 vm.a.b = 2 赋值的时候，虽然触发了 setter，但没有可通知的对象，所以也并不会触发 watch 的回调函数了

```js
watch: {
  a: {
+   deep: true,
    handler(newVal) {
      console.log(newVal)
    }
  }
}
```

加上 deep: true，这样就创建了一个 deep watcher 了，就可以观测到这个变化了
在 watcher 执行 get 求值的过程中有一段逻辑


```js
get() {
  let value = this.getter.call(vm, vm)
  // ...
  if (this.deep) {
    traverse(value)
  }
}
```


在对 watch 的表达式或者函数求值后，会调用 traverse 函数

traverse 的逻辑也很简单，它实际上就是对一个对象做深层递归遍历，因为遍历过程中就是对一个子对象的访问，会触发它们的 getter 过程，这样就可以收集到依赖，也就是订阅它们变化的 watcher，这个函数实现还有一个小的优化，遍历过程中会把子响应式对象通过它们的 dep id 记录到 seenObjects，避免以后重复访问


那么在执行了 traverse 后，我们再对 watch 的对象内部任何一个值做修改，也会调用 watcher 的回调函数了

对 deep watcher 的理解非常重要，今后工作中如果大家观测了一个复杂对象，并且会改变对象内部深层某个值的时候也希望触发回调，一定要设置 deep 为 true，但是因为设置了 deep 后会执行 traverse 函数，会有一定的性能开销，所以一定要根据应用场景权衡是否要开启这个配置