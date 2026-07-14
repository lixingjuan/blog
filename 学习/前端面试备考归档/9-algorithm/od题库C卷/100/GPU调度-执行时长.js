/**
 * @题目描述
 * 为了充分发挥GPU[算力]，需要尽可能多的将任务交给GPU执行，现在有一个任务数组，数组元素表示在这1秒内新增的任务个数且每秒都有新增任务。
 * 假设GPU最多一次执行n个任务，一次执行耗时1秒，在保证GPU不空闲情况下，最少需要多长时间执行完成,
 *
 * @输入描述
 * ·第一个参数为GPU一次最多执行的任务个数，取值范围[1，100]
 * ·第二个参数为任务数组长度，取值范围[1，100001]
 * ·第三个参数为任务数组，数字范围[1，10000]
 *
 * @输出描述
 * 执行完所有任务最少需要多少秒
 *
 * @示例1
 * 输入
 * 3
 * 5
 * 1 2 3 4 5
 * 输出
 * 6
 * 说明
 * 一次最多执行3个任务，最少耗时6s
 *
 * @示例2
 * 输入
 * 4
 * 5
 * 5 4 1 1 1
 * 输出
 * 5
 * 说明
 * -次最多执行4个任务，最少耗时5s
 */

function minTimeToComplete(maxTasksPerSec, tasksLength, tasks) {
  // const sum = tasks.reduce((pre, cur) => (pre += cur), 0);
  // return Math.ceil(sum / maxTasksPerSec);
  let totalTime = 0; // 消耗的总时间
  let lastRoundStayedTasks = 0; // 上一轮循环留下的任务

  // 遍历所有的任务
  for (let i = 0; i < tasksLength; i++) {
    // 当前秒内总任务数 = 新增的任务数 + 上一秒遗留的任务数
    let currentTasks = tasks[i] + lastRoundStayedTasks;

    // 如果当前总任务数大于GPU一次可处理的最大任务数
    if (currentTasks > maxTasksPerSec) {
      // 计算剩余的任务数
      lastRoundStayedTasks = currentTasks - maxTasksPerSec;
    } else {
      // 否则，没有剩余的任务
      lastRoundStayedTasks = 0;
    }

    // 无论如何，每秒GPU都在工作
    totalTime++;
  }

  // 处理完数组中的任务后，可能还有剩余的任务需要完成
  while (lastRoundStayedTasks > 0) {
    totalTime++;
    lastRoundStayedTasks -= maxTasksPerSec; // 每秒减去GPU可处理的最大任务数
  }

  return totalTime;
}

// 示例测试
console.log(minTimeToComplete(3, 5, [1, 2, 3, 4, 5]) === 6); // 输出: 6
console.log(minTimeToComplete(4, 5, [5, 4, 1, 1, 1]) === 5); // 输出: 5

// 测试用例1: GPU每次只能执行1个任务，任务数量递增
console.log(minTimeToComplete(1, 5, [1, 2, 3, 4, 5]) === 15);

// 测试用例2: GPU每次可以执行的任务数等于每秒新增的任务数
console.log(minTimeToComplete(4, 4, [4, 4, 4, 4]) === 4);

// 测试用例3: 所有任务在一秒内都可以完成
console.log(minTimeToComplete(100, 3, [10, 20, 30]) === 3);

// 测试用例4: 任务数组长度为1，GPU一次可执行的任务数远大于任务数
console.log(minTimeToComplete(100, 1, [1]) === 1);

// 测试用例5: 任务数组长度为1，GPU一次可执行的任务数小于任务数
console.log(minTimeToComplete(1, 1, [100]) === 100);

// 测试用例6: 每秒新增的任务数恰好等于GPU一次最多执行的任务个数
console.log(minTimeToComplete(3, 5, [3, 3, 3, 3, 3]) === 5);

// 测试用例7: 大量任务和高执行能力，但不能完全匹配
console.log(minTimeToComplete(100, 5, [250, 300, 350, 400, 450]));

// 测试用例8: 大量任务和有限的执行能力，部分任务延后执行
console.log(minTimeToComplete(10, 5, [11, 12, 13, 14, 15]));

// 测试用例9: GPU每次可以执行的任务数远大于每秒新增的任务数
console.log(minTimeToComplete(10000, 5, [1, 2, 3, 4, 5]) === 5);

// 测试用例10: 任务数组中有零任务的秒数
console.log(minTimeToComplete(3, 6, [3, 0, 3, 0, 3, 0]) === 6);
