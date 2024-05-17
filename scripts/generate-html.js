const fs = require('fs');
const path = require('path');
const marked = require('marked');

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
    htmlContent = `<html><body><pre>${content}</pre></body></html>`;
  } else if (ext === '.md') {
    htmlContent = `<html><body>${marked(content)}</body></html>`;
  } else if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
    htmlContent = `<html><body><img src="${filePath}" alt="image" /></body></html>`;
  } else {
    return;
  }

  const outputFilePath = filePath.replace(ext, '.html');
  fs.writeFileSync(outputFilePath, htmlContent);
}

// 执行脚本
const rootDir = '.'; // 根目录
walkDir(rootDir, generateHTML);
