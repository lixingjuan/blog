const PromiseAll = (arr) => {
  const fns = arr.map((it) => Promise.resolve(it));
  const result = [];
  let counter = 0;

  return new Promise((resolve, reject) => {
    fns.forEach((fn, index) => {
      fn.then((res) => {
        // !! 由于单个Promise返回的顺序不同，
        // 所以赋值给 result[index]，
        // 并采用counter 计数的方式，判断当前Promise数组是否全部完成
        result[index] = res;
        if (++counter === arr.length) {
          resolve(result);
        }
      }).catch(reject);
    });
  });
};

/* ****************************************************************************************************
 *                                    tests
 ************************************************************************************************* */

const test1 = () => {
  PromiseAll([1, Promise.resolve(2)]).then(console.log);
};

const test2 = () => {
  PromiseAll([1, Promise.reject(2)])
    .then(console.log)
    .catch(console.log);
};

export { PromiseAll, test1, test2 };
