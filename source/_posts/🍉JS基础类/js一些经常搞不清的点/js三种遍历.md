
## 广度优先/深度优先结果

```javascript
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
```

## 1. 首先回顾下数组的方法

| 方法           | 参数       | 作用                 | 返回值       |
|----------------|------------|----------------------|--------------|
| arr.unshift(1) | 要插入的值 | 向数组头部插入一个值 | 新数组length |
| arr.shift()    | 无         | 从数组头部取出一个值 | 取出的值     |
| arr.push(1)    | 要放入的值 | 向数组尾部放入一个值 | 新数组length |
| arr.pop()      | 无         | 从数组尾部取出一个值 | 取出的值     |
| arr.reverse()  | 无         | 反转数组的值         |              |

## 先序遍历
1. 根左右：
  - 一个节点，优先访问根结点，然后访问左孩子和右孩子
2. 代码举例

```javascript

/* 深度优先 */
/* 先序遍历-迭代-根左右 */
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


/* 先序遍历-非迭代-根左右 */
const preorderTraversal2 = function(node) {
  if (!node) {
    return;
  }
  let stack = []; // 存放待循环队列
  let arr = []; // 存放遍历后的结果
  let tmpNode; // 当前处理的节点
  stack.push(node);
  while (stack.length) {
    tmpNode = stack.shift(); // !!
    arr.push(tmpNode.name);
    if (tmpNode.children && tmpNode.children.length) {
      tmpNode.children.reverse().map(item => stack.unshift(item)); // !!广度和深度唯一的区别在这里
    }
  }
  return arr;
};
preorderTraversal1(root);
preorderTraversal2(root);
// ['A',  'B1', 'C1', 'D1','D2', 'F1', 'F2', 'F3','D3', 'B2', 'C2', 'C3', 'C4', 'B3']


// 广度优先遍历
function breadthFirstSearch(node) {
  if (!node) {
    return;
  }
  let stack = []; // 存放待循环队列
  let arr = []; // 存放遍历后的结果
  let tmpNode; // 当前处理的节点

  stack.push(node);
  while (stack.length) {
    // stack 里面存的其实永远都是某个节点的所有字节点
    tmpNode = stack.shift();
    // 每次都是一层遍历完再去遍历下一层
    // 拿到一个节点，就立刻把他的名字放到结果数组
    arr.push(tmpNode.name);
    if (tmpNode.children && tmpNode.children.length) {
      // 当前节点的字节点们都放在当前
      tmpNode.children.reverse().map(item => stack.push(item));
    }
  }
  return arr;
}

breadthFirstSearch(root);
// ['A',  'B1', 'B2', 'B3','C1', 'C2', 'C3', 'C4','D1', 'D2', 'D3', 'F1','F2', 'F3']

```

