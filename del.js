/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  const getArea = ({left, right, leftIndex, rightIndex}) => {
    return Math.min(left, right) * (rightIndex - leftIndex);
  }

  // 数组补齐偶数
  let newHeight = height.length % 2 ? [...height, 0] : height;

  const len = newHeight.length;

  const times = len / 2;

  // 左指针，右指针
  let leftIndex = 0;
  let rightIndex = len - 1;

  let left = newHeight[leftIndex];
  let right = newHeight[rightIndex];



  for (let i = 1; i < times; i++) {
    const backLeftIndex = i;
    const backLeft = newHeight[backLeftIndex]
    if (
      getArea({ left: backLeft, right, leftIndex: backLeftIndex, rightIndex }) >
      getArea({ left, right, leftIndex, rightIndex })
    ) {
      left = backLeft;
      leftIndex = backLeftIndex;
    }

    const backRightIndex = len - i - 1;
    const backRight = newHeight[backRightIndex];
    if (
      getArea({ left, right: backRight, leftIndex, rightIndex: backRightIndex }) >=
      getArea({ left, right, leftIndex, rightIndex })
    ) {
      right = backRight;
      rightIndex = backRightIndex;
    }
  }

  return getArea({left, right, leftIndex, rightIndex})

};

// console.log(maxArea([1,8,6,2,5,4,8,3,7]))
console.log(maxArea([4,3,2,1,4]))
