import fs from "fs";
import path from "path";
import { execSync } from "child_process";

import { fileURLToPath } from "url";

// 需要忽略的文件/文件夹列表
const ignoreFolders = ["node_modules", ".git", "output", ".github", ".vscode"];
const readmeFileName = "README.md";

const shouldIgnore = (file, isRoot) => {
  if (!isRoot) return false;
  const fileName = file.name;
  if (ignoreFolders.includes(fileName)) return true;
  if (file.isFile()) {
    return fileName !== readmeFileName;
  }
  return false;
};

function generateDirectoryStructure(dir, baseUrl, isRoot = false) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  // 根目录，需要将README, 放在最上面
  const fileList = isRoot
    ? files.sort((a, b) => {
        if (a.name === readmeFileName) return -1;
        if (b.name === readmeFileName) return 1;
        return 0;
      })
    : files.sort((a, b) => {
        if (a.isDirectory()) return -1;
        if (b.isDirectory()) return 1;
        return 0;
      });

  const result = fileList
    .map((file) => {
      const fileName = file.name;
      const fullPath = path.join(file.parentPath, fileName);
      const relativePath = path.relative(baseUrl, fullPath);

      console.log(`Processing: ${fullPath}`); // 添加调试信息

      // 针对根目录做过滤
      if (shouldIgnore(file, isRoot)) {
        console.log("ignore file:", file);
        return null;
      }

      // 如果是目录
      if (file.isDirectory()) {
        return {
          type: "directory",
          name: fileName,
          path: relativePath,
          children: generateDirectoryStructure(fullPath, baseUrl),
        };
      }

      // 获取文件创建时间（使用 Git 首次提交时间）
      let createdAt = null;
      try {
        // 使用 git log 获取文件的首次提交时间
        // --format=%ai 获取作者日期，--reverse 从最早开始
        // 使用 --diff-filter=A 只查找文件添加的提交（首次提交）
        // 或者使用 --follow 跟踪文件重命名
        const gitCommand = `git log --format=%ai --reverse --diff-filter=A --follow -- "${relativePath}" | head -1`;
        const gitDate = execSync(gitCommand, { 
          encoding: 'utf8',
          cwd: baseUrl,
          stdio: ['pipe', 'pipe', 'ignore'], // 忽略 stderr
          timeout: 5000 // 5秒超时
        }).trim();
        
        if (gitDate) {
          // git log 返回格式: 2023-01-15 10:30:45 +0800
          // 提取日期部分 YYYY-MM-DD
          createdAt = gitDate.split(' ')[0];
        } else {
          // 如果 --diff-filter=A 没有结果，尝试普通方式（文件可能被重命名过）
          const gitCommandFallback = `git log --format=%ai --reverse -- "${relativePath}" | head -1`;
          const gitDateFallback = execSync(gitCommandFallback, { 
            encoding: 'utf8',
            cwd: baseUrl,
            stdio: ['pipe', 'pipe', 'ignore'],
            timeout: 5000
          }).trim();
          if (gitDateFallback) {
            createdAt = gitDateFallback.split(' ')[0];
          }
        }
      } catch (error) {
        // 如果 Git 命令失败（文件不在 Git 中或 Git 不可用），尝试使用文件系统时间作为备选
        try {
          const stats = fs.statSync(fullPath);
          const date = new Date(stats.mtime); // 使用修改时间作为备选
          createdAt = date.toISOString().split('T')[0];
        } catch (fsError) {
          console.warn(`Failed to get creation time for ${relativePath}:`, error.message);
        }
      }

      // 获取文件更新时间（使用 Git 最后一次提交时间）
      let updatedAt = null;
      try {
        // 使用 git log 获取文件的最后一次提交时间
        // --format=%ai 获取作者日期，-1 只取最后一条
        const gitCommand = `git log --format=%ai --follow -1 -- "${relativePath}"`;
        const gitDate = execSync(gitCommand, { 
          encoding: 'utf8',
          cwd: baseUrl,
          stdio: ['pipe', 'pipe', 'ignore'], // 忽略 stderr
          timeout: 5000 // 5秒超时
        }).trim();
        
        if (gitDate) {
          // git log 返回格式: 2023-01-15 10:30:45 +0800
          // 提取日期部分 YYYY-MM-DD
          updatedAt = gitDate.split(' ')[0];
        }
      } catch (error) {
        // 如果 Git 命令失败，尝试使用文件系统时间作为备选
        try {
          const stats = fs.statSync(fullPath);
          const date = new Date(stats.mtime); // 使用修改时间作为备选
          updatedAt = date.toISOString().split('T')[0];
        } catch (fsError) {
          console.warn(`Failed to get update time for ${relativePath}:`, error.message);
        }
      }

      return {
        type: "file",
        name: fileName,
        path: relativePath,
        fileType: path.extname(fullPath),
        createdAt: createdAt,
        updatedAt: updatedAt,
      };
    })
    .filter(Boolean);

  return result;
}

const baseDir = process.cwd();

try {
  // 1. 获取目录结构
  const structure = generateDirectoryStructure(baseDir, baseDir, true);
  const outputFilePath = path.join(baseDir, "structure.json");
  fs.writeFileSync(outputFilePath, JSON.stringify(structure, null, 2));
  console.log(`Directory structure has been saved to ${outputFilePath}`);
} catch (error) {
  console.error("Error generating directory structure:", error);
}

// 2. 将首页写入根目录
const workflowPath = path.dirname(fileURLToPath(import.meta.url));
const indexHtml = fs.readFileSync(path.join(workflowPath, "index.html")).toString();
fs.writeFileSync(path.join(baseDir, "index.html"), indexHtml);
