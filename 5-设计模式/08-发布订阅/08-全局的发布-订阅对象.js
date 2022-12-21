/* ****************************************************************************************************
 * 利用闭包的缓存特性实现
 * 1. listen, 向事件列表增加函数
 * 2. trigger, 执行事件列表中符合条件的函数
 ************************************************************************************************* */
/**
 * 之前的写法，存在两个小问题
 * 1. 给每个发布者对象都增加了listen 和 trigger 的方法，以及一个消息列表 clientList, 这其实是一种资源浪费，
 * 2. 小明和售楼处存在一定的耦合性：小明如果想订阅信息，至少需要知道售楼处的名字 salesOffice，才能顺利订阅信息。
 */

const Event = (function () {
  let clientList = {};

  const listen = (key, cb) => {
    if (!clientList[key]) {
      clientList[key] = [];
    }
    clientList[key].push(cb);
  };

  const trigger = (key, ...rest) => {
    const fns = clientList[key];

    if (!fns || fns.length === 0) {
      return false;
    }

    // !! 退出循环的条件是死fns[i] 为真？
    for (let i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, rest);
    }
  };

  return {
    clientList,
    listen,
    trigger,
  };
})();

/* ****************************************************************************************************
 *                                    应用
 ************************************************************************************************* */

/** 小明：订阅消息 */
Event.listen("squareMeter80", (price) => {
  console.log("给小明发信息", price);
});

/** 售楼处：发布消息 */
Event.trigger("squareMeter80", 20000);
