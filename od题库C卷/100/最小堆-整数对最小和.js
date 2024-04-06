/**
 * @题目描述
 * 给定两个整数数组array1、array2，数组元素按升序排列。
 * 假设从array1、array2中分别取出一个元素可构成一对元素，现在需要取出k对元素，并对取出的所有元素求和，计算和的最小值。
 * 注意：两对元素如果对应于array1、array2中的两个下标均相同，则视为同一对元素。
 *
 * @输入描述
 * 输入两行数组array1、array2，每行首个数字为数组大小size(0 < size <= 100);
 *
 * 0 <array1[i] <=1000
 *
 * 0 <array2[i] <= 1000
 *
 * 接下来一行为正整数 k
 *
 * 0 < k <= array1.size() * array2.size()
 *
 * @输出描述
 * 满足要求的最小和
 *
 * 示例1
 * 输入：
 * 3 1 1 2
 * 3 1 2 3
 * 2
 *
 * 输出：
 * 4
 *
 * 说明：
 * 用例中，需要取2对元素
 * 取第一个数组第1个元素与第二个数组第1个元素组成1对元素[1,1];
 * 取第一个数组第2个元素与第二个数组第1个元素组成1对元素[1,1];
 * 求和为1+1+1+1=4，为满足要求的最小和
 */

/**
 * 两个解题思路
 * 1. 暴力解法，枚举所有可能的情况，升序排列，选择前k个
 * 2. 小根堆
 */

class MinHeap {
  constructor() {
    // [sum, i, j]
    this.heap = [];
  }
  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }
  getLeftChildIndex(i) {
    return 2 * i + 1;
  }
  getRightChildIndex(i) {
    return 2 * i + 2;
  }
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }
  bubbleUp(index) {
    let parentIndex = this.getParentIndex(index);
    while (index > 0 && this.heap[index][0] < this.heap[parentIndex][0]) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = this.getParentIndex(index);
    }
  }
  sinkDown(index) {
    let smallest = index;
    const leftChildIndex = this.getLeftChildIndex(smallest);
    const rightChildIndex = this.getRightChildIndex(smallest);
    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex][0] < this.heap[smallest][0]
    ) {
      smallest = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex][0] < this.heap[smallest][0]
    ) {
      smallest = rightChildIndex;
    }

    if (smallest !== index) {
      this.swap(index, smallest);
      this.sinkDown(smallest);
    }
  }
  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown(0);
    return min;
  }
}

const kSmallestPairs = (array1, array2, k) => {
  const minHeap = new MinHeap();
  const result = [];
  for (let i = 0; i < array1.length; i++) {
    minHeap.insert([array1[i] + array2[0], i, 0]);
  }

  while (k > 0 && minHeap.heap.length > 0) {
    const [sum, i, j] = minHeap.extractMin();
    result.push(array1[i] + array2[j]);
    k--;

    // 数组2仍然有值
    if (j + 1 < array2.length) {
      minHeap.insert([array1[i] + array2[j + 1], i, j + 1]);
    }
  }
  return result.reduce((pre, cur) => pre + cur, 0);
};

// 测试用例 0: 常规情况
console.log(kSmallestPairs([1, 1, 2], [1, 2, 3], 2));
// 测试用例 1: 常规情况
console.log(kSmallestPairs([1, 7, 11], [2, 4, 6], 3)); // 应输出最小和

// 测试用例 2: 两个数组中的一个只有一个元素
console.log(kSmallestPairs([1, 1, 2], [1], 2)); // 应输出最小和

// 测试用例 3: k值大于所有可能的组合数
console.log(kSmallestPairs([1, 2], [3], 3)); // 应输出最小和

// 测试用例 4: 包含更大的数字和更多的k值
console.log(kSmallestPairs([1, 2, 4, 5, 6], [3, 5, 7, 9], 7)); // 应输出最小和

// 测试用例 5: 测试极端情况，两个数组的大小不等
console.log(kSmallestPairs([1, 1, 2, 4], [1, 2, 3], 10)); // 应输出最小和

// 测试用例 6: 包含重复元素的情况
console.log(kSmallestPairs([1, 2, 2, 2, 3], [1, 1, 2], 5)); // 应输出最小和

// 测试用例 7: 较大的k值
console.log(kSmallestPairs([1, 3, 11], [2, 4, 8], 9)); // 应输出最小和
