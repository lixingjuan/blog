const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

/** 随机sleep, 0s-1s */
const randomSleep = () => sleep(Math.random() * 1000);

const imagesUrls = Array.from({ length: 20 }).map((i, index) => index);

/** 模拟一次加载图片的网络请求 */
const loadImage = async (url) => {
  console.log("start!", url);
  await randomSleep();
  console.log("ok!", url);
  return "ok";
};

/* ****************************************************************************************************
 *                                    Code实现
 ************************************************************************************************* */
function limitLoad(urls, handler, limit = 3) {
  const sequence = [...urls];
  const len = sequence.length;

  // 先截取 {limit} 个元素，表示组成正在执行的任务队列
  const promises = sequence.splice(0, limit).map((it, index) => handler(it).then(() => index));

  let p = Promise.race(promises);

  // !! 依次遍历剩下的元素，即，等待队列
  for (let i = limit; i < len; i++) {
    p = p.then((fulfilledTaskIndex) => {
      // 走到这里说明已经有一个任务完成，此时的空位即 => fulfilledTaskIndex
      promises[fulfilledTaskIndex] = handler(sequence[i]).then(() => fulfilledTaskIndex);

      // 对新组成的promises，重新再次进行竞赛
      return Promise.race(promises);
    });
  }
}

limitLoad(imagesUrls, loadImage, 3);
