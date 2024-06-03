import fs from "fs";
import path from "path";
import { marked } from "marked";

const getHtml = (ext, content) => {
  switch (ext) {
    case ".js":
      return `<html><head><link rel="stylesheet" href="/assets/css/styles.css"></head><body><pre>${content}</pre></body></html>`;
    case ".md":
      return `<html><head><link rel="stylesheet" href="/assets/css/styles.css"></head><body>${marked(
        content
      )}</body></html>`;
    case ".html":
      return `<html><head><link rel="stylesheet" href="/assets/css/styles.css"></head><body>${content}</body></html>`;
    case ".jpg":
    case ".jpeg":
    case ".png":
    case ".gif":
      return `<html><head><link rel="stylesheet" href="/assets/css/styles.css"></head><body>${content}</body></html>`;
    default:
      return "";
  }
};

// 生成 HTML 文件
export function generateHTML(filePath) {
  const ext = path.extname(filePath);
  const content = fs.readFileSync(filePath, "utf8");
  let htmlContent = getHtml(ext, content);

  const outputFilePath = filePath.replace(ext, ".html");
  try {
    fs.writeFileSync(outputFilePath, htmlContent);
  } catch (error) {
    console.log("error", error);
  }
}
