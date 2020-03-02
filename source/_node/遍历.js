var root = {
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

const root2 = {
  name: 1,
  children: [
    {
      name: 2,
      children: [{ name: 4 }, { name: 5 }]
    },
    {
      name: 3,
      children: [{ name: 6 }]
    }
  ]
};
// 广度优先结果：1，2，3，4，5，6
// 深度优先遍历分为先序遍历、中序遍历和后序遍历
// 先序遍历: 1，2，4，5，3，6 (根左右)
// 中序遍历: 4，2，5，1，3，6 (左根右)
// 后序遍历: 4，5，2，6，3，1 (左右根)

const resultArr = [];
const preOrderTraversal1 = function(node) {
  if (node) {
    resultArr.push(node.name);
    if (node.children && node.children.length) {
      node.children.map(item => {
        preOrderTraversal1(item);
      });
    } else {
      return;
    }
  }
  return resultArr;
};
console.log(preOrderTraversal1(root2));
