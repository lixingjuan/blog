import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateDirectoryStructure(dir, baseUrl) {
  const files = fs.readdirSync(dir);
  return files.map((file) => {
    const fullPath = path.join(dir, file);
    const relativePath = path.relative(baseUrl, fullPath);
    if (fs.statSync(fullPath).isDirectory()) {
      return {
        type: "directory",
        name: file,
        path: relativePath,
        children: generateDirectoryStructure(fullPath, baseUrl),
      };
    } else {
      return {
        type: "file",
        name: file,
        path: relativePath,
      };
    }
  });
}

const baseDir = __dirname;

try {
  const structure = generateDirectoryStructure(baseDir, baseDir);
  const outputFilePath = path.join(baseDir, "structure.json");
  fs.writeFileSync(outputFilePath, JSON.stringify(structure, null, 2));
  console.log(`Directory structure has been saved to ${outputFilePath}`);
} catch (error) {
  console.error("Error generating directory structure:", error);
}
