<%- list_categories([options]) %>


# 目录 - JavaScript实现深度遍历和广度遍历
1. 回顾数组本篇使用的五个方法
2. 深度优先遍历 (递归方法)   思路+代码
3. 深度优先遍历 (非递归方法) 思路+代码
4. 广度优先遍历 (非递归方法) 思路+代码

# JavaScript实现深度遍历和广度遍历


> 题目:遍历root拿到所有的 'name' 值

```javascript
var root = {
      name: 'A',
      children: [
        { 
          name: 'B1',
          children: [
            { 
              name: 'C1',
              children: [
                { 
                  name: 'D',
                  children: [
                    { 
                      name: 'D1',
                      children:[
                        {name:'F1'},{name:'F2'},
                      ]
                    }, { name: 'D2' }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'B2',
          children: [ {name: 'C2' }, { name: 'C3' } ]
        }
      ]
    }
```

## 1. 首先回顾下数组的方法

| 方法           | 参数       | 作用                 | 返回值       |
|----------------|------------|----------------------|--------------|
| arr.unshift(1) | 要插入的值 | 向数组头部插入一个值 | 新数组length |
| arr.shift()    | 无         | 从数组头部取出一个值 | 取出的值     |
| arr.push(1)    | 要放入的值 | 向数组尾部放入一个值 | 新数组length |
| arr.pop()      | 无         | 从数组尾部取出一个值 | 取出的值     |
| arr.reverse()  | 无         | 反转数组的值         |              |

## 2. 深度优先遍历 => 递归遍历 => 前序遍历

> 前序遍历: 根节点--> 左节点 --> 右节点

```JavaScript
let arr = [];     // 存放遍历得到的 'name' 的值
function traverseTree(node) {
  if (!node) {
    return;
  }
  arr.push(node.name)
  if (node.children && node.children.length > 0) {
    node.children.map(item => this.traverseTree(item))
  }
  return arr
}
traverseTree(root);
```


## 深度优先遍历 (非递归方法) 思路+代码

> 思路: 1:声明一个数组用于存放所有的节点; 通过循环依次从数组stack头部中拿出一个节点进行遍历,若其有子节点,则将其子节点放入stack队头,若无则再次进入循环, 

```JavaScript
function traverseTree2(node) {
  if (!node) {
    return;
  }
  let stack = [];   // 存放待循环队列
  let arr = [];     // 存放遍历后的结果
  let tmpNode;      // 当前处理的节点
  stack.push(node);
  while (stack.length) {
    tmpNode = stack.shift(); // !!
    arr.push(tmpNode.name)
    if (tmpNode.children && tmpNode.children.length) {
      tmpNode.children.reverse().map(item => stack.unshift(item))  // !!广度和深度唯一的区别在这里
    }
  }
  return arr
}
```


## 广度优先遍历 (非递归方法) 思路+代码

> 思路: 与深度优先唯一不同的是遍历遍历当前节点的子节点时, 是将其放在stack的尾部还是头部


```JavaScript
function traverseTree3(node) {
  if (!node) {
    return;
  }
  let stack = [];   // 存放待循环队列
  let arr = [];     // 存放遍历后的结果
  let tmpNode;      // 当前处理的节点

  stack.push(node);
  while (stack.length) {
    tmpNode = stack.shift();   // !!
    // 当前节点的'name'属性放进arr
    arr.push(tmpNode.name);
    if (tmpNode.children && tmpNode.children.length) {
      tmpNode.children.map(item => stack.push(item)) // !!
    }
  }
  return arr;
}
```

