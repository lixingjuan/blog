## 理解

1. 如何正确的判断this的指向？
   - this的指向主要看他是在哪里调用，this就指向谁？
2. 四种具体情况
   1. 函数是否在new中调用（new 绑定）？如果是的话this绑定的是新创建的对象 `var bar = new Foo()`
   2. 函数是否通过call、apply(显示绑定) 或者硬绑定调用？ 如果是的话，this绑定的是指定的对象 `var bar = foo.call(obj2)`
   3. 对象是否在某个上下文对象中调用（隐式绑定）？如果是的话，this绑定的是那个上下文对象 `var bar = obj1.foo()`
   4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到undefined, 否则绑定到全局对象 `var bar = foo()`


## 面试真题收集

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