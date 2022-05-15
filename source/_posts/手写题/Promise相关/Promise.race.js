const fns = [Promise.reject(1), 2, Promise.resolve(3)];

/* ****************************************************************************************************
 *                                    实现
 ************************************************************************************************* */
const PromiseRace = (arr) => {
  return new Promise((resolve, reject) => {
    arr.forEach((fn) => {
      Promise.resolve(fn).then(resolve, reject);
      // ? Why ⬇️ doesn't work?
      // 因为catch是微任务，会进入微任务队列，而then的两个参数为同级同步任务
      // Promise.resolve(fn).then(resolve).catch(reject);
    });
  });
};

PromiseRace(fns).then(console.log).catch(console.log);
Promise.race(fns).then(console.log).catch(console.log);

Promise.resolve(Promise.reject(1))
  .then((res) => console.log("then"))
  .catch((err) => console.log("catch"));
