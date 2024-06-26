/**
 * @题目描述
 * 项目组共有N个开发人员，项目经理接到了M个独立的需求，每个需求的工作量不同，且每个需求只能由一个开发人员独立完成，不能多人合作。
 * 假定各个需求直接无任何先后依赖关系，请设计算法帮助项目经理进行工作安排，使整个项目能用最少的时间交付。
 *
 * @输入描述
 * 第一行输入为M个需求的工作量，单位为天，用逗号隔开。 例如：X1 X2 X3 .... Xm 表示共有M个需求，每个需求的工作量分别为X1天，X2天......Xm天。
 * 其中0<M<30；0<Xm<200 第二行输入为项目组人员数量N 例如： 5 表示共有5名员工，其中0<N<10
 *
 * @输出描述
 * 最快完成所有工作的天数 例如： 25 表示最短需要25天能完成所有工作
 *
 * @示例1
 * 输入：
 * 6 2 7 7 9 3 2 1 3 11 4
 * 2
 *
 * 输出：
 * 28
 *
 * 说明：
 * 共有两位员工，其中一位分配需求6 2 7 7 3 2 1共需要28天完成，另一位分配需求9 3 11 4共需要27天完成，故完成所有工作至少需要28天。
 */

function assignWork(workloads, N) {
  // 初始化开发人员工作量数组
  let devsWorkload = Array.from({ length: N }, () => 0);

  // 将工作量从大到小排序
  workloads.sort((a, b) => b - a);

  // 分配工作: 从小到大遍历工作，把当前工作分配给当前工作量最小的人员
  for (let workload of workloads) {
    const theMinWorkload = Math.min.apply(null, devsWorkload);
    // 找到工作量最小的开发人员并分配当前工作
    let minWorkloadIndex = devsWorkload.indexOf(theMinWorkload);
    devsWorkload[minWorkloadIndex] += workload;
  }

  // 返回完成所有工作的最短时间，即最大工作量
  return Math.max.apply(null, devsWorkload);
}

// 测试用例
console.log(assignWork([6, 2, 7, 7, 9, 3, 2, 1, 3, 11, 4], 2)); // 应输出28
console.log(assignWork([10, 10, 10, 10], 4)); // 应输出10
console.log(assignWork([1, 1, 1, 1], 1)); // 应输出4
console.log(assignWork([5, 5, 5, 5, 5, 5, 5, 5], 4)); // 应输出10
console.log(assignWork([1, 2, 3, 4, 5], 2)); // 应输出8
console.log(assignWork([100, 200, 300, 400, 500], 3)); // 应输出900
