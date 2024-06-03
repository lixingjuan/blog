import fs from "fs";
import path from "path";
import { walkDir } from "./walk-dir.mjs";
import { generateHTML } from "./generate-html.mjs";

const rootDir = "."; // Markdown 文件所在目录
const outputDir = "./blog"; // 输出目录
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const menuItems = [];

walkDir(rootDir, (filePath) => {
  generateHTML(filePath);
  const fileName = path.basename(filePath, path.extname(filePath));
  menuItems.push(`<li><a href="${fileName}.html">${fileName}</a></li>`);
});

const menuHTML = `<ul>${menuItems.join("")}</ul>`;
const indexHTML = `<html>
  <head><link rel="stylesheet" href="/assets/css/styles.css"></head>
  <body>
    <div id="menu">${menuHTML}</div>
    <div id="content">Select an item from the menu.</div>
  </body>
</html>`;

fs.writeFileSync(path.join(outputDir, "index.html"), indexHTML);
