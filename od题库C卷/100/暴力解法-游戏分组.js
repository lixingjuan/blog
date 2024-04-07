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

/**
 * 1.开始时，path是空的。
 * 2.选择数字1加入path，path变为[1]。
 * 3.接下来，选择数字2加入path，path变为[1, 2]。这是一个完整的组合，我们记录下来。
 * 4.然后，我们需要回溯，尝试其他可能的组合。调用path.pop()，移除path中的最后一个元素（数字2），path变回[1]。
 * 5.现在，path又回到了只有数字1的状态，我们可以尝试选择数字3作为下一个选择。
 */
function generateCombinations(n, k) {
  let results = [];
  function backtrack(start, path) {
    if (path.length === k) {
      results.push([...path]);
      return;
    }
    for (let i = start; i <= n; i++) {
      path.push(i);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  backtrack(1, []);
  console.log(results);
  return results;
}

function minScoreDiff(players) {
  let allCombinations = generateCombinations(10, 5);
  let minDiff = Infinity;
  const totalScore = players.reduce((a, b) => a + b, 0);

  allCombinations.forEach((combination) => {
    let team1Score = combination.reduce((acc, val) => acc + players[val - 1], 0);
    let team2Score = totalScore - team1Score;
    let diff = Math.abs(team1Score - team2Score);
    minDiff = Math.min(minDiff, diff);
  });

  return minDiff;
}

const players = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(minScoreDiff(players));
