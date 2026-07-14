import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";

import { fileURLToPath } from "url";

// 需要忽略的文件/文件夹列表
const ignoreFolders = new Set([
  "node_modules",
  ".git",
  "output",
  ".github",
  ".vscode",
  ".idea",
  ".next",
  ".nuxt",
  ".cache",
  "dist",
  "build",
  "coverage",
  "target",
  "_site",
]);
const displayFileTypes = new Set([".md", ".html", ".pdf"]);
const readmeFileName = "README.md";
const gitDateCache = new Map();
let gitBlobHistoryCache = null;
let gitPathHistoryCache = null;

const formatGitDate = (gitDate) => {
  if (!gitDate) return null;
  return gitDate.split(" ")[0] || null;
};

const runGit = (args, cwd) =>
  execFileSync("git", args, {
    encoding: "utf8",
    cwd,
    stdio: ["ignore", "pipe", "ignore"],
    timeout: 30000,
    maxBuffer: 1024 * 1024 * 100,
  }).trim();

const normalizeRelativePath = (relativePath) => {
  return relativePath.split(path.sep).join("/");
};

const getGitPathDates = (relativePath, baseUrl) => {
  const pathHistory = getGitPathHistory(baseUrl);
  return pathHistory.get(normalizeRelativePath(relativePath)) || { createdAt: null, updatedAt: null };
};

const getGitPathHistory = (baseUrl) => {
  if (gitPathHistoryCache) return gitPathHistoryCache;

  const history = new Map();
  const log = runGit(["log", "--reverse", "--format=commit-date:%ai", "--name-only"], baseUrl);
  let currentDate = null;

  for (const line of log.split(/\r?\n/)) {
    if (line.startsWith("commit-date:")) {
      currentDate = formatGitDate(line.replace("commit-date:", ""));
      continue;
    }

    const currentPath = line.trim();
    if (!currentDate || !currentPath) continue;

    const dates = history.get(currentPath) || { createdAt: currentDate, updatedAt: currentDate };
    dates.createdAt = getEarlierDate(dates.createdAt, currentDate);
    dates.updatedAt = currentDate;
    history.set(currentPath, dates);
  }

  gitPathHistoryCache = history;
  return history;
};

const getGitObjectDates = (fullPath, baseUrl) => {
  const hash = runGit(["hash-object", fullPath], baseUrl);
  if (!hash) return { createdAt: null, updatedAt: null };

  if (gitDateCache.has(hash)) {
    return gitDateCache.get(hash);
  }

  const blobHistory = getGitBlobHistory(baseUrl);
  const dates = blobHistory.get(hash) || { createdAt: null, updatedAt: null };
  gitDateCache.set(hash, dates);
  return dates;
};

const getGitBlobHistory = (baseUrl) => {
  if (gitBlobHistoryCache) return gitBlobHistoryCache;

  const history = new Map();
  const log = runGit(
    ["log", "--all", "--reverse", "--format=commit-date:%ai", "--raw", "--no-abbrev", "--no-renames"],
    baseUrl
  );
  let currentDate = null;

  for (const line of log.split(/\r?\n/)) {
    if (line.startsWith("commit-date:")) {
      currentDate = formatGitDate(line.replace("commit-date:", ""));
      continue;
    }

    if (!currentDate || !line.startsWith(":")) continue;

    const [meta] = line.split("\t");
    const parts = meta.split(" ");
    const newHash = parts[3];

    if (!newHash || /^0+$/.test(newHash)) continue;

    const dates = history.get(newHash) || { createdAt: currentDate, updatedAt: currentDate };
    dates.createdAt = getEarlierDate(dates.createdAt, currentDate);
    dates.updatedAt = currentDate;
    history.set(newHash, dates);
  }

  gitBlobHistoryCache = history;
  return history;
};

const getFileSystemDates = (fullPath) => {
  const stats = fs.statSync(fullPath);
  const date = new Date(stats.mtime).toISOString().split("T")[0];
  return { createdAt: date, updatedAt: date };
};

const getEarlierDate = (dateA, dateB) => {
  if (!dateA) return dateB;
  if (!dateB) return dateA;
  return dateA.localeCompare(dateB) <= 0 ? dateA : dateB;
};

const getFileDates = (fullPath, relativePath, baseUrl, preferContentHistory = false) => {
  let createdAt = null;
  let updatedAt = null;

  try {
    const pathDates = getGitPathDates(relativePath, baseUrl);
    createdAt = pathDates.createdAt;
    updatedAt = pathDates.updatedAt;
  } catch (error) {
    // 当前路径可能还没有提交，下面会继续用文件内容反查历史。
  }

  const today = new Date().toISOString().split("T")[0];
  const shouldUseObjectDates = !createdAt || !updatedAt || (preferContentHistory && createdAt === today);

  if (shouldUseObjectDates) {
    try {
      const objectDates = getGitObjectDates(fullPath, baseUrl);
      createdAt = preferContentHistory
        ? getEarlierDate(createdAt, objectDates.createdAt)
        : createdAt || objectDates.createdAt;
      updatedAt = updatedAt || objectDates.updatedAt;
    } catch (error) {
      // 新文件或未被 Git 记录过的内容会走文件系统时间兜底。
    }
  }

  if (createdAt && updatedAt) {
    return { createdAt, updatedAt };
  }

  try {
    const fsDates = getFileSystemDates(fullPath);
    return {
      createdAt: createdAt || fsDates.createdAt,
      updatedAt: updatedAt || fsDates.updatedAt,
    };
  } catch (error) {
    console.warn(`Failed to get dates for ${relativePath}:`, error.message);
    return { createdAt, updatedAt };
  }
};

const extractPathDate = (relativePath) => {
  const dashedMatch = relativePath.match(/(?:^|\/)(\d{4}-\d{2}-\d{2})(?:\/|$|\.)/);
  if (dashedMatch) return dashedMatch[1];

  const compactMatch = relativePath.match(/(?:^|\/)(\d{4})(\d{2})(\d{2})(?:\/|$|\.)/);
  return compactMatch ? `${compactMatch[1]}-${compactMatch[2]}-${compactMatch[3]}` : null;
};

const normalizeAssetPath = (assetPath, fileRelativePath, baseUrl) => {
  if (!assetPath || /^(https?:)?\/\//.test(assetPath) || assetPath.startsWith("data:")) {
    return assetPath;
  }

  const rootRelativePath = path.normalize(assetPath);
  if (fs.existsSync(path.join(baseUrl, rootRelativePath))) {
    return rootRelativePath;
  }

  const fileRelativeAssetPath = path.normalize(path.join(path.dirname(fileRelativePath), assetPath));
  if (fs.existsSync(path.join(baseUrl, fileRelativeAssetPath))) {
    return fileRelativeAssetPath;
  }

  return null;
};

const findFirstImageAsset = (absoluteDir, relativeDir, depth = 2) => {
  if (depth < 0) return null;

  try {
    const entries = fs
      .readdirSync(absoluteDir, { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name, "zh-Hans-CN"));

    for (const entry of entries) {
      const absolutePath = path.join(absoluteDir, entry.name);
      const relativePath = path.normalize(path.join(relativeDir, entry.name));

      if (entry.isFile() && /\.(png|jpe?g|gif|webp|svg)$/i.test(entry.name)) {
        return relativePath;
      }

      if (entry.isDirectory() && !shouldIgnoreDirectory(entry.name)) {
        const nestedImage = findFirstImageAsset(absolutePath, relativePath, depth - 1);
        if (nestedImage) return nestedImage;
      }
    }
  } catch (error) {
    return null;
  }

  return null;
};

const extractMarkdownMeta = (filePath, relativePath, baseUrl) => {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const titleLine = content
      .split(/\r?\n/)
      .find((line) => /^#\s+/.test(line.trim()));

    const imageMatch =
      content.match(/!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/) ||
      content.match(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/i);
    const explicitCover = imageMatch
      ? normalizeAssetPath(imageMatch[1], relativePath, baseUrl)
      : null;

    return {
      title: titleLine ? titleLine.replace(/^#\s+/, "").trim() : null,
      cover:
        explicitCover ||
        findFirstImageAsset(path.dirname(filePath), path.dirname(relativePath)),
    };
  } catch (error) {
    console.warn(`Failed to read markdown metadata for ${filePath}:`, error.message);
    return { title: null, cover: null };
  }
};

const shouldIgnoreDirectory = (fileName) => {
  return ignoreFolders.has(fileName);
};

const shouldIgnore = (file, isRoot) => {
  const fileName = file.name;
  if (file.isDirectory()) {
    return shouldIgnoreDirectory(fileName);
  }

  if (file.isFile()) {
    if (isRoot) return fileName !== readmeFileName;
    return !displayFileTypes.has(path.extname(fileName).toLowerCase());
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

      // 针对根目录做过滤
      if (shouldIgnore(file, isRoot)) {
        return null;
      }

      // 如果是目录
      if (file.isDirectory()) {
        const children = generateDirectoryStructure(fullPath, baseUrl);
        if (children.length === 0) return null;

        return {
          type: "directory",
          name: fileName,
          path: relativePath,
          children,
        };
      }

      const fileType = path.extname(fullPath);
      const shouldPreferContentHistory = [".md", ".html", ".pdf"].includes(fileType.toLowerCase());
      const { createdAt, updatedAt } = getFileDates(
        fullPath,
        relativePath,
        baseUrl,
        shouldPreferContentHistory
      );
      const markdownMeta =
        fileType.toLowerCase() === ".md"
          ? extractMarkdownMeta(fullPath, relativePath, baseUrl)
          : { title: null, cover: null };
      const pathDate = extractPathDate(relativePath);

      return {
        type: "file",
        name: fileName,
        path: relativePath,
        fileType: fileType,
        title: markdownMeta.title,
        cover: markdownMeta.cover,
        date: pathDate || createdAt || updatedAt,
        pathDate: pathDate,
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
