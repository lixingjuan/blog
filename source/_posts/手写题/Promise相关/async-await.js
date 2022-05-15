/**
 * 对async/await 的理解
 * 1. async/await解决了什么问题？
 *    为了解决异步结构组织代码的问题。利用Promise的话，若依赖一个异步函数的返回值，只能写一个事件处理程序，传递给Promise的thenable接口。
 * 2. await在等什么？
 *    遇到await 关键字，会让出当前javaScript运行时的执行线程，记录在哪里暂停执行，向消息队列推送一条任务
 *    等同步线程的代码执行完毕，javaScript runtime 从消息队列中取出任务，恢复异步函数的执行
 */

/* ****************************************************************************************************
 *                                    请说出执行顺序
 ************************************************************************************************* */
async function a() {
  console.log(await Promise.resolve(1));
}
async function b() {
  console.log(await 2);
}
async function c() {
  console.log(3);
}

// a();
// b();
// c();

/* ****************************************************************************************************
 *                                    请区分以下函数
 ************************************************************************************************* */

const demo1 = async function () {
  console.log(await 1);
};
const demo2 = async function () {
  console.log(3);
};

demo1();
console.log(2);
demo2();
console.log(4);
/** 注意该 IIFE */
(async function () {
  await console.log(5);
})();
console.log(6);
