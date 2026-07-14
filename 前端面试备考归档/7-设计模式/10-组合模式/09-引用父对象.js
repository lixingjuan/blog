/**
 * 应用场景，
 * 1. 从子节点向上冒泡传递
 * 2. 删除某个文件(夹)，实际上是从他的父节点删除
 */

// 改写07的Folder 和 File 类

class Folder {
  name = "";
  parent = null;
  children = [];

  constructor(name = "unknown") {
    this.name = name;
  }

  add(child) {
    child.parent = this;
    this.children.push(child);
  }

  remove() {
    if (!this.parent) {
      return;
    }
    const siblings = this.parent.children;
    for (let index = 0; index < siblings.length; index++) {
      const element = siblings[index];
      if (element === this) {
        siblings.splice(index, 1);
      }
    }
  }

  scan() {
    console.log(this.name);
    this.children.forEach((it) => it.scan());
  }
}

class File {
  name = "";
  parent = null;
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

/** 构造树 */
const Root = new Folder("根节点");
// “学习资料” 文件夹
const material = new Folder("学习资料");
const booksFolder = new Folder("books");
booksFolder.add(new File("book1"));
booksFolder.add(new File("book2"));
material.add(booksFolder);
material.add(new File("一张图片"));
Root.add(material);

/** 测试删除 */
booksFolder.remove();
Root.scan();
