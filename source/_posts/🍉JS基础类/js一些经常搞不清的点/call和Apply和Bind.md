
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
global.color = "red";
let o = { color: "blue" };
function sayColor() {
  console.log(this.color);
}
sayColor();  // 'red'
sayColor.call(o);  // 'blue'
// 理解：
// 运行sayColor.call(o)的时候，函数的执行环境变了，因为辞职函数体内的this对象指向了o 

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
 
/* bind用法 */


```
7. 实际应用举例

```javascript

/* 通过apply 扩展,使得Math.max可以接收数组作为参数 */
Math.max(1, 2, 3);
Math.max.apply(this, [1, 2, 3]);

```




## bind
1. 作用
  - 会创建一个函数的实例，其this 值会被绑定到传给 bind() 函数的值
  
2. 举例

```javascript

global.color = "red";
let o = { color: "blue" };

function sayColor() {
  return this.color;
}
console.log(sayColor());  // 'red'
// 将 sayColor 的this值，绑定到了 o 上
console.log(sayColor.bind(o)());  // 'blue'

```

3. 实现一个bind

- 其实bind就是把this 绑定到传入的对象上

```javascript
/* 使用函数柯里化实现 */
const bind = function(fn, context) {
  const args = [].slice.call(arguments, 1);
  return function() {
    const _args = args.concat([...arguments]);
    return fn.apply(context, _args);
  };
};

global.name = "ming";
const person = {
  name: "hong",
  sayName: function() {
    return this.name;
  }
};
console.log(person.sayName());              // "hong" 
console.log(bind(person.sayName, null)());  // "ming"
```