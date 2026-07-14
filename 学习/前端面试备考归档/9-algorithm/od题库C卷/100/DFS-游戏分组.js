/**
 * @题目描述
 * 部门准备举办一场王者荣耀表演赛，有 10 名游戏爱好者参与，分为两队，每队 5 人。
 *
 * 每位参与者都有一个评分，代表着他的游戏水平。为了表演赛尽可能精彩，我们需要把 10 名参赛者分为实力尽量相近的两队。
 *
 * 一队的实力可以表示为这一队 5 名队员的评分总和。
 *
 * 现在给你 10 名参与者的游戏水平评分，请你根据上述要求分队，最后输出这两组的实力差绝对值。
 *
 * @输入描述
 * 10 个整数，表示 10 名参与者的游戏水平评分。范围在 [1,10000] 之间。
 *
 * @输出描述
 * 实力最相近两队的实力差绝对值。
 * 示例1
 * 输入：
 * 1 2 3 4 5 6 7 8 9 10
 *
 * @输出
 * 1
 * 说明：
 * 10 名队员分为两组，两组实力差绝对值最小为 1
 */
function findMinDifference(scores) {
  let minDiff = Infinity; // 用于记录最小实力差
  const totalScore = scores.reduce((sum, score) => sum + score, 0); // 计算总评分

  // DFS函数，index为当前考虑的玩家索引，teamAScore为队伍A的评分总和，teamACount为队伍A的人数
  function dfs(index, teamAScore, teamACount) {
    if (index === scores.length) {
      // 所有玩家都考虑完毕
      if (teamACount === 5) {
        // 确保队伍A有5人
        const teamBScore = totalScore - teamAScore; // 队伍B的评分总和
        const diff = Math.abs(teamAScore - teamBScore); // 计算实力差
        minDiff = Math.min(minDiff, diff); // 更新最小实力差
      }
      return;
    }

    // 尝试将当前玩家分配给队伍A（如果队伍A的人数少于5）
    if (teamACount < 5) {
      dfs(index + 1, teamAScore + scores[index], teamACount + 1);
    }

    // 尝试将当前玩家分配给队伍B（即不增加队伍A的评分和人数）
    dfs(index + 1, teamAScore, teamACount);
  }

  dfs(0, 0, 0); // 从第一个玩家开始，队伍A的评分和人数均为0
  return minDiff; // 返回找到的最小实力差
}

// 测试数据
const scores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(findMinDifference(scores)); // 应该输出实力差的最小值
