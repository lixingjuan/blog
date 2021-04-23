<iframe src="https://9sqsz.csb.app/"></iframe>


本质是vue实现的组件，使用了render函数，
定义两个 data变量，keys 和 cache ,
获取到 this.$slot.default (即放在<keep-alive>获取到的是此处的vnode</keep-alive>)
判断 this.keys 中是否已经缓存过改组件

this.$slot.default 和 prop.children 感觉是担任相同的责任，都是虚拟dom, 只不过结构不同

```js
render() {
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
```