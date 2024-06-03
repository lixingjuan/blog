import fs from "fs";
import path from "path";
import { marked } from "marked";

// 生成 HTML 文件
export function generateHTML(filePath) {
  const ext = path.extname(filePath);
  const content = fs.readFileSync(filePath, "utf8");
  let htmlContent;

  if (ext === ".js") {
    htmlContent = `<html><head><link rel="stylesheet" href="/assets/css/styles.css"></head><body><pre>${content}</pre></body></html>`;
  } else if (ext === ".md") {
    htmlContent = `<html><head><link rel="stylesheet" href="/assets/css/styles.css"></head><body>${marked(
      content
    )}</body></html>`;
  } else if (ext === ".html") {
    htmlContent = `<html><head><link rel="stylesheet" href="/assets/css/styles.css"></head><body>${content}</body></html>`;
  } else if ([".jpg", ".jpeg", ".png", ".gif"].includes(ext)) {
    htmlContent = `<html><head><link rel="stylesheet" href="/assets/css/styles.css"></head><body><img src="${filePath}" alt="image" /></body></html>`;
  } else {
    return;
  }

  const outputFilePath = filePath.replace(ext, ".html");
  fs.writeFileSync(outputFilePath, htmlContent);
}
