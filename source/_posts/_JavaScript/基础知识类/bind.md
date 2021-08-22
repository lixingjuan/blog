# 1. bind 的介绍

> 1. bind 方法会创建一个新的函数，在 bind 被调用时， 这个新函数的 this 会被指定为 `bind的第一个参数`，而其余参数将作为新函数的参数，供调用时使用;
> 2. 返回的是一个原函数的拷贝，并拥有 `指定的this值` 和 `初始参数`;
> 3. 绑定函数自动适应于使用 new 操作符去构造一个由目标函数创建的新实例。当一个绑定函数是用来构建一个值的，原来提供的 this 就会被忽略。不过提供的参数列表仍然会插入到构造函数调用时的参数列表之前。

<hr/>







## 1.1. 应用举例 1

```js
const a = {
  color: "red",
};
global.color = "yellow";

function sayColor() {
  console.log(this.color);
}

sayColor.bind(null)(); // "yellow";
sayColor.bind(a)(); // "red"
```




## 1.1. 应用举例 1

**改变函数的执行作用域**

bind()  函数使得我们可以创建一个函数，不论怎么调用，这个函数都有相同的 this




```javascript
global.color = "red"; // 浏览器环境则为window
const blueObj = { color: "blue" };
const pinkObj = { color: "pink" };
const blackObj = { color: "black" };

function sayColor() {
  console.log(this.color);
}

sayColor(); // 'red'
sayColor.bind(blueObj)(); // 'blue'
pinkObj.sayColor = sayColor;
pinkObj.sayColor(); // pink, 此时this指向pinkObj
pinkObj.sayColor.bind(blackObj)(); // "black", 此时sayColor的this指向 blackObj
```

## 1.2. 应用举例 2

**bind() 传递参数**

```javascript
const obj = { color: "red" };
const sayMessage = (name, age, sex) => {
  console.log(name);
  console.log(age);
  console.log(sex);
};
sayMessage.bind(obj, 2, 3, 4, 5, 6)(7); // 2,3,4
```




## 1.3. 应用举例 3: new

> 一个绑定函数也能使用 new 操作符创建对象，这种行为就像把原函数当作构造器，提供的 this 值被忽略，同时调用时的参数被当作模拟函数

也就是说，当 bind 返回的函数当作构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效



```javascript
const foo = {
  value: 1,
};

function demo(name, age) {
  this.job = "programmer";
  console.log(this.value); // undefined
  console.log(name); // "nameTest2"
  console.log(age); // 19
}

demo.prototype.friend = "huahua";

const bindName = demo.bind(foo, "nameTest2");
const newDemo = new bindName(18);

console.log(newDemo.friend); // "huahua"
console.log(newDemo.job); // "programmer"
```

使用的 new 操作符之后，绑定的 this 已经失效，此时的 this 指向`bindName`,

## 1.4. 应用举例 4: bind 实现普通的函数柯里化

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




# 2. 手写 bind

首先回顾下 bind 的特点

1. 返回一个新函数；
2. 参数 1 为要绑定 this 的对象，参数 2 作为新函数的参数；
3. 可以使用 new 操作符，创建 bind 返回的新函数的实例，此时传入的 this 失效；



```js
Function.prototype.bind2 = function (context, ...args) {
  // 如果被应用的不是函数，则报错
  if (typeof this !== "function") {
    throw new Error("bind2只能在函数上使用");
  }

  // 保存当前的 this
  const self = this;

  // 创建一个新函数
  const fNOP = function () {};

  const bound = function (...innerArgs) {
    // 作为构造函数使用时，this指向创建的实例，即 this instanceof self === true
    const isUsedByNew = this instanceof self;
    /**
     * bind的特性，
     * 1. 若作为构造函数，则忽略传进来的this指向，不需要修改this
     * 2. 若作为普通函数，则修改this指向传入的上下文
     */
    const newThis = isUsedByNew ? this : context;
    // 使用apply 函数修改this指向, 并传入参数
    return self.apply(newThis, [...args, ...innerArgs]);
  };

  // ？？ 为什么要做这一步？bound本身不就已经是函数了么？
  // 如果直接修改bound 的prototype 也会直接修改函数的prototype, 所以使用空函数进行中转
  fNOP.prototype = this.prototype;
  bound.prototype = new fNOP();

  return bound;
};
```

## 2.1. 手写 bind2: 使用基本类型的扩充基本类型的扩充

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

# 3. 参考文章

1. 《javascript 高级程序设计-高级技巧》(第 5 章-Function 类型)
2. call,apply-MDN
3. 《JavaScript 语言精粹-第四章-扩充基本类型的功能》
4. [掘金-JavaScript 深入之 bind 的模拟实现](https://juejin.cn/post/6844903476623835149)
