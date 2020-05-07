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
              name: "D1"
            },
            {
              name: "D2",
              children: [{ name: "F1" }, { name: "F2" }, { name: "F3" }]
            },
            {
              name: "D3"
            }
          ]
        }
      ]
    },
    {
      name: "B2",
      children: [{ name: "C2" }, { name: "C3" }, { name: "C4" }]
    },
    {
      name: "B3"
    }
  ]
};

const resultArr = [];

const depthFirst = function(node) {
  if (!node) {
    return;
  }
  let stack = []; // 存放当前处理节点的所有子节点
  let arr = [];
  let tmpNode;
  stack.push(node);
  while (stack.length) {
    tmpNode = stack.shift();
    arr.push(tmpNode.name);
    if (tmpNode.children && tmpNode.children.length) {
      tmpNode.children.reverse().map(item => stack.unshift(item));
    }
  }
  return arr;
};
