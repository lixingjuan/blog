import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

// 递归遍历目录
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

// 生成 HTML 文件
function generateHTML(filePath) {
  const ext = path.extname(filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  let htmlContent;

  if (ext === '.js') {
    htmlContent = `<html><head><link rel="stylesheet" href="/assets/css/styles.css"></head><body><pre>${content}</pre></body></html>`;
  } else if (ext === '.md') {
    htmlContent = `<html><head><link rel="stylesheet" href="/assets/css/styles.css"></head><body>${marked(content)}</body></html>`;
  } else if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
    htmlContent = `<html><head><link rel="stylesheet" href="/assets/css/styles.css"></head><body><img src="${filePath}" alt="image" /></body></html>`;
  } else {
    return;
  }

  const outputFilePath = filePath.replace(ext, '.html');
  fs.writeFileSync(outputFilePath, htmlContent);
}

// 生成菜单和内容页面
function generateSite() {
  const rootDir = '.'; // Markdown 文件所在目录
  const outputDir = './dist'; // 输出目录
  if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
  }

  const menuItems = [];

  walkDir(rootDir, (filePath) => {
    generateHTML(filePath);
    const fileName = path.basename(filePath, path.extname(filePath));
    menuItems.push(`<li><a href="${fileName}.html">${fileName}</a></li>`);
  });

  const menuHTML = `<ul>${menuItems.join('')}</ul>`;
  const indexHTML = `<html><head><link rel="stylesheet" href="/assets/css/styles.css"></head><body><div id="menu">${menuHTML}</div><div id="content">Select an item from the menu.</div></body></html>`;

  fs.writeFileSync(path.join(outputDir, 'index.html'), indexHTML);
}

generateSite();
