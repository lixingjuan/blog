/*****************************************************************************************************
 * 利用闭包的特性
 *
 * 宏命令的实现
 * 1. 向命令列表增加很多命令
 * 2. 调用宏命令的execute方法，一次性执行
 ************************************************************************************************* */

/*****************************************************************************************************
 *                                    定义宏命令
 ************************************************************************************************* */

const MacroCommand = function () {
  return {
    commandList: [],
    add: function (command) {
      this.commandList.push(command);
    },
    execute: function () {
      this.commandList.forEach(function (command) {
        command.execute();
      });
    },
  };
};

/* ****************************************************************************************************
 *                                    定义一些命令
 ************************************************************************************************* */
const openLight = {
  execute: function () {
    console.log("打开灯");
  },
};

const playMusic = {
  execute: function () {
    console.log("播放音乐");
  },
};

const macroCommand = MacroCommand();
macroCommand.add(openLight);
macroCommand.add(playMusic);

macroCommand.execute();
