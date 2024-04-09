/**
 * @题意
 * 给定一个二叉树，每个节点上站着一个人，节点数字表示父节点到该节点传递悄悄话需要花费的时间。初始时，根节点所在位置的人有一个悄悄话想要传递给其他人，求二又树所有节点上的，都接收到悄悄话花费的时间。
 *
 * @输入
 * 给定一叉树
 * 0 9 20 -1 -1 15 7 -1 -1 -1 -1 3 2
 * 注:-1表示空节点
 *
 * @输出
 * 返回所有节点都接收到悄悄话花费的时间38
 * @示例1
 * 输入: 0 9 20 -1 -1 15 7 -1 -1 -1 -1 3 2
 * 输出: 38
 */

/**
 * 解题思路：实际上要求的是整个树中耗时最长的一条线路
 * （冷笑话：整红薯要10分钟，蒸鸡蛋要5分钟，蒸一个两个红薯一个鸡蛋要多久？）
 * */

function whisperTime(arr) {
  let maxTime = 0; // 用于记录所有节点接收到悄悄话的最长时间

  function dfs(idx, parentNodeTime) {
    // 检查当前节点是否存在
    if (idx >= arr.length || arr[idx] === -1) return;

    // 当前节点的时间 = 父节点时间 + 当前节点的值
    let newTime = parentNodeTime + arr[idx];

    // 更新最长时间
    maxTime = Math.max(maxTime, newTime);

    // 继续深入左右子节点
    // !! 这个规则很重要：左节点index = 2*rootIndex + 1; 右节点index = 2 * rootIndex +2；
    dfs(2 * idx + 1, newTime); // 访问左子节点
    dfs(2 * idx + 2, newTime); // 访问右子节点
  }

  // 从根节点开始，当前的时间为0
  dfs(0, 0);

  // 返回最长时间
  return maxTime;
}

// 测试示例
let arr = [0, 9, 20, -1, -1, 15, 7, -1, -1, -1, -1, 3, 2];
console.log(whisperTime(arr)); // 应该输出正确的最长时间
