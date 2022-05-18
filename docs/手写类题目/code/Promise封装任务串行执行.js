/** 串行执行一系列任务封装 */
const addTwo = (x) => x + 2;
const addThree = (x) => x + 3;
const addFive = (x) => x + 5;

/** 方案1: 利用Promise + reduce */
const compose = (fns) => (x) => fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(x));

const addTen = compose([addTwo, addThree, addFive]);

addTen(100).then(console.log);

/** 方案2: 利用async返回的Promise的特点 */
async function addTen2(x) {
  const fns = [addTwo, addThree, addFive];
  for (const fn of fns) {
    x = fn(x);
  }
  return x;
}

addTen2(100).then(console.log);
