/* ****************************************************************************************************
 *                                    定义函数
 ************************************************************************************************* */
const event = {
  clientList: {},

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

    for (let i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, rest);
    }
  },

  remove: function (key, fn) {
    const fns = this.clientList[key];
    if (!fns || !fn) {
      return false;
    }

    // 如果没有传递函数，则表示取消该key对应的所有的函数
    if (!fn) {
      fns && (this.clientList[key].length = 0);
    } else {
      this.clientList[key] = fns.filter((i) => i !== fn);
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

const xiaomingCb = (price) => {
  console.log("给小明发信息", price);
};
salesOffice.listen("squareMeter80", xiaomingCb);

salesOffice.listen("squareMeter120", (price) => {
  console.log("给小红发信息", price);
});

salesOffice.trigger("squareMeter80", 200000);
salesOffice.remove("squareMeter80", xiaomingCb);
salesOffice.trigger("squareMeter80", 200000);
