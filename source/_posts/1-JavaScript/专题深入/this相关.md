{% pullquote mindmap %}
#this
##是什么
###四种绑定规则
####new
####显示绑定
####默认绑定
####隐式绑定
{% endpullquote %}


# this是什么？

之前我们说过 this 是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调 用时的各种条件。this 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。

当一个函数被调用时，会创建一个活动记录（有时候也称为执行上下文）。
这个活动记录会包含函数调用的一些信息，包含，==函数的调用位置==，==调用方式==， ==传入的参数== 等信息，this就是其中的一个属性。
this其实是 ==函数被调用时== 发生的绑定，并不是在编写的时候绑定的，他的上下文取决于函数调用时的各种条件，this的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式


学习 this 的第一步是明白 this 既不指向函数自身也不指向函数的词法作用域，你也许被 这样的解释误导过，但其实它们都是错误的。this 实际上是在函数被调用时发生的绑定，==它指向什么完全取决于函数在哪里被调用==。




this 是在运行时进行绑定的，并不是在编写时绑定，调用一个函数将暂停当前函数的执行，传递控制权和参数给新函数。
除了声明时定义的形式参数，每个函数接收两个附加的参数: this和arguments。参数this 在面向对象编程中非常重要，它的值取决于调用的模式。

# this四种指向

在JavaScript中一共有四种调用模式: **方法调用模式**、**函数调用模式**、**构造器调用模式** 、 **apply调用模式**。这些模式在如何初始化关键参数this 上存在差异。


## 方法调用模式

this指向所属对象

当一个的数被保存为对象的一个属性时，我们称它为一个方法。当这个方法被调用时，this被绑定到该对象。
如果一个调用表达式包含一个属性存取表达式(即一个:点表达式或[subscript]下标表达式)，那么它被当作一一个方法来调用。

```js
// 创建myObject。 它有一个value属性和一个increment 方法。
// increment 方法接受一个可选的参数。如果参数不是数字，那么默认使用数字1。

const myObject =
  value: 0
  increment: function(){
    this.value += typeof inc===' number' ? inc : 1;
  }
}.

my0bject.increment();
document.writeln(myObject. value); // 1

//1
myObject.increment(2) ;
document.writeln (myObject. value); // 3

```



方法可以使用this去访问对象，所以它能从对象中取值或修改该对象。
this到对象的绑定发生在调用的时候，这个迟绑定使得函数可以对this高度复用，通过this可取得它们所属对象的上下文的方法称为公共方法。


this的绑定发生在函数调用时：

```javascript
function foo() {
  console.log(this.a);
}
const obj = {
  a: 2,
  foo: foo
};

obj.foo();  // 2
```


说函数被调用时，obj对象’拥有‘或者‘包含’它，当函数引用有上下文对象时，隐式绑定规则会把函数调用中的this绑定到这个上下文对象

对象属性引用链中只有最顶层或者最后一层会影响调用位置：

```javascript
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
  foo: foo
};
var obj2 = {
  a: 3,
  obj: obj
};
obj2.obj.foo(); // 2
```




## 函数调用模式



当一个函数并非一个对象的属性时，那么它被当作个的数来调用:

```js
var sum = add(3，4) ;// sum的值为7
```

当函数以此模式调用时，this被绑定到全局对象。这是语言设计上的一个错误, 若设计正确，当内部函数被调用时，this应该仍然绑定到外部函数的this变量。这个设计错误的后果是不能利用内部函数来帮助他工作，因为内部函数的this是绑定在全局的。

通常有两种方法解决该问题

```js
/* 1. 声明变量，将外部函数的this的变量赋值给该变量 */

// 给myObject增加一一个double方法。

myObject. double = function (){


  const that = this;  //解决方法
  const helper = function (){
    that.value = add(that.value, that.value);
  }

  // 以函数的形式调用helper。
  helper() ;
}


// 以方法的形式调用double
my0bject.double() ;
document. writeln (myObject. getValue() ) ; // 6


/* 2. 利用箭头函数没有this的特点 */

myObject. double = function (){
  const helper = () => {
    that.value = add(this.value, this.value);
  }

  // 以函数的形式调用helper。
  helper() ;
}


// 以方法的形式调用double
my0bject.double() ;
document. writeln(myObject. getValue() ) ; // 6

```


## 构造器调用模式


指向实例


使用new来调用函数 (或者说发生构造函数调用时)，会自动执行下面的操作
1. 创建（或者说构造）一个全新的对象
2. 这个新对象会被执行 [[原型]] 连接
3. 这个新对象会被绑定到函数调用的this
4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象



```javascript
function foo(a) {
  this.a = a;
}
var bar = new foo(2);
var baz = new foo(3);


console.log(bar.a); // 2，this执行实例
console.log(baz.a); // 3，this执行实例
console.log(bar);   // foo { a:2 }
console.log(baz);   // foo { a:3 }
```

**应用举例**

vue源码中

```js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
```

`this instanceof Vue` 就是判断用户是否是采用 `new` 操作符调用 `Vue` 的，
如果采用 `new` 操作符调用，则 `this` 指向  `Vue` 的实例，
如果直接调用， `this` 指向  Vue 本身














## apply,call调用模式

- call、apply显式绑定
- bind, 显示绑定的变种，硬绑定



因为JavaScript是一门函数式的面向对象编程语言，所以函数可以拥有方法。apply方法让我们构建-个参数数组并用其去调用函数。它也允许我们选择this的值。apply方法接收两个参数。第一个是将被绑定给this的值。第二个就是 一个参数数组。

```js
const Quo = function(string){
  this.status = string;
}
Quo.prototype.getStatus = function(){
    return this.status;
}




// 构造一一个包含两个数字的数组，并将它们相加。
const array= [3, 4];
const sum = 0

add.apply(null, array);  // sum值为 7

//构造一个包含status成员的对象。
const statusObject = {
  status: 'A-OK'
}

// statusObject并没有继承自Quo.prototype,但我们可以在 statusObject  调用get_ status方法，尽管statusObject 并没有一个名为getStatus的方法

const status = Quo.prototype.getStatus.apply(statusObject);
console.log(status);  // 'A-OK'
```




















# 我的疑问

## 默认绑定

非严格模式下，this 默认绑定到全局对象

```js
/* 浏览器环境下 */
var a = "2";
function foo() {
  console.log(this.a);
}
foo();  // “2”
```

可以看到当调用 foo() 时，this.a 被解析成了全局变量 a。为什么？ 因为在本 例中，函数调用时应用了 this 的默认绑定，因此 this 指向全局对象。


如果使用严格模式(strict mode)，那么全局对象将无法使用默认绑定，因此 this 会默认绑定 到 undefined

```js
const a = "2";
function foo() {
  console.log(this);
}
foo(); // undefined
```

里有一个微妙但是非常重要的细节，虽然 this 的绑定规则完全取决于调用位置，但是只 有 foo() 运行在非 strict mode 下时，默认绑定才能绑定到全局对象;严格模式下与 foo() 的调用位置无关:




问题1: ??

浏览器环境下，对变量a的声明采用const , 虽然此刻，this 仍然会产生默认绑定到变量 Window, 但是打印的 `this.a` 仍然是 undefined

```js
/* 浏览器环境下 */
const a = "2";
function foo() {
  console.log(this.a);
}
foo(); // undefined
```


问题2: ??

Node环境下，即使对变量a的声明采用var, 测试了this确实是默认绑定到全局变量global, 但是打印的 `this.a` 是undefined

```js
/* Node环境下 */
var a = "2";
function foo() {
  console.log(this.a);
}
foo(); // undefined

```







按理说this是函数调用时候发生的一次绑定，和函数被调用环境有关，但是在扩充类型的功能《javascript语言精粹-第四章》的时候，也就是给函数原型添加了方法，在函数实例调用该方法时候，这里的this打印出来是 `[Number: 3.3333333333333335]`

```javascript
Number.prototype.integer = function() {
  console.log(this); // [Number: 3.3333333333333335]
  return Math[this < 0 ? "ceil" : "floor"](this);
};
console.log((10 / 3).integer());
```










# 考察题目

## 题一

1. 四种具体情况
   1. 函数是否在new中调用（new 绑定）？如果是的话this绑定的是新创建的对象 `var bar = new Foo()`
   2. 函数是否通过call、apply(显示绑定) 或者硬绑定调用？ 如果是的话，this绑定的是指定的对象 `var bar = foo.call(obj2)`
   3. 对象是否在某个上下文对象中调用（隐式绑定）？如果是的话，this绑定的是那个上下文对象 `var bar = obj1.foo()`
   4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到undefined, 否则绑定到全局对象 `var bar = foo()`

## 题二

以下代码输出什么？

```js
function Foo() {
  Foo.a = function() {
    console.log(1);
  };
  this.a = function() {
    console.log(2);
  };
}
Foo.prototype.a = function() {
  console.log(3);
};
Foo.a = function() {
  console.log(4);
};

Foo.a();
let obj = new Foo();
obj.a();
Foo.a();
Foo.a();

// 4
// 2
// 1
// 1
```



## 题三

```javascript
window.name = "ByteDance";

function Foo() {
  this.name = "bar";
}

Foo.prototype.getName = function() {
  console.log(this);
  return this.name + 1;
};

let foo = new Foo();
let getName = foo.getName;

console.log(getName()); // 'ByteDance'
console.log(foo.getName()); // 'bar1'
console.log(getName.call(Foo)); // 'Foo1'
```



## 参考文章

- [《你不知道的Javascript(上)第二部分》]
- [《JavaScript高级程序设计》]
- [《JavaScript语言精粹》]