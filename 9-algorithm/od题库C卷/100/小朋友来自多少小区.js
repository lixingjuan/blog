/**
 * @题目描述
 * 幼儿园组织活动，老师布置了一个任务：
 *
 * 每个小朋友去了解与自己同一个小区的小朋友还有几个。
 * 我们将这些数量汇总到数组 garden 中。
 * 请根据这些小朋友给出的信息，计算班级小朋友至少来自几个小区？
 *
 * @输入描述
 *  输入：garden[] = {2, 2, 3}
 *  说明：
 *  garden 数组长度最大为 999
 *  每个小区的小朋友数量最多 1000 人，也就是 garden[i] 的范围为 [0, 999]
 *
 * @示例1
 * 输入：
 * 2 2 3
 *
 * 输出：
 * 7
 *
 * 说明：
 * 第一个小朋友反馈有两个小朋友和自己同一小区，即此小区有3个小朋友。
 * 第二个小朋友反馈有两个小朋友和自己同一小区，即此小区有3个小朋友。
 * 这两个小朋友，可能是同一小区的，且此小区的小朋友只有3个人。
 * 第三个小区反馈还有3个小朋友与自己同一小区，则这些小朋友只能是另外一个小区的。这个小区有4个小朋友。
 */

/**
 * 有一个博主说题目出的有问题，实际要求返回的是至少有多少小朋友
 * 题目中的{2, 2, 3}，感觉也不合理
 * 所以以下解答是按照小朋友解答的
 * */

function minCommunities(garden) {
  // 记录每个数量出现的次数
  const countsMap = garden.reduce((pre, cur) => pre.set(cur, (pre.get(cur) || 0) + 1), new Map());

  let minCommunities = 0;

  // num 表示，小朋友报告的，和自己同小区的小朋友数量
  // count表示，报告这个num的小朋友数量
  for (let [num, count] of countsMap.entries()) {
    // 计算每个数量小朋友，对应的最小小区数
    const communitiesForThisCount = Math.ceil(count / (num + 1)); // 加上1，是要加上当前小朋友
    minCommunities += communitiesForThisCount * (num + 1);
  }

  return minCommunities;
}

// 示例
console.log(minCommunities([2, 2, 3])); // 应输出7
// 假设所有小朋友都来自不同的小区，
console.log(minCommunities([0, 0, 0, 0])); // 应输出4
// 假设有一大群小朋友实际上来自同一个小区，他们每个人报告的同小区小朋友数量相同。
console.log(minCommunities([3, 3, 3, 3])); // 应输出1
