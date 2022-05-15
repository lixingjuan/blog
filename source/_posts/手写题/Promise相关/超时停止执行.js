/**
 * @desc 超时取消执行
 */

// 假装我是一个10s才能拿到结果的网络请求
const p1 = new Promise((resolve) => setTimeout(resolve, 10000));

/**
 * 方案一：利用Promise.race
 */
Promise.race([
  p1,
  new Promise((resolve, reject) => setTimeout(reject("2"), 1000)),
  // why ⬇️ is not working?
  // () => Promise.reject("err"),
])
  .then((res) => {
    console.log("success", res);
  })
  .catch((err) => {
    console.log("error", err);
  });
