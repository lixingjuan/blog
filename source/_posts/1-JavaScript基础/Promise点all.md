# Promise.all的实现

> 请听题: 你能实现一个Promise.all么？


## 复习

要想实现一个方法，首先要了解他的特性

1. 归属，`Promise.all` 是Promise上的一个静态方法
2. 传参，接受一个具有可迭代接口的参数，如果不传，会报错undefined没有可迭代接口，实际开发中都传数组，数组元素随意
3. 特点，
   1. 按照传参顺序依次执行，
   2. 等全部任务都 resolve，才会返回resolve状态;
   3. 如果有一个失败了，则会以第一个拒绝的理由，做为整个Promise拒绝的理由返回, 但是后续的任务仍然会执行，但是不会再影响Promise的状态;



## 实现代码


```js
function PromiseAll(arr) {
  let params = [];
  try {
    // 1. 参数必须具有可迭代接口
    params = [...arr];
  } catch (error) {
    console.log(error);
    return;
  }
  return new Promise((resolve, reject) => {
    const result = [];

    // 2. 存储参数长度决定循环执行任务的次数
    const paramsLength = params.length;
    let counter = 0;

    for (let index = 0; index < paramsLength; index++) {
      Promise.resolve(arr[index])
        .then((value) => {
          // 3. 利用计数器，记录任务是否全部执行完毕
          counter++;
          result[index] = value;

          if (counter === paramsLength) {
            resolve(result);
          }
        })
        .catch((err) => reject(err));
    }
  });
}
```


## 测试用例1, 参数中所有执行完毕返回状态


```js

/**
 * @desc 测试用例1
 * @expect 3秒后打印 [1,2,3]
 */
// 测试用例
const pro1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("1");
  }, 1000);
});

const pro2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("2");
  }, 2000);
});

// 测试用例
const pro3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("3");
  }, 3000);
});

// 期待结果：3秒后打印 [1, 2, 3]
PromiseAll([pro1, pro2, pro3])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });


```


## 测试用例2: 参数不传报错没有可迭代接口


```js
/**
 * @desc 测试用例二: 参数判断
 * @expect TypeError: undefined is not iterable (cannot read property Symbol(Symbol.iterator))
 */

PromiseAll();
// Promise.all()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => console.log(err));

```
