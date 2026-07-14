const fs = require("fs");
const cloneDeep = require("lodash/cloneDeep");

/**
 * 1. 同级增加
 * 2. 子级增加
 * 3. 删除当前节点
 * 4. 替换当前节点
 * 5. 复制当前节点
 * 6. 修改父节点
 * 7. 收集当前树所有节点 ids, 用作去重
 * 8. 收集当前节点，往向，所有子孙 ids, 用作更新节点
 * 9. 收集当前节点，往上，所有parent ids, 用作更新节点
 *
 *  ⬆️ 拓展性强一些，
 * 1. 只要在Node上增加方法就好了
 * 2. Node类型，可以通过传参/继承的方式
 *
 *------------------
 *
 * ⬇️
 * 目前行业景气框架中的实现，存在的问题
 *
 * 1. 新建节点自定义对象构建，维护性不太好，用构造函数/类，简便清晰明了
 * 2. 增删改查，都是通过自定的nodehash, 递归查到当前节点，性能会不太好，
 * 3. 操作步骤较麻烦，操作节点前都要先引入方法获取档期节点hash => dispatch => findNode => 更新整棵树的state
 * 4. 或组件嵌套较深，传进来的参数不全，则修改内容较为麻烦
 * 5. 从当前节点向上获取id, 目前无法实现
 *
 *
 */

/** Define Basic Node  */
var Node = function (name) {
  this.name = name;
  this.children = [];
  this.parentNode = null;
};

Node.prototype.appendChild = function (node) {
  node.parentNode = this;
  this.children.push(node);
};

Node.prototype.replaceChild = function (newNode, oldNode) {
  const oldNodeIndex = this.children.findIndex((it) => it === oldNode);
  this.children.splice(oldNodeIndex, 1, newNode);
};

Node.prototype.insertBefore = function (node) {};

Node.prototype.insertAfter = function (node) {};

Node.prototype.removeChild = function (node) {
  if (this.parentNode) {
    const newChildren = this.parentNode.children.filter((it) => it === node);
    this.parentNode.children = newChildren;
  }
};

Node.prototype.depend = function (namesResult = []) {
  console.log("开始扫描文件夹: " + this.name);
  namesResult.push(this.name);

  for (var i = 0, file, children = this.children; (file = children[i++]); ) {
    file.depend(namesResult);
  }
  return namesResult;
};

Node.prototype.dependParent = function (namesResult = []) {
  if (this.parentNode) {
    namesResult.push(this.parentNode.name);
  }

  if (this?.parentNode?.parentNode) {
    this.parentNode.dependParent(namesResult);
  }

  return namesResult;
};

/** to Create Data */

const rootNode = new Node("学习资料");
// 第一层
const node1 = new Node("node1");
const node2 = new Node("node2");
// 第二层
const node11 = new Node("node11");
const node21 = new Node("node21");
// 第三层
const node111 = new Node("node111");
// 第四层
const node1111 = new Node("node1111");

rootNode.appendChild(node1);
rootNode.appendChild(node2);
node1.appendChild(node11);
node2.appendChild(node21);

node11.appendChild(node111);

node111.appendChild(node1111);

////////////////////////////////////////////////////////////////
// const copyRootNode = cloneDeep(rootNode);
// fs.writeFileSync("/test2.json", copyRootNode);

////////////////////////////////////////////////////////////////

/** to Use */
const theNamesResult = node111.dependParent();
console.log(theNamesResult);
