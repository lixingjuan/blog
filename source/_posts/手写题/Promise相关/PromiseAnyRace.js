const p1 = Promise.resolve(1);
const p2 = Promise.reject(2);
const p3 = Promise.reject(3);

/**
 * 1. 只有所有都resolve, 才走到then
 */
Promise.all([p2, p1, p3])
  .then((result) => {
    console.log("all:any success", result);
  })
  .catch((err) => {
    console.log("all:any error", err);
  });

/**
 * 竞赛型人格
 * 只要有一个reject 立刻走到catch
 * 只要有一个resolve 立刻走到then
 *
 * 丧失希望，一个不行，全都不行
 */
Promise.race([p2, p1, p3])
  .then((result) => {
    console.log("race:any success", result);
  })
  .catch((err) => {
    console.log("race:any error", err);
  });

/**
 * 只有当所有都reject 才走到catch,
 *
 * 充满希望，万一有一个能行呢？
 *
 * 1. catch捕获到的错误为数组
 */
Promise.any([p1, p2, p3])
  .then((result) => {
    console.log("any:success", result);
  })
  .catch((err) => {
    console.log("any:error", err.errors, err.message);
  });
