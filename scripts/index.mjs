import fs from "fs";
import path from "path";
// import { walkDir } from "./walk-dir.mjs";
// import { generateHTML } from "./generate-html.mjs";

// const rootDir = ".";
// const outputDir = "./blog"; // 输出目录
// if (!fs.existsSync(outputDir)) {
//   fs.mkdirSync(outputDir);
// }

// const menuItems = [];

// // 写入本地
// walkDir(rootDir, (filePath) => {
//   generateHTML(filePath);
//   const fileName = path.basename(filePath, path.extname(filePath));
//   menuItems.push(`<li>${fileName}</li>`);
// });

// const menuHTML = `<ul>${menuItems.join("")}</ul>`;
// const indexHTML = `<html>
//   <head><link rel="stylesheet" href="/assets/css/styles.css"></head>
//   <body>
//     <div id="menu">${menuHTML}</div>
//     <div id="content">Select an item from the menu.</div>
//   </body>
// </html>`;

// fs.writeFileSync(path.join(outputDir, "index.html"), indexHTML);
// const excludes = [".git", "node_modules", "assets", ".eslintrc.js", "dist", "scripts"];
// const result = [];

// const walkDir = (dir) => {
//   const res = fs.readdirSync(dir, { withFileTypes: true }).filter((file) => !excludes.includes(file.name));
//   res.forEach((file) => {
//     if (file.isDirectory()) {
//       walkDir(`${file.path}/${file.name}`);
//     } else {
//       // console.log(`${file.path}/${file.name}`);
//       console.log(file);
//     }
//   });
// };

// walkDir(".");

// 递归生成文件树
function generateFileTree(dir, basePath = "") {
  const items = fs.readdirSync(dir).map((item) => {
    const fullPath = path.join(dir, item);
    const relativePath = path.join(basePath, item);
    const isDirectory = fs.statSync(fullPath).isDirectory();
    return {
      name: item,
      path: relativePath,
      isDirectory,
      children: isDirectory ? generateFileTree(fullPath, relativePath) : null,
    };
  });
  return items;
}

console.log(generateFileTree("."));
