/** 一次性执行一批命令 */

/* ****************************************************************************************************
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
