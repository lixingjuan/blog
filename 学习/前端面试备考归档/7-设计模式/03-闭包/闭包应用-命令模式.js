/** 实现命令模式 */
function Command() {
  return {
    commandList: [],
    add: function (receiver) {
      console.log(this === global);
      this.commandList.push(receiver);
    },
    execute: function () {
      this.commandList.forEach((item) => {
        item?.execute?.();
      });
    },
  };
}

const openWindow = {
  execute: function () {
    console.log("打开窗户");
  },
};

const openAirCondition = {
  execute: function () {
    console.log("打开空调");
  },
};

const washClothes = {
  execute: function () {
    console.log("洗衣服");
  },
};

const reachHome = Command();

reachHome.add(openWindow);
reachHome.add(openAirCondition);
reachHome.add(washClothes);

reachHome.execute();
