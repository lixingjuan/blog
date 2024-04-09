/**
 * @题目描述
 * 一个局域网只内有很多台电脑，分别标注为 1 ~ N 的数字。相连接的电脑距离不一样，所以感染时间不一样，感染时间用t 表示。
 * 其中网络内一台电脑被病毒感染，求其感染网络内所有的电脑最少需要多长时间。如果最后有电脑不会感染，则返回-1。
 * 给定一个数组 times 表示一台电脑把相邻电脑感染所用的时间: path[i] = {i, j, t} 表示: 电脑i 上的病毒感染 j，需要时间 t 。
 *
 * @输入描述
 * 第一行输入一个整数N，表示局域网内电脑个数 N，1<= N<= 200 ；
 *
 * 第二行输入一个整数M, 表示有 M 条网络连接；
 *
 * 接下来M行, 每行输入为 i,j,t 。表示电脑 i 感染电脑 j 需要时间t。(1 <= i, j <= N)
 *
 * 最后一行为病毒所在的电脑编号。
 *
 * @输出描述
 * 输出最少需要多少时间才能感染全部电脑，如果不存在输出 -1
 *
 * @示例1
 * 1 => 2 => 3 => 4
 * 输入：
 * 4
 * 3
 * 2 1 1
 * 2 3 1
 * 3 4 1
 * 2
 *
 * 输出：
 * 2
 *
 * @示例2
 * 输入：
 * 4
 * 3
 * 2 1 1
 * 2 3 1
 * 3 4 1
 * 3
 *
 * 输出：
 * -1
 */

function minInfectionTime(N, M, paths, virus) {
  // 建立图的邻接表表示
  let graph = Array.from({ length: N + 1 }, () => []);
  paths.forEach(([i, j, t]) => {
    graph[i].push([j, t]);
  });

  console.log({ graph });

  // 初始化距离数组，所有值设为无穷大，除了病毒所在电脑设为0
  let dist = new Array(N + 1).fill(Infinity);
  dist[virus] = 0;

  // 使用Dijkstra算法更新距离
  let visited = new Array(N + 1).fill(false);

  for (let count = 0; count < N; count++) {
    let u = -1;
    for (let i = 1; i <= N; i++) {
      if (!visited[i] && (u === -1 || dist[i] < dist[u])) {
        u = i;
      }
    }
    if (dist[u] === Infinity) break; // 未访问的节点中距离都是无穷大
    visited[u] = true;
    for (let [v, time] of graph[u]) {
      dist[v] = Math.min(dist[v], dist[u] + time);
    }
  }

  // 检查是否所有电脑都被感染
  let maxTime = Math.max(...dist.slice(1));
  return maxTime === Infinity ? -1 : maxTime;
}

// 示例
console.log(
  minInfectionTime(
    4,
    3,
    [
      [2, 1, 1],
      [2, 3, 1],
      [3, 4, 1],
    ],
    2
  )
); // 输出：2

console.log(
  minInfectionTime(
    4,
    3,
    [
      [2, 1, 1],
      [2, 3, 1],
      [3, 4, 1],
    ],
    3
  )
); // 输出：-1
