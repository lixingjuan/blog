## this是什么？

当函数被调用的时候，会创建一个活动记录，又叫做执行上下文。 这个活动记录会包含函数调用的一些信息，包含，**函数的调用位置**，**调用方式**， **传入的参数等信息**，this就是其中的一个属性。

this其实是**函数被调用时**发生的绑定，并不是在编写的时候绑定的，他的上下文取决于函数调用时的各种条件，this的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式

this的指向完全取决于函数被调用的位置




## this绑定四种规则

先找到函数的调用位置，然后判断需要应用下面四条规则中的那一条
this有四种绑定规则, 优先级依次
1. new绑定：指向实例
2. 显式绑定：call和apply显式绑定，bind硬绑定
3. 默认绑定：调用位置是否有上下文对象（看是否被某个对象拥有或者包含），this即指向这个包含他的对象
4. 隐式绑定：看是否被某个对象拥有或者包含





### new绑定


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
console.log(bar.a); // 3，this执行实例
console.log(bar);   // foo { a:2 }
console.log(baz);   // foo { a:3 }
```



### 显式绑定

- call、apply显式绑定
- bind, 显示绑定的变种，硬绑定


### 默认绑定

### 隐式绑定

调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含

```javascript
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
  foo: foo
};
obj.foo();
```

- 首先需要注意的是foo的声明方式，及其之后是如何被当作引用属性添加到obj中的，但是无论是直接在obj中定义还是先定义在添加为引用属性，这个函数严格来说都不属于obj对象
- 然后调用位置会使obj上下文来引用函数，因此可以说函数被调用时，obj对象’拥有‘或者‘包含’它
- 当函数引用有上下文对象时，隐式绑定规则会把函数调用中的this绑定到这个上下文对象

- 对象属性引用链中只有最顶层或者最后一层会影响调用位置

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





## 优先级
根据优先级来判断函数在某个调用位置应用的是那条规则，按照下面的顺序来进行判断

1. 函数是否在new中调用（new 绑定）？如果是的话this绑定的是新创建的对象 `var bar = new Foo()`
2. 函数是否通过call、apply(显示绑定) 或者硬绑定调用？ 如果是的话，this绑定的是指定的对象 `var bar = foo.call(obj2)`
3. 对象是否在某个上下文对象中调用（隐式绑定）？如果是的话，this绑定的是那个上下文对象 `var bar = obj1.foo()`
4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到undefined, 否则绑定到全局对象 `var bar = foo()`


## this绑定的例外规则

### 被忽略的this
- 如果把null或者undefined作为this的绑定对象传入call、apply或者bind, 这些值在调用时会被忽略，实际上应用的是 **默认绑定规则**
- 安全的做法，在忽略this绑定时创建一个空对象，作为占位符，对于this的引用都会被限制在这个空对象中，不会对全局产生任何影响

```javascript
var ø = Object.create(null)
foo.apply(ø, [2,3]) 
```


## this和箭头函数

**！！见箭头函数篇**





## 我的疑问

按理说this是函数调用时候发生的一次绑定，和函数被调用环境有关，但是在扩充类型的功能《javascript语言精粹-第四章》的时候，也就是给函数原型添加了方法，在函数实例调用该方法时候，这里的this打印出来是 `[Number: 3.3333333333333335]`

```javascript
Number.prototype.integer = function() {
  console.log(this); // [Number: 3.3333333333333335]
  return Math[this < 0 ? "ceil" : "floor"](this);
};
console.log((10 / 3).integer());
```





## 面试真题

 
1. 四种具体情况
   1. 函数是否在new中调用（new 绑定）？如果是的话this绑定的是新创建的对象 `var bar = new Foo()`
   2. 函数是否通过call、apply(显示绑定) 或者硬绑定调用？ 如果是的话，this绑定的是指定的对象 `var bar = foo.call(obj2)`
   3. 对象是否在某个上下文对象中调用（隐式绑定）？如果是的话，this绑定的是那个上下文对象 `var bar = obj1.foo()`
   4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到undefined, 否则绑定到全局对象 `var bar = foo()`




2. 
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