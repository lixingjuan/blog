let arr = [3, 44, 38, 5, 47, 15, 88, 23, 21, 12, 333, 218, 36, 26, 27, 2, 46, 4, 19, 50, 48];

// 冒泡排序
const bubbleSort = (nums) => {
  let times = nums.length;
  while (times--) {
    let hadSwap = false;
    for (let i = 0; i < times; i++) {
      if (nums[i] > nums[i + 1]) {
        [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
        hadSwap = true;
      }
    }

    if (!hadSwap) {
      break;
    }
  }
  return nums;
};

console.log(bubbleSort(arr));
