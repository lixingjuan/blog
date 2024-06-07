import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

// 忽略的文件/文件夹列表
const ignoreFolders = ["node_modules", ".git", "output", ".github", ".vscode", ".gitignore"];

function generateDirectoryStructure(dir, baseUrl, isRoot = false) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  const result = files
    .map((file) => {
      console.log(file);
      const fileName = file.name;
      const fullPath = path.join(file.parentPath, fileName);
      const relativePath = path.relative(baseUrl, fullPath);

      // 针对根目录做过滤
      if (isRoot && ignoreFolders.includes(fileName)) return null;

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