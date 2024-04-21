/* 广度优先遍历 */
function breadthFirst(node) {
  if (!node) return;
  // 存放待循环队列
  let stack = [];
  // 存放遍历后的结果
  let nameResults = [];
  // 当前处理的节点
  let activeNode;

  stack.push(node);
  while (stack.length) {
    // stack 里面存的其实永远都是某个节点的所有子节点, 都是未遍历过的节点
    activeNode = stack.shift();
    // 每次都是一层遍历完再去遍历下一层
    // 拿到一个节点，就立刻把他的名字放到结果数组
    nameResults.push(activeNode.name);
    if (activeNode.children && activeNode.children.length) {
      // 当前节点的字节点们都放在当前
      activeNode.children.reverse().map((item) => stack.push(item));
    }
  }
  return nameResults;
}

const root = {
  name: "A",
  children: [
    {
      name: "B1",
      children: [
        {
          name: "C1",
          children: [
            {
              name: "D1",
            },
            {
              name: "D2",
              children: [{ name: "F1" }, { name: "F2" }, { name: "F3" }],
            },
            {
              name: "D3",
            },
          ],
        },
      ],
    },
    {
      name: "B2",
      children: [{ name: "C2" }, { name: "C3" }, { name: "C4" }],
    },
    {
      name: "B3",
    },
  ],
};

breadthFirst(root);
// ['A',  'B1', 'B2', 'B3','C1', 'C2', 'C3', 'C4','D1', 'D2', 'D3', 'F1','F2', 'F3']
