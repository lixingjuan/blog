/**
 * 如果顺序不是固定的，可以一次性初始化所有期约，再分别等待结果
 * (如果不在乎几个异步函数的执行顺序，可以使用下述平行加速技巧)
 */

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

// 随机延时0-1000ms
const randomDelay = async (id) => {
  const random = Math.random() * 1000;
  await sleep(random);
  console.log(`${id} finished`);
};

/* ****************************************************************************************************
 *                                    加速前
 ************************************************************************************************* */
async function foo() {
  console.time("foo");
  await randomDelay(1);
  await randomDelay(2);
  await randomDelay(3);
  await randomDelay(4);
  await randomDelay(5);
  console.timeEnd("foo");
}

foo();
// 1 finished
// 2 finished
// 3 finished
// 4 finished
// 5 finished
// default: 2.121s

/* ****************************************************************************************************
 *                                    加速后
 ************************************************************************************************* */
async function bar() {
  console.time("bar");

  const p1 = randomDelay(1);
  const p2 = randomDelay(2);
  const p3 = randomDelay(3);
  const p4 = randomDelay(4);
  const p5 = randomDelay(5);

  await p1;
  await p2;
  await p3;
  await p4;
  await p5;
  console.timeEnd("bar");
}

bar();
// 3 finished
// 2 finished
// 1 finished
// 5 finished
// 4 finished
// bar: 707.042ms
