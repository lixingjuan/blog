/**
 * @题目描述
 * 假定街道是棋盘型的，每格距离相等，车辆通过每格街道需要时间均为 timePerRoad；
 * 街道的街口（交叉点）有交通灯，灯的周期T(=lights[row][col])各不相同；
 *
 * 车辆可直行、左转和右转，其中直行和左转需要等相应T时间的交通灯才可通行，右转无需等待。
 *
 * 现给出 n*m 个街口的交通灯周期，以及起止街口的坐标，计算车辆经过两个街口的最短时间。
 *
 * 其中：
 *
 * 1）起点和终点的交通灯不计入时间，且可以任意方向经过街口
 * 2）不可超出 n*m 个街口，不可跳跃，但边线也是道路（即 lights[0][0] -> lights[0][1] 是有效路径）
 *
 * 输入描述
 * 输入描述
 * 入口函数定义:
 * lights : n*m 个街口每个交通灯的周期，值范围[0,120]，n和m的范围为[1,9]
 * timePerRoad : 相邻两个街口之间街道的通过时间,范围为[0,600]
 * rowStart : 起点的行号
 * colStart : 起点的列号
 * rowEnd : 终点的行号
 * colEnd :
 */

function shortestTime(lights, timePerRoad, rowStart, colStart, rowEnd, colEnd) {
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]; // 右、下、左、上

  const n = lights.length,
    m = lights[0].length;

  const queue = [[rowStart, colStart, 0]]; // [row, col, time]
  const visited = Array.from({ length: n }, () => Array.from({ length: m }, () => false));

  visited[rowStart][colStart] = true;

  while (queue.length > 0) {
    const [row, col, time] = queue.shift();
    if (row === rowEnd && col === colEnd) return time; // 到达终点

    directions.forEach(([dRow, dCol], index) => {
      const newRow = row + dRow,
        newCol = col + dCol;

      if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < m && !visited[newRow][newCol]) {
        visited[newRow][newCol] = true;
        let newTime = time + timePerRoad; // 移动到下一个交叉点的时间
        // 计算等待时间
        // 对于直行和左转，需要等待交通灯；右转不需要等待
        // 假设方向为右->下->左->上，右转即下一方向是当前方向的下一个
        const lightTime = lights[row][col];
        if (lightTime > 0) {
          // 如果交通灯周期大于0，计算等待时间
          const totalTime = time + timePerRoad; // 到达新交叉点的总时间
          const waitTime = lightTime - (totalTime % lightTime); // 计算在新交叉点等待的时间
          newTime += waitTime; // 加上等待时间
        }
        queue.push([newRow, newCol, newTime]);
      }
    });
  }

  return -1; // 如果无法到达终点
}

// 示例调用
const lights = [
  [2, 3],
  [3, 2],
];
const timePerRoad = 1;
console.log(shortestTime(lights, timePerRoad, 0, 0, 1, 1)); // 应根据实际情况调整示例输入
