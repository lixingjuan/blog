/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.memoMap = new Map();
  this.capacity = capacity;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.memoMap.has(key)) {
    const val = this.memoMap.get(key);
    this.memoMap.delete(key);
    this.memoMap.set(key, val);
    return val;
  }
  return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  // 如果已经存在，则删除原来的元素，后面再添加新元素
  if (this.memoMap.has(key)) {
    this.memoMap.delete(key);
  }

  // 判断是否超长
  if (this.memoMap.size > this.capacity - 1) {
    // !! this.memoMap.keys().next().value => 获取第一个元素的key
    this.memoMap.delete(this.memoMap.keys().next().value);
  }
  this.memoMap.set(key, value);
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

const lRUCache = new LRUCache(2);
console.log(lRUCache.put(1, 1)); // 缓存是 {1=1}
console.log(lRUCache.put(2, 2)); // 缓存是 {1=1, 2=2}
console.log(lRUCache.get(1)); // 返回 1
console.log(lRUCache.put(3, 3)); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
console.log(lRUCache.get(2)); // 返回 -1 (未找到)
console.log(lRUCache.put(4, 4)); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
console.log(lRUCache.get(1)); // 返回 -1 (未找到)
console.log(lRUCache.get(3)); // 返回 3
console.log(lRUCache.get(4)); // 返回 4
