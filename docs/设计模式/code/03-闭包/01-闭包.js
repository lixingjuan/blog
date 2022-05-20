/* ****************************************************************************************************
 *                                    闭包的更多作用
 ************************************************************************************************* */

/** 封装变量 */
// eg.1
const cache = {};
const mult = function () {
  const params = [...arguments];
  const args = params.join(",");

  if (cache[args]) {
    return cache[args];
  }
  console.log("ce");

  let a = 1;
  for (let i = 0; i < params.length; i++) {
    a = a * params[i];
  }
  return (cache[args] = a);
};

console.log(mult(1, 2, 3));
console.log(mult(1, 2, 3));

// 将cache变量封装在mult函数内部，改写⬇️
let mult2 = (function () {
  const cache2 = {};
  return function () {
    const params = [...arguments];
    const args = params.join(",");

    if (cache2[args]) {
      return cache2[args];
    }
    console.log("ce");

    let a = 1;
    for (let i = 0; i < params.length; i++) {
      a = a * params[i];
    }
    return (cache2[args] = a);
  };
})();
console.log(mult2(1, 2, 3));
console.log(mult2(1, 2, 3));

// 在代码重构的过程中，如果一些下函数不需要在程序的其他地方使用，最好利用闭包将他们封闭起来，改写如下⬇️

mult2 = (function () {
  const cache2 = {};

  const calculate = function (params) {
    let a = 1;
    for (let i = 0; i < params.length; i++) {
      a = a * params[i];
    }
    return a;
  };

  return function () {
    const params = [...arguments];
    const args = params.join(",");

    if (cache2[args]) {
      return cache2[args];
    }
    console.log("ce");

    return (cache2[args] = calculate(params));
  };
})();

/** 延续局部变量的寿命：此部分代码针对浏览器 */
// img对象常用来数据上报
const report = function (src) {
  const img = new Image();
  img.src = src;
};

report("https://demo");
// 作者：在一些低版本浏览器的实现中存在bug, 利用该对象进行上报会有30%的数据丢失
// 原因是，img是report中的局部变量，当report函数调用结束后，img局部变量随机被销毁，而此时或许还没来得及发布http请求
// 利用闭包将img变量封起来，解决请求丢失的问题
const reportNew = function () {
  const imgs = [];
  return function (src) {
    const img = new Image();
    imgs.push(img);
    img.src = src;
  };
};
