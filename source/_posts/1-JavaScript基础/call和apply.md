
# 1. call apply Bind 🌨


## 1.1. call 和 apply

他们是非继承而来的方法，作用是在指定的作用域调用函数，实际上相当于设置函数体内 `this` 的值

他们可以扩充函数的作用 （eg.1），和更方便的传递参数（eg.2），二者唯一的区别是参数不同

call的书参数
- 参数1: 在其中运行函数的作用域
- 参数2: 一堆参数排排站

apply的参数
- 参数1: 在其中运行函数的作用域
- 参数2: 参数数组（类数组对象）



2. 优点 ：对象不需要和方法有任何的耦合关系，我们之前经常写例如 eg 这种，再通过 `p` 去调用他



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

## 1.2. 应用1


```javascript
/* eg.1 使用apply展开数组 */
function foo(...args) {
  console.log(...args);
}
foo.apply(null, [2, 3, 4, [5]]);  // 2 3 4 [ 5 ]
```

## 1.3. 应用2

```javascript

/* eg.2 通过apply 扩展,使得Math.max可以接收数组作为参数 */
Math.max(1, 2, 3);
Math.max.apply(this, [1, 2, 3]);


```



