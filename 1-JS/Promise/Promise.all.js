/**
 * Promise.all的特点
 * 1. 检查输入
 *  1-1. 如果参数不是数组，立即返回一个失败的Promise, 并抛出错误
 *  1-2. 如果参数是空数组，立即解决为一个空数组
 * 2. 数组中所有任务都成功，才会成功; 只要有一个任务失败，状态立刻变为rejected
 */
class MyPromise {
  static resolve(val) {
    return Promise.resolve(val);
  }
  static reject(val) {
    return Promise.reject(val);
  }
  static all(arr) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(arr)) {
        return reject(new TypeError("arguments must be array"));
      }

      if (!arr.length) {
        return resolve([]);
      }

      const result = [];
      let resolvedCounter = 0;
      const fns = arr.map((it) => Promise.resolve(it));

      fns.forEach((fn, index) => {
        fn.then((res) => {
          result[index] = res;
          resolvedCounter += 1;

          if (resolvedCounter === arr.length) {
            resolve(result);
          }
        }).catch(reject);
      });
    });
  }
}
