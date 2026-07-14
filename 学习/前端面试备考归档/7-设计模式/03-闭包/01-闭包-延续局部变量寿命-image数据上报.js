/**
 * 1. 传统写法
 * 作者：在一些低版本浏览器的实现中存在bug, 利用该对象进行上报会有30%的数据丢失
 * 原因是，img是report中的局部变量，当report函数调用结束后，img局部变量随机被销毁，而此时或许还没来得及发布http请求
 */
let report = function (src) {
  const img = new Image();
  img.src = src;
};

report("https://demo");

/**
 * 2. 改进写法
 * 利用闭包将img变量封起来，解决请求丢失的问题
 */

report = function () {
  const imgs = []; // 🎀
  return function (src) {
    const img = new Image();
    imgs.push(img);
    img.src = src;
  };
};
