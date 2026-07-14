/* ****************************************************************************************************
 * 实现，类似于工厂函数，接近原型继承：
 *  1. 在工厂函数内部使用 Object.create, 创建其他超类的实例，
 *  2. 在实例上定义方法；
 ************************************************************************************************* */

const person = {
  name: "Tom",
  friends: ["Herry", "Merry"],
};

function createAnother(original) {
  const clone = Object.create(original, {
    sayHi: {
      value: function () {
        console.log("hi");
      },
      configurable,
    },
  });

  return clone;
}

// 这里得到的 `instance1` 和 `instance2` ，即是对person进行浅拷贝，并且自定义了一些方法后的一个对象，与person相比，多了自定的方法而已
const instance1 = createAnother(person);
const instance2 = createAnother(person);

console.log(instance1.friends === instance2.friends); // true
