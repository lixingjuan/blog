/** 串行执行一系列任务封装 */
const addOne = (x) => x + 1;
const addThree = (x) => x + 3;
const addFive = (x) => x + 5;

/* ****************************************************************************************************
 *                                    利用Promise实现
 ************************************************************************************************* */
const compose = (fns) => (x) => fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(x));

const addTen = compose([addOne, addThree, addFive]);

addTen(100).then(console.log);

/* ****************************************************************************************************
 *                                    利用async-await实现
 ************************************************************************************************* */
async function addTen2(x) {
  const arr = [addOne, addThree, addFive];
  for (const fn of arr) {
    x = await fn(x);
  }
  return x;
}
addTen2(100).then(console.log);
