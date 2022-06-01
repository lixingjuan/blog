const path = require("path");

/**
 * @desc 生成菜单需要忽略的文件
 */
const ignoreMenuArr = [
  "menu.md",
  "home.md",
  "README.md",
  "temporary.md",
  ".DS_Store",
  "changelog.md",
  "menu2.md",
];

/* 初始字符串 */
const initialString = `
* [Home](/)\n\n`;

/* 菜单位置 */
const menuPosition = `${path.dirname(__dirname)}/_posts/menu.md`;
/* 开始遍历的位置 */
const beginPath = `${path.dirname(__dirname)}/_posts`;
/* 一级菜单所在的深度 */
const firstDepth = beginPath.split("/").length;

/* 匹配一级菜单前缀 1- 2-等 */
let reg = /^\d-/;

module.exports = {
  ignoreMenuArr,
  initialString,
  menuPosition,
  beginPath,
  firstDepth,
  reg,
};
