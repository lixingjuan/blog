/**
 * @desc : 问，this有几种指向？
 */

/**
 * 第一题, 以下分别打印出什么？
 */
function King() {
  this.royaltyName = "Herry";
  setTimeout(() => {
    console.log(this.royaltyName);
  }, 1000);
}

function Queen() {
  this.royaltyName = "Ekuzabeth";
  setTimeout(function (val = "hahaha") {
    console.log(this.royaltyName);
  }, 1000);
}

new King(); // ？1. 打印出什么？
new Queen(); // ？2. 打印出什么？

/**
 * 第二题, 以下分别打印出什么？
 */

global.color = "red";
let o = {
  color: "blue",
};

function sayColor() {
  console.log(this.color);
}

sayColor();
o.sayColor = sayColor;
o.sayColor();
