import { randomSleep } from "./sleep";

/* ****************************************************************************************************
 *                                    日常的写法
 ************************************************************************************************* */
async function foo() {
  console.log("start!!! foo");
  console.time("foo");
  await randomSleep(1);
  await randomSleep(2);
  await randomSleep(3);
  await randomSleep(4);
  await randomSleep(5);
  await randomSleep(6);
  await randomSleep(7);
  await randomSleep(8);
  await randomSleep(9);
  await randomSleep(10);
  await randomSleep(11);
  await randomSleep(12);
  await randomSleep(13);
  await randomSleep(14);
  await randomSleep(15);
  await randomSleep(16);
  console.timeEnd("foo");
}

/* ****************************************************************************************************
 *                                    平行加速写法
 ************************************************************************************************* */
async function bar() {
  console.log("start!!! bar");
  console.time("bar");
  const p1 = randomSleep(1);
  const p2 = randomSleep(2);
  const p3 = randomSleep(3);
  const p4 = randomSleep(4);
  const p5 = randomSleep(5);
  const p6 = randomSleep(6);
  const p7 = randomSleep(7);
  const p8 = randomSleep(8);
  const p9 = randomSleep(9);
  const p10 = randomSleep(10);
  const p11 = randomSleep(11);
  const p12 = randomSleep(12);
  const p13 = randomSleep(13);
  const p14 = randomSleep(14);
  const p15 = randomSleep(15);
  const p16 = randomSleep(16);

  await p1;
  await p2;
  await p3;
  await p4;
  await p5;
  await p6;
  await p7;
  await p8;
  await p9;
  await p10;
  await p11;
  await p12;
  await p13;
  await p14;
  await p15;
  await p16;
  console.timeEnd("bar");
}

export { foo, bar };
