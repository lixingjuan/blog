/**
 * Promise.any, 任意一个任务成功，都会走到then, 即所有任务都失败才会走到catch
 * 特征:
 * 1. 检查输入，参数必须是数组
 * 2. 检查输入，参数如果是空数组，会直接走到catch, 并却失败原因是All promises were rejected
 * 3. 只要有一个resolve(成功或者失败)， 都会走到then;
 * 4. 所有任务都拒绝，就会走到catch
 * 5. 会记录所有失败任务的数量和原因，并在所有任务都失败的时候，使用AggregateError 报告所有任务的拒绝原因
 */
class MyPromise {
  static any(promises) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError("arguments must be array"));
      }
      if (!promises.length) {
        return reject(new AggregateError("All promises were rejected"));
      }

      let rejectCount = 0;
      const rejectReasons = [];
      promises.forEach((it, index) => {
        Promise.resolve(it).then(resolve, (err) => {
          rejectReasons[index] = err;
          rejectCount += 1;
          if (rejectCount === promises.length) {
            reject(new AggregateError(rejectReasons, "All prmises were rejected"));
          }
        });
      });
    });
  }
}

MyPromise.any([Promise.reject(1), Promise.reject(2)]).then(
  (res) => {
    console.log("成功", res);
  },
  (error) => {
    console.log("失败", error);
  }
);
