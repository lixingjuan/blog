# 🌿二叉树三种遍历 和 多叉树 深度优先遍历和广度优先遍历

## 二叉树遍历

```javascript
const root2 = {
  name: 1,
  left: {
    name: 2,
    left: { name: 4 },
    right: { name: 5 }
  },
  right: {
    name: 3,
    left: { name: 6 }
  }
};
//       1
//   2      3
// 4   5  6
/* 三种遍历的结果 */
// 先序遍历 => [ 1, 2, 4, 5, 3, 6 ]
// 中序遍历 => [ 4, 2, 5, 1, 6, 3 ]
// 后续遍历 => [ 4, 5, 2, 6, 3, 1 ]
```
### 先序遍历（根左右）

```javascript
/* 先序遍历 */
const preOrderResultArr = [];
const preOrder = function(node) {
  if (node) {
    preOrderResultArr.push(node.name);
    preOrder(node.left);
    preOrder(node.right);
  }
  return preOrderResultArr;
};
preOrder(root2); // [ 1, 2, 4, 5, 3, 6 ]
```
### 中序遍历（左根右）

```javascript
/* 中序遍历 */
const minOrderResultArr = [];
const minOrder = function(node) {
  if (node) {
    minOrder(node.left);
    minOrderResultArr.push(node.name);
    minOrder(node.right);
  }
  return minOrderResultArr;
};
minOrder(root2);  // [ 4, 2, 5, 1, 6, 3 ]
```
### 后序遍历（左右根）

```javascript
/* 后续遍历 */
const postOrderResultArr = [];
const postOrder = function(node) {
  if (node) {
    postOrder(node.left);
    postOrder(node.right);
    postOrderResultArr.push(node.name);
  }
  return postOrderResultArr;
};
postOrder(root2); // [ 4, 5, 2, 6, 3, 1 ]
```

## 多叉树 广度优先/深度优先遍历

```javascript
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

//                      A
//        B1            B2        B3
//        C1        C2  C3  C4
//  D1    D2    D3 
//     F1 F2 F3
// 广度优先结果：1，2，3，4，5，6
// 深度优先结果：

```

### 深度优先遍历

```javascript
/* 递归 */
const resultArr = [];
const DepthFirst1 = function(node) {
  if (node) {
    resultArr.push(node.name);
    if (node.children && node.children.length) {
      node.children.map(item => {
        DepthFirst1(item);
      });
    } else {
      return;
    }
  }
  return resultArr;
};


/* 非递归 */
const DepthFirst2 = function(node) {
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
      tmpNode.children.reverse().map(item => stack.unshift(item)); // !!广度和深度唯一的区别在这里
    }
  }
  return arr;
};

DepthFirst1(root);
DepthFirst2(root);
// ['A',  'B1', 'C1', 'D1','D2', 'F1', 'F2', 'F3','D3', 'B2', 'C2', 'C3', 'C4', 'B3']

```

### 广度优先遍历

```javascript

/* 广度优先遍历 */
function breadthFirst(node) {
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

breadthFirst(root);
// ['A',  'B1', 'B2', 'B3','C1', 'C2', 'C3', 'C4','D1', 'D2', 'D3', 'F1','F2', 'F3']

```


## 数组的方法回顾

| 方法           | 参数       | 作用                 | 返回值       |
|----------------|------------|----------------------|--------------|
| arr.unshift(1) | 要插入的值 | 向数组头部插入一个值 | 新数组length |
| arr.shift()    | 无         | 从数组头部取出一个值 | 取出的值     |
| arr.push(1)    | 要放入的值 | 向数组尾部放入一个值 | 新数组length |
| arr.pop()      | 无         | 从数组尾部取出一个值 | 取出的值     |
| arr.reverse()  | 无         | 反转数组的值         |              |






## 应用

1. 深度优先遍历：vue源码，createComponent的时候，使用的深度优先遍历，将vnode， push进数组，先子后父