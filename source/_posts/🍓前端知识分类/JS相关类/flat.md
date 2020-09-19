## flat

三种方法
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

/**
 * 写法一
 * @param {type}
 * @return {type}
 */
function flat(arr){
  let resArr =[]
  if(!Array.isArray(arr)){
    throw new Error('参数必须是数组！')
  }

  for (let i = 0; i < arr.length; i++) {
    if( Array.isArray(arr[i]) && arr[i].length ){
      resArr = resArr.concat(flat(arr[i]))
    } else {
      resArr = resArr.concat(arr[i])
    }
  }

  return resArr
}

/**
 * 写法二
 * 1. 判断是否是数组
 * 2. 如果是，则调用reduce, 迭代合并函数
 * @return {Array}
 */
function flatten(arr) {
  return Array.isArray(arr)
    ? arr.reduce((prev, current) => {
        return [...prev, ...flatten(current)];
      }, [])
    : [arr];
}

console.log(flat(initArr))

// ['1-7', '2-6','4-6', '2-0','1-4', '3-9','4-5']

/**
 * 写法三
 * 调用数组的toString() 方法
 * @return {Array}
 */
initArr.toString().split(",")
```

