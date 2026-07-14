const { installEvent } = require("./05-发布订阅的通用实现");

const login = Promise.resolve({
  name: "xiaoli",
  age: 25,
  avator: "🐱",
  cartList: ["鞋子", "帽子", "裙子"],
});

// 一些组件模块
const Header = {
  setAvator: () => {
    console.log("头像设置成功");
  },
};

const Nav = {
  setProfile: () => {
    console.log("设置用户简介成功");
  },
};

const CartList = {
  refresh: () => {
    console.log("购物车刷新成功");
  },
};

// 负责登陆的你！

login
  .then((result) => {
    Header.setAvator();
    Nav.setProfile();
    CartList.refresh();
    // !! 如果需要增加功能，只能你来这里增加
  })
  .catch((err) => {});

/* ****************************************************************************************************
 *                                    使用 发布-订阅重构 ⬇️
 ************************************************************************************************* */

const loginNew = Promise.resolve({
  name: "xiaoli",
  age: 25,
  avator: "🐱",
  cartList: ["鞋子", "帽子", "裙子"],
});

installEvent(loginNew);

const HeaderNew = (() => {
  loginNew.listen("success", () => {
    console.log("头像设置成功");
  });
})();

loginNew.trigger("success");
