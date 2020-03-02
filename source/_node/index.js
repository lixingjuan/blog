/*
 * @version: 0.0.1
 * @Author: lixingjuan <xingjuan.li@hand-china.com>
 * @Date: 2020-03-01 08:59:01
 * @copyright: Copyright (c) 2019, Hand
 */
const fs = require("fs");
const path = require("path");

/* 菜单位置 */
const menuPosition = `/Users/lixingjuan/Documents/Git_projects/BlogBody/source/_posts/menu.md`;
/* 开始遍历的位置 */
const beginPath = `/Users/lixingjuan/Documents/Git_projects/BlogBody/source/_posts`;
/* 一级菜单所在的深度 */
const firstDepth = beginPath.split("/").length;
/* 初始字符串 */
const initialString = `
* [Home](/Blog)
* [Changelog](/Blog/changelog)\n\n`;

/**
 * @des 同步清空目录文件
 * @param {String} menuPosition 菜单文件所在的位置
 * @param {String} 初始化菜单要写入的文件
 */
fs.writeFileSync(menuPosition, initialString);

/**
 * @des 向指定路径写入内容
 * @param {String} title 要写入的内容
 */
const writeToMenu = function(title) {
  fs.appendFileSync(menuPosition, `${title} \n\n`, "utf8");
};

const getTitle = function(linkOrTitle, _postPosition, item) {
  if (linkOrTitle === "link") {
    return `* [${item.slice(0, -3)}](/Blog/${_postPosition.slice(
      beginPath.length + 1
    )}/${item.slice(0, -3)})`;
  } else {
    const postionDepth = (_postPosition + "/" + item).split("/").length - firstDepth;
    switch (postionDepth) {
      case 1:
        return `<h1 style="color:#448d55;">${item}</h1>`;
      // case 2:
      //   return `<h2 style="color:#fbc82f;">${item}</h2>`;
      default:
        return `${"#".repeat(postionDepth)} ${item}`;
    }
  }
};

/**
 * @des 遍历菜单写入 menu.md
 * @param {String} 要遍历的路径
 * @return:
 */
const generateMenu = _postPosition => {
  const floderArr = fs
    .readdirSync(_postPosition)
    .filter(
      item => !["menu.md", "temporary.md", ".DS_Store", "changelog.md", "menu2.md"].includes(item)
    );

  if (floderArr.length) {
    floderArr.map(item => {
      // 如果文件前面有 _ 就不遍历
      if (item.split("")[0] === "_") {
        return;
      } else if (item.includes(".md")) {
        // 如果是文件，就写下名字，return/Blog
        const link = getTitle("link", _postPosition, item);
        writeToMenu(link);
        return;
      } else if (!item.includes(".")) {
        // 如果是文件夹，就写下名字，继续迭代
        const title = getTitle("title", _postPosition, item);
        writeToMenu(title);
        generateMenu(path.join(_postPosition, item));
      }
    });
  }
};

generateMenu(beginPath);

console.log(process.cwd());

console.log(path.join("a", "b", "c"));
