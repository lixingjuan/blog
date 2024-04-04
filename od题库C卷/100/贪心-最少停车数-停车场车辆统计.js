/**
 * @题目描述
 * 特定大小的停车场，数组cars[]表示，其中1表示有车，0表示没车。
 * 车辆大小不一，小车占一个车位（长度1），货车占两个车位（长度2），卡车占三个车位（长度3），
 * 统计停车场最少可以停多少辆车，返回具体的数目。
 *
 * @输入描述
 * 整型字符串数组cars[]，其中1表示有车，0表示没车，数组长度小于1000。
 *
 * @输出描述
 * 整型数字字符串，表示最少停车数目
 *
 *
 * @示例1
 * 输入：
 * 1,0,1
 * 输出：
 * 2
 * 说明：
 * 1个小车占1个车位
 * 第二个车位空
 * 1个小车占3个车位最少有两辆车
 *
 * @示例2
 * 输入：
 * 1,1,0,0,1,1,1,0,1
 * 输出：
 * 3
 * 说明：
 *  1个货车占第1、2个车位
 *  第3、4个车位空
 *  1个卡车占第5、6、7个车位
 *  第8个车位空
 *  1个小车占第9个车位
 *  最少3辆车
 */

// const demo = (arr) => {
//   let left = 0;
//   let count = 0;

//   for (let i = 0; i < arr.length; i++) {
//     const leftEle = arr[left];
//     const nextEle = arr[i + 1];

//     // 找出和当前相同的一段元素
//     if (nextEle !== leftEle) {
//       // 这时候处理 left -> i 之间这段元素
//       // 判断长度，优先放大车
//       let distance = i - left + 1;
//       // 1.能放几辆大卡车
//       if (distance >= 3) {
//         count += Math.ceil(distance / 3);
//         distance = distance % 3;
//       }
//       // 2.能放几辆货车
//       if (distance >= 2) {
//         count += Math.ceil(distance / 2);
//         distance = distance % 2;
//       }
//       // 3.能放几辆轿车
//       count += distance;
//       left = i + 1;
//     }
//   }
//   return count;
// };

// console.log(demo([1, 1, 0, 0, 1, 1, 1, 0, 1]));

const calculateMinCars = (arr) => {
  let count = 0; // 用于记录最少的车辆数目
  let pointer = 0; // 当前处理位置的指针

  while (pointer < arr.length) {
    // 如果当前位置有车
    if (arr[pointer] === 1) {
      count += 1;
      // 后面两个位置都是有车，则准备跳过这三个位置(大卡车)
      if (arr[pointer + 1] === 1 && arr[pointer + 2] === 1) {
        pointer += 3;
      } else if (arr[pointer + 1] === 1) {
        // 准备跳过这两个位置
        pointer += 2;
      } else {
        pointer += 1;
      }
    } else {
      // 当前位置没有车
      pointer++;
    }
  }

  return count;
};

// 测试用例
console.log(calculateMinCars([1, 1, 0, 0, 1, 1, 1, 0, 1])); // 输出应为 "3"
