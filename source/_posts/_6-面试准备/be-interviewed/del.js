function PromiseAll(arr) {
  let params = [];
  try {
    params = [...arr];
  } catch (error) {
    console.log(error);
    return;
  }
  return new Promise((resolve, reject) => {
    const result = [];
    const paramsLength = params.length;
    let counter = 0;

    for (let index = 0; index < paramsLength; index++) {
      Promise.resolve(arr[index])
        .then((value) => {
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
