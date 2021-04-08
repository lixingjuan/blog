# 1. bind

> bind方法创建一个新的函数，在bind方法被调用时， `bind`的第一个参数对象被指定为这个新函数的`this` 的绑定对象，而其余参数作为新函数的参数，供调用时使用


## 1.1. 应用举例1

==改变函数的执行作用域==

```javascript

global.color = "red";
let o = { color: "blue" };

function sayColor() {
  return this.color;
}


sayColor();  // 'red'
sayColor.bind(o)();  // 'blue'
```



## 1.2. 应用举例2


==bind() 传递参数==

```javascript
const foo = {
  value: 1
};

function demo(name, age) {
  console.log(this.value);  // 1
  console.log(this.name);   // undefined
  console.log(name);        // "nametest"
  console.log(age);         // 19
};

demo.bind(foo, "nametest")(19);
```

## 1.3. 应用举例3: new

> 一个绑定函数也能使用new操作符创建对象，这种行为就像把原函数当作构造器，提供的this值被忽略，同时调用时的参数被当作模拟函数

也就是说，当bind返回的函数当作构造函数的时候，bind时指定的this值会失效，但传入的参数依然生效


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






## 1.4. bind实现普通的函数柯里化

因为`bind` 可以返回一个新的函数，并且新函数的第一个参数对象被指定为新函数的`this` 绑定对象，所以`bind`可以对参数柯里化


```javascript
function foo(...args) {
  console.log(...args);
}

// 使用bind(...)进行柯里化
var bar = foo.bind(null, 0);
bar(1, 2, 3, 4); // 0,1,2,3,4
```







# 2. 手写bind




首先回顾下 bind 的特点

1. 返回一个新函数；
2. 参数1为要绑定this的对象，参数2作为新函数的参数；
3. 可以使用new操作符，创建bind返回的新函数的实例，此时传入的this失效；



```js
Function.prototype.bind2 = function(context, ...args) {
  if (typeof this !== "function") {
    throw new Error("bind2只能在函数上使用");
  }

  const self = this;
  const fNOP = function() {};

  const bound = function(...innerArgs) {
    // 1. bind 返回的新函数被当作为构造函数使用时，
    //    self指向绑定函数，this指向实例，则this的指向不需要修改
    // 2. bind 返回的新函数被当作为普通函数使用时，
    //    self指向绑定函数，this指向window, 则修改this指向传入的上下文对象
    self.apply(this instanceof self ? this : context, [...args, ...innerArgs]);
  };

  // ？？ 如果直接修改bound 的prototype 也会直接修改函数的prototype, 这时可以使用空函数进行中转
  // ？？ 可是不是直接修改了fNOP.prototype么？这样不也影响函数的prototype
  // -- 这个写法来自冴羽的博客
  fNOP.prototype = this.prototype;
  bound.prototype = new fNOP();

  return bound;
};



const sayName = function(age) {
  console.log(this.name);
  this.age = age;
  console.log(this.age);
};

const Person = {
  name: "lixingjuan"
};

const sayPersonName = sayName.bind2(Person, 18);
sayPersonName();
```



## 2.1. 手写bind-1: 基本类型的扩充


```javascript
Function.prototype.method = function(name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
  return this;
};

Function.method("bind2", function(context, ...args) {
  return () => {
    this.apply(context, args);
  };
});
```




# 3. 参考文章

1. [《javascript高级程序设计-高级技巧》(第5章-Function类型)]
2. [call,apply-MDN]
3. [《JavaScript语言精粹-第四章-扩充基本类型的功能》]
4. [掘金-JavaScript深入之bind的模拟实现](https://juejin.im/post/59093b1fa0bb9f006517b906)