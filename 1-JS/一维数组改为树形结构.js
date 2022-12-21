const flatArr = [
  { id: "01", parentId: 0, name: "节点1" },
  { id: "011", parentId: "01", name: "节点1-1" },
  { id: "0111", parentId: "011", name: "节点1-1-1" },
  { id: "02", parentId: 0, name: "节点2" },
  { id: "022", parentId: "02", name: "节点2-2" },
  { id: "023", parentId: "02", name: "节点2-3" },
  { id: "0222", parentId: "022", name: "节点2-2-2" },
  { id: "03", parentId: 0, name: "节点3" },
];

/**
 * 找爸爸，
 * 没爸爸，自己就是爸爸 */
function flatArrToTree(arr) {
  const tree = [];
  const obj = arr.reduce((tol, cur) => Object.assign(tol, { [cur.id]: cur }), {});

  arr.forEach((item) => {
    // 从map结构中取出父节点
    const parent = obj[item.parentId];
    if (!parent) {
      // 没有parent, 代表是根节点
      tree.push(item);
      return;
    }

    !parent.children && (parent.children = []);
    parent.children.push(item);
  });

  return tree;
}

console.log(JSON.stringify(flatArrToTree(flatArr)));
