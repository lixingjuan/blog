const PromiseRace = (arr) => {
  return new Promise((resolve, reject) => {
    arr.forEach((fn) => {
      Promise.resolve(fn).then(resolve, reject);
      // ❗️❗️ Why ⬇️ doesn't work?
      // Promise.resolve(fn).then(resolve).catch(reject);
      // ❗️❗️因为catch是微任务，会进入微任务队列，而then的两个参数为同级同步任务
    });
  });
};

export default PromiseRace;
