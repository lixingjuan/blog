/**
 * Promise.allSettled的特征, 在给定的所有任务都完成后（无论成功、失败，），才会走到then
 */
class MyPromise {
  static allSettled(promises) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError("arguments must be array"));
      }

      if (!promises.length) {
        return resolve([]);
      }

      let counter = 0;
      const result = [];

      promises.forEach((it, index) => {
        Promise.resolve(it).then(
          (res) => {
            counter += 1;
            result[index] = { status: "fulfilled", value: res };
            if (counter === promises.length) {
              resolve(result);
            }
          },
          (err) => {
            counter += 1;
            result[index] = { status: "rejected", reason: err };
            if (counter === promises.length) {
              resolve(result);
            }
          }
        );
      });
    });
  }
}

// const params = [];
const params = [Promise.reject(1), Promise.resolve(2)];
const callback1 = (res) => {
  console.log(res);
};

Promise.allSettled(params).then(callback1, callback1);
MyPromise.allSettled(params).then(callback1, callback1);
