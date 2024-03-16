/**
 * Promise.any 的特征，
 * 1. 检查输入，参数必须是数组
 * 2. 检查输入，参数如果是空数组，会直接走到catch, 并却失败原因是All promises were rejected
 * 3. 只要有一个resolve(成功或者失败)， 都会走到then;
 * 4. 所有任务都拒绝，就会走到catch
 */
class MyPromise {
  static any(promises) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError("arguments must be array"));
      }
      if (!promises.length) {
        new Error();
        return reject("All promises were rejected");
      }
      promises.forEach((it) => {
        Promise.resolve(it).then(resolve, resolve);
      });
    });
  }
}

Promise.any([]).then(
  (res) => {
    console.log("成功", res);
  },
  (error) => {
    console.log("失败", error);
  }
);
