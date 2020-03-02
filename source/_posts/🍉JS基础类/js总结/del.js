/*
 * @version: 0.0.1
 * @Author: lixingjuan <xingjuan.li@hand-china.com>
 * @Date: 2019-12-08 20:15:02
 * @copyright: Copyright (c) 2019, Hand
 */
// // const fs = require('fs');

// // // promise层层then链
// // const uglyThen = new Promise((resolve, reject) => {
// //   setTimeout(() => {
// //     resolve(1);
// //   }, 3000);
// // });
// // uglyThen
// //   .then((res) => {
// //     console.log(res + 1);
// //     return res + 1;
// //   })
// //   .then((res) => {
// //     console.log(res + 2);
// //     return res + 1;
// //   });

// // // await
// // const readFile = (url) => {
// //   return new Promise((resolve, reject) => {
// //     fs.readFile(url, 'utf-8', (err, data) => {
// //       if (err) {
// //         reject(err);
// //       } else {
// //         resolve(data);
// //       }
// //     });
// //   });
// // };

// // const beautyAwait = async () => {
// //   const test1 = await readFile('./source/_posts/test1.md');
// //   const test2 = await readFile('./source/_posts/test2.md');
// //   console.log(test1);
// //   console.log(test2);
// // };
// // beautyAwait();

// // // eg2. await 特点举例
// // const timeout = () => {
// //   return new Promise((resolve) => {
// //     setTimeout(() => {
// //       console.log(1);
// //       resolve();
// //     }, 3000);
// //   });
// // };

// // const test = async () => {
// //   await timeout();
// //   await timeout();
// //   console.log(2);
// // };

// // const test2 = async () => {
// //   timeout();
// //   timeout();
// //   console.log(2);
// // };
// // // test();
// // // test2();

// // // await 特点

// const timeout2 = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(1);
//       resolve(2);
//     }, 3000);
//   });
// };
// const test22 = async () => {
//   const aa = await timeout();
//   console.log(aa);
// };
// test22();

// function a() {
//   setTimeout(() => {
//     console.log('执行a函数的延迟函数');
//   }, 3000);
//   console.log('执行a函数');
// }
// function b() {
//   console.log('执行b函数');
// }
// a();
// b();

function parseToMoney(num) {
  num = parseFloat(num.toFixed(3));
  let [integer, decimal] = String.prototype.split.call(num, ".");
  integer = integer.replace(/\d(?=(\d{3})+$)/g, "$&,");
  return integer + "." + (decimal ? decimal : "");
}
