# createComponent

createComponent 是实现组件化的关键

在分析createElement的实现的时候，最终会调用 _createElement 方法，其中有一段逻辑是对参数tag的判断=> 
1. 如果一个普通的html标签, (如 div), 则会实例化一个普通的VNode节点;
2. 如果不是，则通过 createComponent 方法创建一个组件 VNode;

主要代码如下

```js
if (typeof tag === "string") {
  let Ctor; // Ctor是一个构造器
  
  ns = (context.$vnode && context.$vnode.ns) || config.getTagNamesapce(tag);
  // 对标签的一些处理
  if (config.isReserveTag(tag)) {
    // ......
  } else if (isDef((Ctor = resolveAsset(context.$options, "components", tag)))) {
    // ......
  } else {
    // ......
  }
} else {
  // SEE-HERE:direct component options / contructor 如果是组件
  vnode = createComponent(tag, data, context, children);
}
```

这里传入的App，本质上是一个Component类型，那么他会走到else逻辑，直接通过createComponent方法来创建 vnode；

接下来看一下createComponent方法的实现，他定义在 `src/core/vdom/create-component.js`文件中

```js
function createComponent(
  Ctor: Class<Component> | Function | Object | vooid,
  data: ?VNodeData,
    context:Component,
  childrent: ?Array<VNode>,
  tag?:string
): Vnode | Array<VNode> | void {
  if (isUndef(Ctor)) { 
    return 
  }
  
  const baseCtor = context.$options._base

  // SEE-HERE:plain option object:turn it into a constructor p普通选项对象将其转换为构造函数
  if (isObject(Ctor)) { 
    Ctor = baseCtor.extend(Ctor)
  }

  // if at this stage it's not a constructor or an async componet factory 如果在此阶段他不是构造函数或者异步组件工厂，拒绝
  // reject 
  if (typeof Ctor !== 'function') { 
    if (process.env.NODE_ENV !== 'function') { 
      warn(`Invalid Component definition: ${String(Ctor)}`,context)
    }
    return 
  }

  // async component 异步组件 ？？是啥
  let asyncFactory
  if (isUndef(Ctor.cid)) { 
    asyncFactory = Ctor
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context)
    if (Ctor === undefined) { 
      // return a placeholde node for asnc component , which is rendered as a common node 返回异步组件的占位符节点，该节点呈现为公共节点
      // but preserves all the raw information for the node  但是保留该节点的所有原始信息
      // the information will be used for async server-rendering and hydration 该信息将用于异步服务器渲染和 hydration
      return createAsyncPlaceholder(asyncFactory,data,context,children,tag)
    }
  }

  data = data || {}

  // resolve constructor options in case global mixins are appliy after 解析构造函数选项，以防全局混合发生
  // component constructor creation 组件构造函数的创建
  // SEE-HERE:
  resolveConstructorOptions(Ctor)
  
  // transform component v-model data into props & events
  if (isDef(data.model)) { 
    transformModel(Ctor,options,data)
  }
  
  // extract props
  const porpsData = extractPropsFromVNodeData(data, Ctor, tag)
  
 // .......


 return node
}

```

组件渲染这个case 主要就三个关键步骤

## 构造子类构造函数

```js
const baseCtor = context.$options._base

// plain options object:true it into a constructor
if(isObject( Vtor )){
  Ctor = baseCtor.extend(Ctor)
}
```

我们在编写一个组件的时候，通常是创建一个普通对象

```js
import Helloworld from './components/HelloWord'

export default {   // export 的是一个对象
  name: 'app',
  components: {
    HelloWorld
  }
}
```

这里exprot 的是一个对象，所以createComponents里的代码逻辑会执行到 baseCtor.extend(Ctor), 在这里 baseCtor 实际上就是Vue, 这个的定义是在最开始初始化Vue的阶段， 在 `src/core/global-api/index.js` 中的initGlobalAPI 函数中有这么一段逻辑：

```js
// this is used to identify the "base" constructor to extend all plain-object 
// 这用于标示所有普通对象的基本构造函数
// components with in Weex's multi-instance scenarios.
// Weex的多实例场景中使用组件
Vue.option._base = Vue
```

虽然这里定义的 Vue.option , 而我们的createComponent 取得是 context.$option, 实际上在 `src/core/istance/init.js` 里的Vue原型上的_init 函数中有这么一段逻辑：

```js
vm.$option = mergeOptions(
  resolveConstructorOptions(vm.constructor),
  options || {},
  vm
)
```

这样就把Vue的一些 option 扩展到了 vm.$option 上，所以我们就能通过vm.$options._base 拿到Vue 这个构造函数了；
mergeOptions 的实现后面分析，现在只需要理解他的功能是吧Vue构造函数的options和用户传入的 options 做一层合并，到vm.$option 上；

在了解了baseCtor指向了Vue之后，再来看一下 Vue.extend 函数的定义：
(`src/core/global-api/extend.js`)

```js
/**
 * Class inheritance
 */
Vue.extend = function(extendOptions: Object): Function {
  extendOptions = extendOptions || {};
  const Super = this;
  const SuperId = Super.cid;
  const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
  
  // cid 是一个唯一标示，做判断，如果传入的对象之前传入过了，就直接把缓存的返回，省的再创建一遍
  if (cachedCtors[SuperId]) {
    return cachedCtors[SuperId];
  }

  const name = extendOptions.name || Super.options.name;
  if (process.env.NODE_ENV !== "production" && name) {
    validateComponentName(name);
  }

  const Sub = function VueComponent(options) {
    this._init(options);
  };
  Sub.prototype = Object.create(Super.prototype);
  Sub.prototype.constructor = Sub;
  Sub.cid = cid++;
  Sub.options = mergeOptions(Super.options, extendOptions);
  Sub["super"] = Super;

  // For props and computed properties, we define the proxy getters on
  // the Vue instances at extension time, on the extended prototype. This
  // avoids Object.defineProperty calls for each instance created.
  
  // 对于道具和计算属性，我们在上定义代理getter
  // 扩展原型上扩展时的Vue实例，
  // 这个避免为每个创建的实例调用Object.defineProperty
  if (Sub.options.props) {
    initProps(Sub);
  }
  if (Sub.options.computed) {
    initComputed(Sub);
  }

  // allow further extension/mixin/plugin usage
  // 允许进一步扩展/混合/插件使用 
  Sub.extend = Super.extend;
  Sub.mixin = Super.mixin;
  Sub.use = Super.use;

  // create asset registers, so extended classes
  // can have their private assets too.
  // 创建资产寄存器，因此扩展了类
  // 也可以拥有自己的私有资产。
  ASSET_TYPES.forEach(function(type) {
    Sub[type] = Super[type];
  });
  // enable recursive self-lookup
  if (name) {
    Sub.options.components[name] = Sub;
  }

  // keep a reference to the super options at extension time.
  // later at instantiation we can check if Super's options have
  // been updated.
  // 在扩展时保留对超级选项的引用。
  // 稍后在实例化时，我们可以检查Super的选项是否已更新
  Sub.superOptions = Super.options;
  Sub.extendOptions = extendOptions;
  Sub.sealedOptions = extend({}, Sub.options);

  // cache constructor
  cachedCtors[SuperId] = Sub;
  return Sub;
};

```

Vue.extend的作用就是构造一个Vue的子类，使用的是经典的原型继承的方式把一个纯对象转换为一个继承于 Vue 的构造起 sub 并返回，然后对 sub 这个对象本身扩展了一些属性，如扩展 options、 添加全局API等；并且对配置中的props和computed做了初始化工作；最后对这个Sub构造函数做了缓存，避免多次执行 Vue.extend的时候对同一个子组件重复构造；

这样当我们实例化 Sub 的时候， 就会执行 this._init 逻辑 再次走到了Vue实例化的初始化逻辑，实例化子组件的逻辑在之后的介绍；

```js
const Sub = function VueComponent ( options ){
  this._init(options)
}
```


## 安装组件钩子函数

```js
// 将钩子函数安装到占位符节点上
installComponentHooks(data)
```

Vue 参考开源库 snabbdom 的做法，snabbdom的一个特点是在 VNode 的patch 流程中对外暴露了各种时机的钩子函数，方便我们做一些额外的事情， Vue.js也是如此，在初始化一个 Component 类型的过程中实现了几个钩子函数：

```js

```


整个 installComponentHooks 的过程就是把 componentVNodeHooks 的钩子函数合并到 data.hook 中，在 VNode 执行patch的过程中执行相关的钩子函数（具体的执行见patch）,这里要注意的是合并策略， 在合并的过程中，如果某个时机的钩子已经存在data.hook中，那么通过mergeHook函数做合并，这个逻辑很简单，就是在最终执行的时候，依次执行这两个钩子函数即可；


## 实例化 VNode

```js
const name = Ctor.options.name || tag
const vnode = new VNode(
  `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
  data, undefined, undefined, undefined, context,
  { Ctor, propsData, listeners, tag, children },
  asyncFactory
)

return vnode
```

最后一步非常简单，通过 new VNode 实例化一个 vnode并返回；
需要注意的是和普通元素节点的 vnode 不同，组件的 vnode 是没有children 的，这点很关键，（见之后patch过程）


## 总结

学习了 createComponent的实现，了解他渲染一个组件的三个关键逻辑：

1. 构建子类构造函数；
2. 安装组件钩子函数；
3. 实例化 vnode;

createComponent 之后返回的是组件的 vnode, 他一样也会走到 vm._update方法，进而执行patch函数
