/**
 * @题目描述
 * 宝宝和妈妈参加亲子游戏，在一个二维矩阵(N*N)的格子地图上，宝宝和妈妈抽签决定各自的位置，地图上每个格子有不同的糖果数量，部分格子有障碍物。
 * 游戏规则是妈妈必须在最短的时间(每个单位时间只能走一步)到达宝宝的位置，路上的所有糖果都可以拿走，不能走障碍物的格子，只能上下左右走时间到达的情况下尽可能多拿糖果)。
 * 请问妈妈在最短到达宝宝位置的时间内最多拿到多少糖果(优先考虑最短时间到达的情况下尽可能多拿糖果)
 *
 * @输入描述
 * 第一行输入为 N，N 表示二维矩阵的大小之后 N 行，每行有 N个值，表格矩阵每个位置的值，其中:
 * -3: 妈妈
 * -2: 宝宝
 * -1: 障碍
 * >=0: 糖果数(0表示没有糖果，但是可以走)
 *
 * @输出描述
 * 输出妈妈在最短到达宝宝位置的时间内最多拿到多少糖果，行末无多余空格
 *
 * @用例1
 * 输入
 * 4
 * 2 3 2 1 -3
 * 3 1 -1 1 1
 * 4 1 1 -1 2
 * 5 -2 1 2 3
 * 输出
 * 1 9
 * 说明
 * 此地图有两条最短路径可到达宝宝位置，绿色线和黄色线都是最短路径6步，但黄色拿到的糖果更多，9个
 *
 * @用例2
 * 输入
 * 4
 * 2 3 2 1 -3
 * 3 -1 -1 1 1
 * 4 11 -1 2
 * 5 -2 1 -1 3
 * 输出
 * -1
 * 说明
 * 此地图妈妈无法到达宝宝位置
 */

function findMaxCandies(grid) {
  let rows = grid.length;
  let cols = grid[0].length;
  let visited = Array.from(Array(rows), () => Array(cols).fill(false));

  let maxCandies = 0;
  let steps = Number.MAX_SAFE_INTEGER;

  // 初始化起点和终点
  let startX, startY, endX, endY;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === -3) {
        startX = i;
        startY = j;
        visited[startX][startY] = true;
      } else if (grid[i][j] === -2) {
        endX = i;
        endY = j;
      }
    }
  }

  let queue = [[startX, startY, 0, 0]]; // [x, y, candies, steps]

  while (queue.length > 0) {
    let [x, y, candies, step] = queue.shift();

    if (grid[x][y] === -2) {
      if (step < steps || (step === steps && candies > maxCandies)) {
        maxCandies = candies;
        steps = step;
      }
      continue;
    }

    const inner = (nx, ny) => {
      // 新坐标超边界
      if (nx < 0 || nx >= rows || ny < 0 || ny >= cols) {
        return;
      }

      // 障碍物 或 已访问
      if (grid[nx][ny] === -1) return;
      if (visited[nx][ny]) return;

      visited[nx][ny] = true;
      let newCandies = candies + Math.max(grid[nx][ny], 0);
      queue.push([nx, ny, newCandies, step + 1]);
    };

    inner(x, y + 1);
    inner(x + 1, y);
    inner(x - 1, y);
    inner(x, y - 1);
  }

  if (maxCandies === 0 && steps === Number.MAX_SAFE_INTEGER) {
    return -1;
  } else {
    return maxCandies;
  }
}

console.log(
  findMaxCandies([
    [3, 2, 1, -3],
    [1, -1, 1, 1],
    [1, 1, -1, 2],
    [-2, 1, 2, 3],
  ])
);

console.log(
  findMaxCandies([
    [3, 2, 1, -3],
    [-1, -1, 1, 1],
    [1, 1, -1, 2],
    [-2, 1, -1, 3],
  ])
);
