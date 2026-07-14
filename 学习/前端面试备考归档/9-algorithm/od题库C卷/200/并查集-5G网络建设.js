/**
 *
 * @题目描述
 * 需要在某城市进行 5G 网络建设，已经选取N个地点设置5G基站，编号固定为1到N，
 * 接下来需要各个基站之间使用光纤进行连接以确保基站能互联互通，不同基站之间假设光纤的成本各不相同，且有些节点之间已经存在光纤相连。
 * 请你设计算法，计算出能联通这些基站的最小成本是多少。
 * 注意：基站的联通具有传递性，比如基站A与基站B架设了光纤，基站B与基站C也架设了光纤，则基站A与基站C视为可以互相联通。
 *
 * @输入描述
 * 第一行输入表示基站的个数N，其中：0 < N ≤ 20
 * 第二行输入表示具备光纤直连条件的基站对的数目M，其中：0 < M < N * (N - 1) / 2
 * 从第三行开始连续输入M行数据，格式为
 * X Y Z P
 *
 * 其中：
 * X，Y 表示基站的编号
 *  · 0 < X ≤ N
 *  · 0 < Y ≤ N
 *  · X ≠ Y， Z 表示在 X、Y之间架设光纤的成本
 *  · 0 < Z < 100
 * P 表示是否已存在光纤连接，0 表示未连接，1表示已连接
 *
 * @输出描述
 * 如果给定条件，可以建设成功互联互通的5G网络，则输出最小的建设成本
 * 如果给定条件，无法建设成功互联互通的5G网络，则输出 -1
 *
 * @用例1
 * 输入
 * 3
 * 3
 * 1 2 3 0
 * 1 3 1 0
 * 2 3 5 0
 * 输出
 * 4
 * 说明
 * 只需要在1，2以及1，3基站之间铺设光纤，其成本为3+1=4
 *
 * @用例2
 * 输入
 * 3
 * 1
 * 1 2 5 0
 * 输出
 * -1
 * 说明
 * 3基站无法与其他基站连接，输出-1
 *
 * @用例3
 * 输入
 * 3
 * 3
 * 1 2 3 0
 * 1 3 1 0
 * 2 3 5 1
 * 输出
 * 1
 * 说明
 * 2，3基站已有光纤相连，只要在1，3基站之间铺设光纤，其成本为1
 */

/**
这个问题是典型的最小生成树（MST）问题，在无向图中找到一棵包含所有顶点的树，使得树上所有边的权值之和最小。
对于这个问题，可以使用Prim算法或Kruskal算法来解决。由于Kruskal算法对于边的处理更为直观，这里我们采用Kruskal算法。

Kruskal算法基本思路：
1. 将所有的边按照权值（本题中是成本）从小到大排序。
2. 初始化一个空的最小生成树，选取排序后的边列表中最小的边，如果这条边连接的两个顶点在最小生成树中未连通，则添加这条边到最小生成树中。
3. 重复步骤2，直到最小生成树中包含所有顶点或者所有的边都被检查过。
 */

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n + 1 }, (_, index) => index);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX !== rootY) {
      this.parent[rootX] = rootY;
    }
  }

  isConnected(x, y) {
    return this.find(x) === this.find(y);
  }
}

function minCostToConnectStations(N, connections) {
  let cost = 0;
  const uf = new UnionFind(N);

  // 先处理已经连接的边
  connections.filter(([, , , P]) => P === 1).forEach(([X, Y]) => uf.union(X, Y));

  // 对未连接的边按成本排序
  const sortedEdges = connections.filter(([, , , P]) => P === 0).sort((a, b) => a[2] - b[2]);

  for (let [X, Y, Z] of sortedEdges) {
    if (!uf.isConnected(X, Y)) {
      uf.union(X, Y);
      cost += Z;
    }
  }

  // 检查是否所有基站都已连通
  const roots = new Set();
  for (let i = 1; i <= N; i++) {
    roots.add(uf.find(i));
  }

  if (roots.size > 1) {
    return -1; // 无法连通所有基站
  }

  return cost;
}

// 测试用例
console.log(
  minCostToConnectStations(3, [
    [1, 2, 3, 0],
    [1, 3, 1, 0],
    [2, 3, 5, 0],
  ])
); // 输出：4
// console.log(
//   minCostToConnectStations(3, [
//     [1, 2, 3, 0],
//     [1, 3, 1, 0],
//     [2, 3, 5, 1],
//   ])
// ); // 输出：1
