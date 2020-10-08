# flat


实现flat三种方案

1. ES6的flat
2. 使用ES5实现一个flat
3. 调用toString()方法


```js
let initArr = [
  [
    ['1-7', '2-6'],
    '4-6',
    [
      ['2-0', '1-4'],
      ['3-9'],
      '4-5',
    ],
  ]
]
```

## 方案1: 递归

```js
/**
 * 写法一
 * @param {type}
 * @return {type}
 */
function flat(arg) {
  if (!Array.isArray(arg)) {
    return arg;
  }
  let res = [];

  for (let index = 0; index < arg.length; index++) {
    const item = arg[index];
    res = res.concat(flat(item));
  }

  return res;
}

```



## 方案2: 数组的reduce

```js

/**
 * 写法二
 * 1. 判断是否是数组
 * 2. 如果是，则调用reduce, 迭代合并函数
 * @return {Array}
 */
function flat(arg) {
  if (!Array.isArray(arg)) {
    return arg;
  }

  return arg.reduce((tol, cur) => tol.concat(flat2(cur)), []);
}

console.log(flat(initArr))
// ['1-7', '2-6','4-6', '2-0','1-4', '3-9','4-5']
```



## 方案3: 数组转为字符串

缺点： 这个方法会将所有元素变为字符串

```js
/**
 * 写法三
 * 调用数组的toString() 方法
 * @return {Array}
 */
initArr.toString().split(",")
```

