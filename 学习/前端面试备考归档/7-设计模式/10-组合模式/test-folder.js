/** Folder */
var Folder = function (name) {
  this.name = name;
  this.files = [];
  this.parent = null;
};

Folder.prototype.add = function (file) {
  file.parent = this;
  this.files.push(file);
};

Folder.prototype.scan = function () {
  console.log("开始扫描文件夹: " + this.name);

  for (var i = 0, file, files = this.files; (file = files[i++]); ) {
    file.scan();
  }
};

/** File */
var File = function (name) {
  this.name = name;
};

File.prototype.add = function () {
  throw new Error("文件下面不能再添加文件");
};

File.prototype.scan = function () {
  console.log("开始扫描文件: " + this.name);
};

/** do something */
const folder = new Folder("学习资料");
const folder1 = new Folder("JavaScript");
const folder2 = new Folder("jQuery");

const file1 = new File("Js 设计模式");
const file2 = new File("精通jq");
const file3 = new File("重构与模式");

folder1.add(file1);
folder2.add(file2);

folder.add(folder1);
folder.add(folder2);
folder.add(file3);

console.log(folder);

folder.scan();
