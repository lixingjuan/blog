nextTick 是 Vue 一个比较核心的实现

# JS 运行机制

详见
1. [EventLoop](https://lixingjuan.github.io/Blog/%F0%9F%8D%93%E5%89%8D%E7%AB%AF%E7%9F%A5%E8%AF%86%E5%88%86%E7%B1%BB/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9B%B8%E5%85%B3%E7%B1%BB/EventLoop/)
2. [异步函数的执行顺序问题](https://lixingjuan.github.io/Blog/%F0%9F%8D%93%E5%89%8D%E7%AB%AF%E7%9F%A5%E8%AF%86%E5%88%86%E7%B1%BB/JS%E7%9B%B8%E5%85%B3%E7%B1%BB/%E5%BC%82%E6%AD%A5%E5%87%BD%E6%95%B0%E7%9A%84%E6%89%A7%E8%A1%8C%E9%A1%BA%E5%BA%8F%E9%97%AE%E9%A2%98/)




# nextTick

next-tick.js 声明了 microTimerFunc 和 macroTimerFunc 2 个变量，它们分别对应的是 micro task 的函数和 macro task 的函数。
对于 macro task 的实现，优先检测是否支持原生 setImmediate, 这是一个高版本 IE 和 Edge 才支持的特性，不支持的话再去检测是否支持原生的  MessageChannel, 如果也不支持的话就会降级为 setTimeout 0;
而对于 micro task 的实现，则检测浏览器是否原生支持 Promise，不支持的话直接指向 macro task 的实现;


`next-tick.js` 对外暴露了 2 个函数，先来看 `nextTick`, 即上一节派发更新中用到的函数  `nextTick(flushSchedulerQueue)` 所用到的函数。 
next-tick的实现逻辑也很简单，把传入的回调函数 cb 压入 `callbacks` 数组, 最后一次性地根据 useMacroTask 条件执行 `macroTimerFunc` 或者是 `microTimerFunc`, 而他们呢都会在下一个 tick 执行 flushCallbacks, flushCallbacks 的逻辑非常简单，对 callbacks 遍历，然后执行相应的回调函数。



**为什么接连多次修改DOM，但是并不会引起重复渲染？**

这里使用 `callbacks` 而不是直接在 nextTick 中执行回调函数的原因是 ==保证在同一个tick内多次执行 nextTick==, 不会开启多个异步任务，而是==把这些异步任务异步任务都压缩成一个同步任务==，在一个tick中执行完毕



nextTick 最后还有一段逻辑：

```js
if(!cd && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
        _resolve = resolve
    })
}
```
这是当 nextTick 不传cd 参数的时候，提供一个 Promise 化的调用，比如

```js
nextTick().then(() => {})
```

当 _resolve 函数执行的时候，就会跳到 then 的逻辑中；


next-tick.js 还对外暴露了 withMacroTask  函数，它是对函数做一层包装，确保函数执行过程中对数据任意的修改，触发变化执行 nextTick 的时候强制走 macroTimerFunc。比如一些DOM的交互事件，如v-on绑定的事件回调函数的处理，会强制走 macro task




# 总结

通过这一节对 nextTick 的分析，并结合上一节的 setter 分析，我们了解到 ==数据的变化到 DOM 的重新渲染是一个异步过程== ，发生在下一个 tick。
这就是为什么我们平时在开发的过程中，比如从服务端接口去获取数据的时候，数据做了修改，如果我们的某些方法去依赖了数据修改后的 DOM 变化，我们就必须这么写：

```js
getData().then(res => {
    this.listData = res.data
    this.$nextTick(()=>{
        // 在这里操作DOM
    })
})
```

Vue.js 提供了 2 种调用 nextTick 的方式:
- 一种是全局 API  Vue.nextTick ;
- 一种是实例上的方法 vm.$nextTick ;
无论我们使用哪一种，最后都是调用 `next-tick.js`  中实现的 nextTick 方法
