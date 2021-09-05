# bind 的介绍



要想实现一个方法，首先要了解他的特性, bind方法有两个特性：

## 1. bind可以对函数的this指针进行显式绑定

```js
const person = {
  name: "lixingjuan",
};

function sayName(greet) {
  console.log(`${greet},${this.name}`);
}

sayName.bind(person)("hello");

```

看另外一个例子，声明一个对象，拥有一个属性和一个方法

```js
const module = {
  x: 42,
  getX: function() {
    return this.x;
  }
};

```

如下的执行会输出 undefined, 因为 `getX` 方法执行时，他的this指向了全局作用域(浏览器window, node是global), 而全局并没有x属性，所以打印出 `undefined`

```js
const unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

```

如下的执行会输出 42， 因为 bind 将函数的 `unboundGetX` 的this指向bind的第一个参数，即module对象


```js

const boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// expected output: 42
```


## 2. 当bind返回的函数被使用new操作符调用时，bind被指定的this指向就会失效

如下代码，instance1.job会输出undefined, 因为对他来说，this是执行全局作用域的
instance1.description会打印"我可以向你的职业打招呼" 这句话，因为在执行new操作符的时候，this执行实例，所以instance1上拥有属性description

```js
const tempObj = {
  job: "programmer",
};

function sayName(greet) {
  this.description = "我可以向你的职业打招呼";
  return `${greet},${this.job}`;
}

const bindName = sayName.bind(tempObj, "hello");
const instance1 = new bindName();

console.log(instance1.job);
console.log(instance1.description);
```






## bind 实现普通的函数柯里化


> bind()函数可以使一个函数拥有预设的初始参数，当绑定函数被调用时，这些参数会被插入到目标函数的参数列表的开始位置
> 利用该特性，可以实现一个函数柯里化



```javascript
const demoFunc = function (disCount, val) {
  console.log(val * disCount);
};

const disCountFunc = demoFunc.bind(this, 0.3);
disCountFunc(100);
disCountFunc(200);
```




# 手写 bind

首先回顾下 bind 的特点

1. 返回一个新函数；
2. 参数 1 为要绑定 this 的对象，参数 2 作为新函数的参数；
3. 可以使用 new 操作符，创建 bind 返回的新函数的实例，此时传入的 this 失效；



```js
Function.prototype.bind2 = function (context, ...args) {
  if (typeof this !== "function") {
    throw TypeError("bind can only be used on function!");
  }

  // 保存父作用域的this指向只是为了后面判断，bind返回的函数是否被用了new 调用
  const _self = this;
  const fNOP = function () {};

  const bound = function (...innerArgs) {
    const isUesdByNew = this instanceof _self;

    // 如果被new调用，则this指向不变
    const newThis = isUesdByNew ? this : context;

    return _self.apply(newThis, [...args, ...innerArgs]);
  };

  fNOP.prototype = this.prototype;
  bound.prototype = new fNOP();
  return bound;
};

```

## 手写 bind2: 使用基本类型的扩充基本类型的扩充

```javascript
Function.prototype.method = function (name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
  return this;
};

Function.method("bind2", function (context, ...args) {
  return () => {
    this.apply(context, args);
  };
});
```

# 参考文章

1. 《javascript 高级程序设计-高级技巧》(第 5 章-Function 类型)
2. call,apply-MDN
3. 《JavaScript 语言精粹-第四章-扩充基本类型的功能》
4. [掘金-JavaScript 深入之 bind 的模拟实现](https://juejin.cn/post/6844903476623835149)
