import fs from "fs";
import path from "path";

const excludes = [".git", "node_modules", "assets", ".eslintrc.js", "dist"];

// 递归遍历目录, 执行回调
export function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    let dirPath = path.join(dir, f);
    // if (excludes.some((it) => dirPath.split("/").includes(it))) {
    //   return;
    // }
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}
