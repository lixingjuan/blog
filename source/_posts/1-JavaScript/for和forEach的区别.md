```js
const arr = [2, 7, 11, 15];
```

# for和forEach区别

1. for循环可以通过return/break 停止循环的执行，forEach 只能抛出错误来停止

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


# break\continue\return


const arr = [1, 2, 3];

break: 完全停止掉循环
（return 效果相同）
```js
for (let index = 0; index < arr.length; index++) {
  if (arr[index] === 2) {
    break;
  }
  console.log(arr[index]);
}
// 1
```

continue: 停止本次循环，进入下一次

```js
for (let index = 0; index < arr.length; index++) {
  if (arr[index] === 2) {
    continue;
  }
  console.log(arr[index]);
}
// 1 
// 3
```

