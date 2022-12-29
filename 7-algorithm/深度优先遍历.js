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

/* ****************************************************************************************************
 *                                    递归
 ************************************************************************************************* */
const DepthFirst1 = function (root) {
  const result = [];

  const dfs = (node) => {
    if (node) {
      result.push(node.name);
      if (node.children && node.children.length) {
        node.children.map((item) => {
          dfs(item);
        });
      } else {
        return;
      }
    }
    return result;
  };

  return result;
};

/* ****************************************************************************************************
 *                                    迭代
 ************************************************************************************************* */
const DepthFirst2 = function (node) {
  if (!node) {
    return;
  }
  let stack = []; // 存放待循环队列
  let arr = []; // 存放遍历后的结果
  let tmpNode; // 当前处理的节点
  stack.push(node);

  while (stack.length) {
    // stack 里面存的其实永远都是某个节点的所有子节点, 都是未遍历过的节点
    tmpNode = stack.shift();
    arr.push(tmpNode.name);
    if (tmpNode.children && tmpNode.children.length) {
      tmpNode.children.reverse().map((item) => stack.unshift(item)); // !!广度和深度唯一的区别在这里
    }
  }
  return arr;
};

console.log(DepthFirst1(root));
console.log(DepthFirst2(root));
