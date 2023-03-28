/**
 * initialize your data structure here.
 */
var MinStack = function () {
  this.xStack = [];
  this.theMinStack = [Infinity];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.xStack.push(x);
  // 🔴 这个处理太牛了✅✅✅✅✅
  this.theMinStack.push(Math.min(this.theMinStack[this.theMinStack.length - 1], x));
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.xStack.pop();
  this.theMinStack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.xStack[this.xStack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.min = function () {
  return this.theMinStack[this.theMinStack.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */
