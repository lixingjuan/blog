/**
 * @题目描述
 * 实现一个模拟目录管理功能的软件，输入一个命令序列，输出最后一条命令运行结果。
 * 支持命令:
 * 1)创建目录命令: mkdir 目录名称，如mkdir abc为在当前目录创建abc目录，如果已存在同名目录则不执行任何操作。此命令无输出。
 * 2)进入目录命令: cd 目录名称,如cd abc为进入abc目录，特别地，cd ..为返回上级目录，如果目录不存在则不执行任何操作。此命令无输出。
 * 3)查看当前所在路径命令: pwd，输出当前路径字符串
 *  约束： 1)目录名称仅支持小写字母;mkdir和cd命令的参数仅支持单个目录，如: mkdir bc和cd abc;不支持嵌套路径和绝对路径，如mkdir abc/efg,cd abc/efg,mkdir /abc/efg,cd /abc/efg是不支持的。
 *        2)目录符号为/，根目录/作为初始目录。
 *
 * @输入描述
 * 输入N行字符串，每一行字符串是一条命令。
 *
 * @输出描述
 * 输出最后一条命令运行结果字符串
 *
 * @示例1
 * 输入:
 * mkdir abc
 * cd abc
 * pwd
 *
 * 输出:
 * /abc/
 *
 * 说明:
 * 在根目录创建一个abc的目录并进入abc目录中查看当前目录路径，输出当前路径/abc/。
 */

class DirectoryManager {
  constructor() {
    this.currentPath = ["/"]; // 开始于根目录
    this.directories = { "/": new Set() }; // 根目录下的子目录
  }

  mkdir(dirName) {
    const currentDir = "/" + this.currentPath.slice(1).join("/");
    if (!this.directories[currentDir]) {
      this.directories[currentDir] = new Set();
    }
    this.directories[currentDir].add(dirName);
  }

  cd(dirName) {
    if (dirName === "..") {
      if (this.currentPath.length > 1) {
        this.currentPath.pop(); // 返回上一级目录
      }
    } else {
      const currentDir = "/" + this.currentPath.slice(1).join("/");
      if (this.directories[currentDir] && this.directories[currentDir].has(dirName)) {
        this.currentPath.push(dirName); // 进入指定目录
      }
    }
  }

  pwd() {
    if (this.currentPath.length === 1 && this.currentPath[0] === "/") {
      return "/";
    }
    return "/" + this.currentPath.slice(1).join("/") + "/";
  }

  executeCommand(command) {
    const [cmd, arg] = command.split(" ");
    switch (cmd) {
      case "mkdir":
        this.mkdir(arg);
        break;
      case "cd":
        this.cd(arg);
        break;
      case "pwd":
        console.log(this.pwd());
        break;
    }
  }
}

function simulateDirectoryCommands(commands) {
  const dm = new DirectoryManager();
  commands.forEach((command) => dm.executeCommand(command));
}

// 示例输入
const commands = ["mkdir abc", "cd abc", "pwd"];

// 调用模拟函数
simulateDirectoryCommands(commands);
