const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

/** 随机sleep, 0s-1s */
export const randomSleep = () => sleep(Math.random() * 1000);

export default sleep;

// const demo = async () => {
//   console.log("函数开始执行");
//   console.time("demo");
//   await sleep(3000);
//   console.log("end");
//   console.timeEnd("demo");
// };
