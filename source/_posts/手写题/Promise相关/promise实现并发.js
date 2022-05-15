/**
 * @Question 若有多张图片要请求，希望一次同时请求3个，只要其中一个任务完成，立刻有一个任务补位进去
 * */

/* ****************************************************************************************************
 *                                    准备数据
 ************************************************************************************************* */
const imgUrls = [
  { info: "link1" },
  { info: "link2" },
  { info: "link3" },
  { info: "link4" },
  { info: "link5" },
  { info: "link6" },
  { info: "link7" },
  { info: "link8" },
  { info: "link9" },
  { info: "link10" },
  { info: "link11" },
];

/** 使用loadImg来模拟一次请求 */
async function loadImg(url) {
  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
  console.log(url.info + "---- start!!!!");
  await sleep(Math.random() * Math.random() * 10000);
  console.log(url.info + "---- ok!!!!");
  return "ok";
}

/* ****************************************************************************************************
 *                                    实现
 ************************************************************************************************* */

function limitLoad(urls, handler, limit = 3) {
  const sequence = [...urls];
  // 先截取三个元素，表示组成正在执行的任务队列
  const promises = sequence.splice(0, limit).map((it, index) => handler(it).then(() => index));
  let p = Promise.race(promises);

  // 遍历剩下的元素，即，等待队列
  for (let i = 0; i < sequence.length; i++) {
    p = p.then((fulfilledTaskIndex) => {
      // 走到这里说明已经有一个任务完成，此时的空位即 => fulfilledTaskIndex
      promises[fulfilledTaskIndex] = handler(sequence[i]).then(() => fulfilledTaskIndex);

      // 对新组成的promises，重新再次进行竞赛
      return Promise.race(promises);
    });
  }
}

limitLoad(imgUrls, loadImg, 3);
