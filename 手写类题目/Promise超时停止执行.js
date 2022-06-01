/** 10s后才能请求成功 */
const fakeRequest = new Promise((resolve) => setTimeout(resolve, 10000));

/** 实现 */
Promise.race([fakeRequest, new Promise((resolve, reject) => setTimeout(reject, 2000, "timeout"))])
  .then((res) => {
    console.log("success", res);
  })
  .catch((err) => {
    console.log("error", err);
  });
