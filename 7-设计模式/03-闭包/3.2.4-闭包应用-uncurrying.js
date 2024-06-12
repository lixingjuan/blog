Function.prototype.uncurrying = function () {
  var self = this; // self即：是Array.prototype.push
  return function () {
    var obj = Array.prototype.shift.call(arguments);
    return self.apply(obj, arguments); // 即：Array.prototype.push.apply(obj, arguments);
  };
};

/* ****************************************************************************************************
 *                                    使用
 ************************************************************************************************* */

const push = Array.prototype.push.uncurrying();

const obj = {
  length: 3,
  0: "a",
  1: "b",
  2: "c",
};

push(obj, "d");
console.log(obj);
