/*
 * @desc: 用于生成 menu
 */

const fs = require("fs");
const path = require("path");

/* 菜单位置 */
const menuPosition = `${path.dirname(__dirname)}/_posts/menu.md`;
/* 开始遍历的位置 */
const beginPath = `${path.dirname(__dirname)}/_posts`;
/* 一级菜单所在的深度 */
const firstDepth = beginPath.split("/").length;
/* 初始字符串 */
const initialString = `
* [Home](/Blog)\n\n`;
/* 匹配一级菜单前缀 1- 2-等 */
let reg = /^\d-/;

/**
 * @des 同步清空目录文件
 * @param {String} menuPosition 菜单文件所在的位置
 * @param {String} initialString 初始化菜单要写入的文件
 */
fs.writeFileSync(menuPosition, initialString);

/**
 * @des 向指定路径写入内容
 * @param {String} title 要写入的内容
 */
const writeToMenu = function (title) {
  fs.appendFileSync(menuPosition, `${title} \n\n`, "utf8");
};

/**
 * @des 生成分类标题
 * @param {String} linkOrTitle 用于标示生成 链接还是标题
 * @param {String} _postPosition 文件/文件夹 位置
 * @param {String} item 文件名称(带扩展名)
 * @return:
 */
const getTitle = function (linkOrTitle, _postPosition, item) {
  if (linkOrTitle === "link") {
    return `* [${item.slice(0, -3)}](/${_postPosition.slice(
      beginPath.length + 1
    )}/${item.slice(0, -3)})`;
  } else {
    const postionDepth =
      (_postPosition + "/" + item).split("/").length - firstDepth;

    switch (postionDepth) {
      case 1:
        return `<h1 style="color:#448d55;">${item.replace(reg, "")}</h1>`;

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
  const floderArr = fs.readdirSync(_postPosition);

  const afterFilter = floderArr.filter(
    item =>
      ![
        "menu.md",
        "home.md",
        "README.md",
        "temporary.md",
        ".DS_Store",
        "changelog.md",
        "menu2.md"
      ].includes(item)
  );

  const afterSort = afterFilter.sort((i, j) => parseInt(i) - parseInt(j));

  if (!afterSort.length) {
    return;
  }

  afterSort.map(item => {
    // 以_开头的文件不生成目录
    if (item.startsWith("_")) {
      return;
    }

    // 如果是文件，就写下名字
    if (item.includes(".md")) {
      const link = getTitle("link", _postPosition, item);
      writeToMenu(link);
    } else if (!item.includes(".")) {
      // 如果是文件夹，就写下名字，继续递归
      const title = getTitle("title", _postPosition, item);
      writeToMenu(title);
      generateMenu(path.join(_postPosition, item));
    }
  });
};

generateMenu(beginPath);

console.log(`🍭  gua,gua,gua, 启动项目喽～～`);
