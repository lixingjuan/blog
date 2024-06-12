import fs from "fs";
import path from "path";

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

      return {
        type: "file",
        name: fileName,
        path: relativePath,
        fileType: path.extname(fullPath),
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
