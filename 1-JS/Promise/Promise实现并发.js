function promisePool(tasks, poolLimit) {
  let taskIndex = 0;
  const promisesResults = []; // 存储所有任务的执行结果
  const currentExecutingPromises = []; // 存储正在执行的 Promise

  const enqueue = () => {
    if (taskIndex === tasks.length) {
      return Promise.resolve();
    }

    const task = tasks[taskIndex++];
    const taskPromise = Promise.resolve().then(() => task());
    promisesResults.push(taskPromise);

    const finishedPromise = taskPromise.then(() =>
      currentExecutingPromises.splice(currentExecutingPromises.indexOf(finishedPromise), 1)
    );
    currentExecutingPromises.push(finishedPromise);

    if (poolLimit > currentExecutingPromises.length) {
      return Promise.resolve().then(enqueue);
    }
    return Promise.race(currentExecutingPromises).then(enqueue);
  };

  return enqueue().then(() => Promise.all(promisesResults));
}
