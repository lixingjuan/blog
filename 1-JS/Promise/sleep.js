// const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

// /** 随机sleep, 0s-1s */
// export const randomSleep = () => sleep(Math.random() * 1000);

// export default sleep;

// const demo = async () => {
//   console.log("函数开始执行");
//   console.time("demo");
//   await sleep(3000);
//   console.log("end");
//   console.timeEnd("demo");
// };

const fetchNumber = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random() * 100);
    }, Math.random() * 1000);
  });
};

/** 实现指定数量的并发 */
const demo = () => {
  const result = [];
  const tasks = [
    fetchNumber,
    fetchNumber,
    fetchNumber,
    fetchNumber,
    fetchNumber,
    fetchNumber,
    fetchNumber,
    fetchNumber,
  ];

  Promise.race([fetchNumber(), fetchNumber(), fetchNumber()]).then((res) => {
    console.log(res);
  });
};

demo();
