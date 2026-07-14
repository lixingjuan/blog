class TaskPool {
  constructor(poolLimit = 10) {
    this.poolLimit = poolLimit;
    // 当前正在执行的任务
    this.activeCount = 0;
    // 所有任务
    this.allTasks = [];
  }
  addTask(task) {
    this.allTasks.push(task);
  }
  // 任务添加完毕
  done() {
    return this.runNext();
  }
  // 开始尝试执行下一个任务
  runNext() {
    // while循环
    while (this.activeCount < this.poolLimit && this.allTasks.length > 0) {
      const task = this.allTasks.shift();
      task().finally((res) => {
        this.activeCount--;
        this.runNext();
      });
    }
  }
}

const createTask = (i) => {
  return () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(i);
      }, Math.floor(Math.random() * 1000));
    });
  };
};

const taskPool = new TaskPool(10);
for (let i = 0; i < 20; i++) {
  taskPool.addTask(createTask(i));
}

taskPool.done();
