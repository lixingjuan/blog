const MacroCommand = function () {
  return {
    commandList: [],
    add: function (command) {
      this.commandList.push(command);
    },
    execute: function () {
      this.commandList.forEach((it) => it.execute());
    },
  };
};

/* ****************************************************************************************************
 *                                    "做家务"宏命令
 ************************************************************************************************* */
const houseworkMacroCommand = MacroCommand();
houseworkMacroCommand.add({
  execute: function () {
    console.log("扫地");
  },
});
houseworkMacroCommand.add({
  execute: function () {
    console.log("做饭");
  },
});

/* ****************************************************************************************************
 *                                    "设备"宏命令
 ************************************************************************************************* */
const equipmentMacroCommand = MacroCommand();
equipmentMacroCommand.add({
  execute: function () {
    console.log("打开电视");
  },
});
equipmentMacroCommand.add({
  execute: function () {
    console.log("打开空调");
  },
});

/* ****************************************************************************************************
 *                                    "终极Boss"宏命令
 ************************************************************************************************* */
const finalCommand = MacroCommand();
finalCommand.add(houseworkMacroCommand);
finalCommand.add(equipmentMacroCommand);

/* ****************************************************************************************************
 *                                    执行"终极Boss"宏命令
 ************************************************************************************************* */
finalCommand.execute();
