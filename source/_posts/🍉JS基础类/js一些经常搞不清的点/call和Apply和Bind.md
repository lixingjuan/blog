
# call apply Bind 🌨


## call 和 apply 
1. 介绍
   - 在你指定的作用域中调用函数
   - 实际上等于设置函数体内 `this` 的值
   - 非继承而来的方法
2. 作用
   - 扩充函数的作用 eg.1
   - 更方便的传递参数 eg.2
3. apply参数
   - 参数1: 在其中运行函数的作用域
   - 参数2: 参数数组（类数组对象）
4. call参数
   - 参数1: 在其中运行函数的作用域
   - 参数2: 一堆参数排排站
5. 区别
   - 参数2不同
6. 优点
   - 对象不需要和方法有任何的耦合关系，我们之前经常写例如 eg 这种，再通过 `p` 去调用他
7. 代码作用举例

```javascript
/* eg */
const p = {
  color: "red",
  sayColor: function() {
    console.log(this.color);
  }
};
p.sayColor();

/* eg.1 作用1：扩充作用域 */
global.name = "hahahh";
const a = {
  name: "lilili"
};
const b = {
  name: "xingxing"
};
function sayName() {
  console.log(this.name);
}
sayName();  // 'hahahh'
sayName.call(a);  // 'lilili'
sayName.call(b);  // 'xingxing'

// 运行sayColor.call(a)的时候，函数的执行环境变了，因为此时函数体内的this对象指向了a 


/* eg.2 作用2: 更方便的传递参数 */
function sum(a, b) {
  return a + b;
}
function callSum(c, d) {
  // 因为是在全局作用域调用的，this是window(node是global)
  return sum.call(this, c, d);  
}
function applySum1() {
  return sum.apply(this, arguments);
}
function applySum2(c, d) {
  return sum.apply(this, [c, d]);
}


console.log(callSum(1, 2));  // 3
console.log(applySum1(1, 2)); // 3
console.log(applySum2(1, 2));  // 3
 


```
7. 实际应用举例

```javascript
/* eg.1 使用apply展开数组 */
function foo(...args) {
  console.log(...args);
}
foo.apply(null, [2, 3, 4, [5]]);  // 2 3 4 [ 5 ]




/* eg.2 通过apply 扩展,使得Math.max可以接收数组作为参数 */
Math.max(1, 2, 3);
Math.max.apply(this, [1, 2, 3]);


```




## bind
- bind方法创建一个新的函数，在bind方法被调用时， `bind`的第一个参数对象被指定为这个新函数的`this` 的绑定对象，而其余参数作为新函数的参数，供调用时使用

1. 举例

```javascript

/* eg1. 改变函数的执行作用域 */
global.color = "red";
let o = { color: "blue" };

function sayColor() {
  return this.color;
}
sayColor();  // 'red'
sayColor.bind(o)();  // 'blue'



/* eg2. bind() 传递参数 */
const foo = {
  value: 1
};
const demo = function(name, age) {
  console.log(this.value);  // 1
  console.log(this.name);   // undefined
  console.log(name);        // "nametest"
  console.log(age);         // 19
};
demo.bind(foo, "nametest")(19);

```

> 一个绑定函数也能使用new操作符创建对象，这种行为就像把原函数当作构造器，提供的this值被忽略，同时调用时的参数被当作模拟函数

- 也就是说，当bind返回的函数当作构造函数的时候，bind时指定的this值会失效，但传入的参数依然生效

```javascript
const foo = {
  value: 1
};

function demo(name, age) {
  this.job = "programmer";
  console.log(this.value);   // undefined
  console.log(name);         // "nameTest2"
  console.log(age);          // 19
}
demo.prototype.friend = "huahua";

const bindName = demo.bind(foo, "nameTest2");
const newDemo = new bindName(18); 

console.log(newDemo.friend);  // "huahua"
console.log(newDemo.job);     // "programmer"

```
使用的new操作符之后，绑定的this已经失效，此时的this指向`bindName`,




### bind实现普通的函数柯里化
 
- 因为`bind` 可以返回一个新的函数，并且新函数的第一个参数对象被指定为新函数的`this` 绑定对象，所以`bind`可以对参数柯里化
  
```javascript
function foo(...args) {
  console.log(...args);
}

// 使用bind(...)进行柯里化
var bar = foo.bind(null, 0);
bar(1, 2, 3, 4); // 0,1,2,3,4
```


### 手写bind: 使用基本类型的扩充实现bind

```javascript
Function.prototype.method = function(name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
  return this;
};

Function.method("bind2", function(context, ...args) {
  // 这里this 指向 sayName
  this.apply(context, args);
});

const person = {
  name: "hong",
  sayName: function() {
    console.log(this.name);
  }
};
global.name = "ming";

person.sayName(); // "hong"
person.sayName.bind2(null, 2); // "ming"
```



### 手写bind: 函数柯里化实现一个bind

- 其实bind就是把this 绑定到传入的对象上

```javascript
Function.prototype.bind2 = function(context) {
  // 如果使用bind的不是函数就抛出错误
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var fNOP = function() {};

  var fbound = function() {
    // 当作为构造函数时，this 指向实例，self 指向绑定函数，因为下面一句 `fbound.prototype = this.prototype;`，已经修改了 fbound.prototype 为 绑定函数的 prototype，此时结果为 true，当结果为 true 的时候，this 指向实例。
    // 当作为普通函数时，this 指向 window，self 指向绑定函数，此时结果为 false，当结果为 false 的时候，this 指向绑定的 context。
    self.apply(
      this instanceof self ? this : context,
      args.concat(Array.prototype.slice.call(arguments))
    );
  };

  fNOP.prototype = this.prototype;
  // 如果直接修改fbound 的prototype 也会直接修改函数的prototype, 这时可以使用空函数进行中转
  fbound.prototype = new fNOP();

  return fbound;
};
```






- [《javascript高级程序设计-高级技巧》(第5章-Function类型)]
- [call,apply-MDN]
- [《JavaScript语言精粹-第四章-扩充基本类型的功能》]
- [掘金-JavaScript深入之bind的模拟实现](https://juejin.im/post/59093b1fa0bb9f006517b906)