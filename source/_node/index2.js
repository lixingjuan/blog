/*
 * @version: 0.0.1
 * @Author: lixingjuan <xingjuan.li@hand-china.com>
 * @Date: 2020-02-28 19:49:48
 * @copyright: Copyright (c) 2019, Hand
 */

// 需求：遍历 _posts 文件夹，每个文件夹按照规则生成一份文件，写入 menu.md文件中
// 遍历
// const fileObj = {
//   floder1: {
//     type: "floder",
//     path: "",
//     children: {
//       floder1_Children1: {
//         type: "floder", // 如果extname返回空字符串，则是文件夹
//         children: {
//           md1: {
//             type: "md",
//             path: ""
//           },
//           md2: {
//             type: "md", // 如果有 extname && extname==='md', 返回类型
//             path: ""
//           }
//         }
//       },
//       floder1_Children2: {
//         type: "floder"
//       }
//     }
//   },
//   floder2: {
//     type: "floder",
//     children: {
//       floderChildren1: {
//         type: "floder"
//       },
//       floderChildren2: {
//         type: "floder"
//       }
//     }
//   }
// };

const fs = require("fs");
const path = require("path");
// const _postPosition = path.dirname(__dirname) + "/_posts/";
// const _postPosition = `/Users/lixingjuan/Documents/Git_projects/BlogBody/source/_posts/`;
const menuPosition = `/Users/lixingjuan/Documents/Git_projects/BlogBody/source/_posts`;
const menuPath = `/Users/lixingjuan/Documents/Git_projects/BlogBody/source/_posts/menu.md`;
// const firstLevelFloderArr = fs
//   .readdirSync(_postPosition)
// .filter(item => !item.includes(".md") && !item.includes(".DS_Store"));

// console.log(
//   fs.readdir(_postPosition, (err, value) => {
//     if (err) {
//       console.log("错误".err);
//     } else {
//       const a = value.filter(
//         item => !item.includes(".md") && !item.includes(".DS_Store")
//       );
//       console.log(a);
//     }
//   })
// );

// // 将读取到的文件数组遍历，写入数组
// const writeInfileObj = (name, path, type) => {
//   fileObj[name];
// };
// 初始字符串
// const initialString = `
// * [Home](/Blog)
// * [Changelog](/Blog/changelog)\n\n`;

// fs.writeFile(menuPath, initialString, err => {
//   if (err) console.log("写入错误", err);
// });

// function demo(underThisFolderArr, flag, beginPath) {
//   flag = flag || 1;
//   underThisFolderArr.map(item => {
//     // 没有 ‘.’ 说明是文件夹
//     if (!item.includes(".")) {
//       fs.appendFile(
//         `${menuPosition}/menu.md`,
//         `${"#".repeat(flag)} ${item}\n\n`,
//         err => {
//           if (err) throw err;
//           console.log(`数据已追加到文件${flag}`);
//         }
//       );

//       flag++;
//       // 将当前文件夹下的所有文件存入数组
//       const newBeginPath = path.join(beginPath, "/", item);
//       const underThisFolderArr = fs.readdirSync(newBeginPath);
//       demo(underThisFolderArr, flag, newBeginPath);
//     } else {
//       fs.appendFile(
//         `${menuPosition}/menu.md`,
//         `* [${item}](/Blog/${item})\n\n`,
//         err => {
//           if (err) throw err;
//           console.log(`数据已追加到文件${flag}`);
//         }
//       );
//       return;
//     }
//     flag = 1;
//   });
// }

// demo(firstLevelFloderArr, null, _postPosition);

// 先序遍历菜单生成文章目录
// function demo(underThisFolderArr, flag, beginPath) {
//   flag = flag || 1;
//   underThisFolderArr.map(item => {
//     // 没有 ‘.’ 说明是文件夹
//     if (!item.includes(".")) {
//       fs.appendFile(
//         `${menuPosition}/menu.md`,
//         `${"#".repeat(flag)} ${item}\n\n`,
//         err => {
//           if (err) throw err;
//           console.log(`数据已追加到文件${flag}`);
//         }
//       );

//       flag++;
//       // 将当前文件夹下的所有文件存入数组
//       const newBeginPath = path.join(beginPath, "/", item);
//       const underThisFolderArr = fs.readdirSync(newBeginPath);
//       demo(underThisFolderArr, flag, newBeginPath);
//     } else {
//       fs.appendFile(
//         `${menuPosition}/menu.md`,
//         `* [${item}](/Blog/${item})\n\n`,
//         err => {
//           if (err) throw err;
//           console.log(`数据已追加到文件${flag}`);
//         }
//       );
//       return;
//     }
//     flag = 1;
//   });
// }

// var preOrder = function(node) {
//   if (node) {
//     console.log(node.name);
//     if (node.children && node.children.length) {
//       node.children.map(item => {
//         preOrder(item);
//       });
//     } else {
//       return;
//     }
//   }
// };
// preOrder(root);

// demo(firstLevelFloderArr, null, _postPosition);
const _postPosition = `/Users/lixingjuan/Documents/Git_projects/BlogBody/source/_posts/`;
/**
 * @des:
 * 目标顺序
 * 一级菜单
 * 二级菜单
 */
const demo2 = function(_postPosition) {
  // console.log(path.basename(_postPosition));

  const floderArr = fs
    .readdirSync(_postPosition)
    .filter(item => !["menu.md", "temporary.md"].includes(item));
  if (floderArr.length) {
    floderArr.map(item => {
      if (item.includes(".md")) {
        // 如果是文件，就写下名字，return
        console.log(item);
        return;
      } else {
        // 如果是文件夹，就写下名字，继续迭代
        console.log(item);
        demo2(path.join(_postPosition, item));
      }
    });
  }
};

demo2(_postPosition);

/**
 * @des 向指定路径写入内容
 * @param {String} title 要写入的内容
 */
// const writeToMenu = function(title) {
//   fs.appendFile(`${menuPosition}/menu.md`, `${"#".repeat(flag)} ${item}\n\n`, err => {
//     if (err) throw err;
//     console.log(`数据已追加到文件${flag}`);
//   });
// };
