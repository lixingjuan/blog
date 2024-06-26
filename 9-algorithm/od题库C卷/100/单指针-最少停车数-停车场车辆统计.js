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

/** 其实要的是停车场最少停了几辆车 */

const calculateMinCars = (cars) => {
  let pointer = 0;
  let count = 0;
  while (pointer < cars.length) {
    // 先尝试卡车
    if (cars[pointer] === 1 && cars[pointer + 1] === 1 && cars[pointer + 2] === 1) {
      pointer += 3;
      count += 1;
    } else if (cars[pointer] === 1 && cars[pointer + 1] === 1) {
      pointer += 2;
      count += 1;
    } else if (cars[pointer] === 1) {
      pointer += 1;
      count += 1;
    } else {
      pointer += 1;
    }
  }
  return count;
};

// 测试用例
console.log(calculateMinCars([1, 1, 0, 0, 1, 1, 1, 0, 1]) === 3); // 输出应为 "3"
