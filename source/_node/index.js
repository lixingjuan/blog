const fs = require("fs");
const path = require("path");

const {
  ignoreMenuArr,
  initialString,
  menuPosition,
  beginPath,
  firstDepth,
  reg,
} = require("./constant.js");

/*
 * @desc: 用于生成 menu
 */

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
    const [fileName] = item.split(".md");

    const [, tempPath] = _postPosition.split(beginPath);

    const title = `* [${fileName}](${tempPath}/${fileName})`;

    console.log({ title });
    return title;
  }

  const postionDepth =
    (_postPosition + "/" + item).split("/").length - firstDepth;

  switch (postionDepth) {
    case 1:
      return `<h1 style="color: #ba2f7b">${item.replace(reg, "")}</h1>`;

    default:
      return `${"#".repeat(postionDepth)} ${item}`;
  }
};

/**
 * @des 遍历菜单写入 menu.md
 * @param {String} 要遍历的路径
 * @return:
 */
const generateMenu = (_postPosition) => {
  const floderArr = fs.readdirSync(_postPosition);

  const afterFilter = floderArr.filter(
    (item) =>
      !ignoreMenuArr.includes(item) &&
      !item.startsWith("_") &&
      !item.endsWith(".js") &&
      !item.endsWith(".ts") &&
      !item.endsWith(".html") &&
      !item.endsWith(".less") &&
      !item.endsWith(".drawio")
  );

  const afterSort = afterFilter.sort((i, j) => parseInt(i) - parseInt(j));

  if (!afterSort.length) {
    return;
  }

  console.log("afterSort", afterSort);

  afterSort.map((item) => {
    // 如果是文件，就写下名字
    if (item.includes(".md")) {
      const link = getTitle("link", _postPosition, item);
      writeToMenu(link);
      return;
    }

    // 如果是文件夹，就写下名字，继续递归
    const title = getTitle("title", _postPosition, item);
    writeToMenu(title);
    generateMenu(path.join(_postPosition, item));
  });
};

generateMenu(beginPath);

console.log(`🍭  gua,gua,gua, 启动项目喽～～`);
