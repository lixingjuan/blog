

# Proxy 

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改, 
可以理解为，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

用法：
`const proxyInstance = new Proxy(target, handler)`

作为构造函数，Proxy接受两个参数
参数1: 所要代理的目标对象
参数2: 配置对象，对于每一个被代理的操作，需要提供一个对象的处理函数，该函数将拦截对象的操作
`handler`  参数也是一个对象，用来定制拦截行为

```js
var proxy = new Proxy({},
  {
    get: function(target, propKey) {
      console.log("target", target);
      console.log("propKey", propKey);
      return 35; // ✨即，所有的 取值 操作均返回 35
    }
  }
);

proxy.time; 
// target {}
// propKey time
// 35
proxy.name;  
// target {}
// propKey name
// 35
proxy.title;  
// target {}
// propKey title
// 35
```


# Proxy 实例也可以作为其他对象的原型对象

```js
var proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
});

let obj = Object.create(proxy);
obj.time // 35
```

# handler可设置的拦截属性

## get()
## has()

拦截 `HasProperty` 操作, 即判断对象是否具有某个属性时生效；
has() 方法接受两个参数：目标对象、需查询的属性名

典型的用途是使用 has() 方法隐藏某些属性，不被`in` 操作符发现

⭐︎ in 
```js
/* 对对象使用in操作符 */
const obj = { name: "小李" };
console.log("name" in obj); // true

/* 对proxy使用in操作符 */
const target = { name: "小李" };
const handler = {
  has(target, key) {
    console.log(key);
    if (key === "name") {
      return false;
    }
  }
};
const proxyInstance = new Proxy(target, handler);
console.log("name" in proxyInstance); // false
```


⭐︎ 虽然 `for...in`循环也用到了 `in` 操作符，但是 `has()` 方法对 `for...in` 不生效

```js
const target = { name: "小李", age: 22 };
const handler = {
  has() {
    console.log("has()属性拦截到"); // ⭐︎ 这行代码并没有执行
  }
};
const proxyInstance = new Proxy(target, handler);

for (const key in proxyInstance) {
  console.log("res", key);
}
// res name
// res age

```

# 疑问🤔️

```js
const arr = [1, 2, 3]
const handler = {
  get() {
    console.log("get");
  },
  set() {
    console.log("set");
  }
};


const proxyInstance = new Proxy(arr, handler);


proxyInstance.push();

// ？？  proxyInstance.push is not a function
```

为什么不能使用push方法呢？


因为 执行`set` 方法的时候会访问 `get` 方法，而 `get` 方法没有正确的 `return` 出值