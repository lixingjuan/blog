/**
 * 1. 实现文件 和 文件夹
 * 2. 文件不能再增加内容
 * 3. 文件夹有add方法和scan方法
 *    3-1: 文件夹add => push
 *    3-1: 文件夹scan => 遍历调用file的scan方法，
 */

class Folder {
  name = "";
  children = [];

  constructor(name = "unknown") {
    this.name = name;
  }

  add(child) {
    this.children.push(child);
  }

  scan() {
    console.log(this.name);
    this.children.forEach((it) => it.scan());
  }
}

class File {
  name = "";
  children = [];

  constructor(name = "unknown") {
    this.name = name;
  }

  add() {
    throw new Error("文件下面不能增加节点");
  }

  scan() {
    console.log(this.name);
  }
}

const Root = new Folder("根节点");
// “学习资料” 文件夹
const material = new Folder("学习资料");
const booksFolder = new Folder("books");
booksFolder.add(new File("book1"));
booksFolder.add(new File("book2"));

material.add(booksFolder);
material.add(new File("一张图片"));

Root.add(material);

Root.scan();
