```js
const arr = [2, 7, 11, 15];
```


1. for循环可以通过return 停止循环的执行，forEach 只能抛出错误来停止

```js
// 可以获得返回值，return也可以停止循环
const demo = function () {
    for (let i = 0; i < arr.length; i++) {
      console.log(i);
      if (arr[i] > 3) {
        return 666;
      }
    }
};
console.log(demo());
// 2
// 666
```

2. for可以通过return 给出返回值，forEach即使给了return也不会有返回值

```js
/* 测试返回值 */
const demo = function () {
  arr.forEach((i) => {
    console.log(i);
    if (arr[i] > 3) {
      return 666
    }
  });
};
console.log(demo());
// 2
// 7
// 11
// 15
// undefined

/* 测试停止循环 */
const demo = function () {
  arr.forEach((i) => {
    console.log(i);
    if (arr[i] > 3) {
      throw new Error("arr[i] > 3)");
    }
  });
};
console.log(demo()); // undefined
// 2
// Error: arr[i] > 3)

```