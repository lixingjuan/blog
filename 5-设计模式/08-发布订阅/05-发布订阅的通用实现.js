/* ****************************************************************************************************
 *                                    定义函数
 ************************************************************************************************* */
const event = {
  clientList: {}, // !!书上这里用的是数组，为什么？

  listen: function (key, cb) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(cb);
  },

  trigger: function (key, ...rest) {
    const fns = this.clientList[key];

    if (!fns || fns.length === 0) {
      return false;
    }

    // !! 退出循环的条件是死fns[i] 为真？
    for (let i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, rest);
      console.log(i);
    }
  },
};

/** 定义installEvent， 可以动态给所有对象都增加发布订阅功能 */
const installEvent = function (obj) {
  Object.entries(event).forEach(([key, value]) => {
    obj[key] = value;
  });
};

/* ****************************************************************************************************
 *                                    应用
 ************************************************************************************************* */
const salesOffice = {};
installEvent(salesOffice);

salesOffice.listen("squareMeter80", (price) => {
  console.log("给小明发信息", price);
});

salesOffice.listen("squareMeter120", (price) => {
  console.log("给小红发信息", price);
});

salesOffice.trigger("squareMeter80", 200000);
salesOffice.trigger("squareMeter120", 300000);

module.exports = {
  installEvent,
};
