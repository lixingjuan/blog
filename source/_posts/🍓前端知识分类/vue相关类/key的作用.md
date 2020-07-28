## vue/react 的key的作用

渲染真实DOM的开销非常大，当我们修改了某个元素，如果直接渲染到DOM上，会引起整个DOM树的重绘和重排，

而diff算法，可以帮助我们只更新那一小块DOM，而不是更新整个DOM

diff算法会根据真实DOM生成一棵 virtual DOM , 当virtual DOM某个节点的数据改变后，会生成一棵新的VNode, 
然后VNode 和 old VNode 做对比，发现不一样的地方就直接修改在真实DOM上（即调用patch算法，一边比较一边给真实DOM打补丁）

2. virtual DOM 和真实DOM的区别？

```js
/* 真实DOM */
<div>
    <span>
        222
    </span>
</div>
```

```js
/* VNode (伪代码) */
var Vnode = {
    tag: 'div',
    children: {
        tag: 'span',
        text: '222'
    }
}
```

3. vue和react 都是采用diff算法来对比新旧虚拟节点，从而更新节点。在vue的diff函数中，在交叉对比中，当新节点和就节点头尾交叉对比没有结果时，会根据新节点的key去对比旧节点数组中的key，从而找到相应旧节点。 如果没找到就认为是新增节点。而如果没有key, 就会采用遍历查找的方式去找到对应的旧节点。相比而言，map映射的速度更快；



> key 可以给每一个vnode一个唯一id, 可以使 diff算法 **更快、更准确** 的拿到oldVnode 中的对应的 vnode 节点；

1. 更准确：
   带key 就不是就地复用了， 在sameNode函数中， `a.key === b.key` 对比中可以避免就地复用的情况。所以会更加准确；
2. 更快：
   利用key的唯一性生成map对象来获取对应节点，比遍历更快；



```js
// vue项目  src/core/vdom/patch.js  -488行
// 以下是为了阅读性进行格式化后的代码

// oldCh 是一个旧虚拟节点数组
if (isUndef(oldKeyToIdx)) {
  oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
}
if(isDef(newStartVnode.key)) {
  // map 方式获取
  idxInOld = oldKeyToIdx[newStartVnode.key]
} else {
  // 遍历方式获取
  idxInOld = findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
}

```

创建map函数

```js

function createKeyToOldIdx (children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) map[key] = i
  }
  return map
}
```


遍历查找

```js
// sameVnode 是对比新旧节点是否相同的函数
 function findIdxInOld (node, oldCh, start, end) {
    for (let i = start; i < end; i++) {
      const c = oldCh[i]
      
      if (isDef(c) && sameVnode(node, c)) return i
    }
  }
```



<!-- 首先要理解vue框架使用的diff算法， -->


1. [写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/1)


