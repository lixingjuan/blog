// Promise._race = (promises) =>
//   new Promise((resolve, reject) => {
//     promises.forEach((promise) => {
//       promise.then(resolve, reject);
//     });
//   });

Promise.myrace = function (iterator) {
  return new Promise((resolve, reject) => {
    try {
      let it = iterator[Symbol.iterator]();
      while (true) {
        let res = it.next();
        console.log(res);
        if (res.done) break;
        if (res.value instanceof Promise) {
          res.value.then(resolve, reject);
        } else {
          resolve(res.value);
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 1000);
});

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("failed");
  }, 500);
});

console.log(Promise.myrace([p1, p2]));
