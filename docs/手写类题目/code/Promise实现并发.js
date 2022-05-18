/* ****************************************************************************************************
 *                                    Code实现
 ************************************************************************************************* */
function limitLoad(urls, handler, limit = 3) {
  const sequence = [...urls];
  // !! 先截取 {limit} 个元素，表示组成正在执行的任务队列
  const promises = sequence.splice(0, limit).map((it, index) => handler(it).then(() => index));
  let p = Promise.race(promises);

  // !! 依次遍历剩下的元素，即，等待队列
  for (let i = 0; i < sequence.length; i++) {
    p = p.then((fulfilledTaskIndex) => {
      // 走到这里说明已经有一个任务完成，此时的空位即 => fulfilledTaskIndex
      promises[fulfilledTaskIndex] = handler(sequence[i]).then(() => fulfilledTaskIndex);

      // 对新组成的promises，重新再次进行竞赛
      return Promise.race(promises);
    });
  }
}

export default limitLoad;
