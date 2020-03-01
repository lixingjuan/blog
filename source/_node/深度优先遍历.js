var root = {
  name: "A",
  children: [
    {
      name: "B1",
      children: [
        {
          name: "C1",
          children: [{ name: "D1" }, { name: "D2" }, { name: "D3" }]
        },
        { name: "C2" },
        { name: "C3" }
      ]
    },
    {
      name: "B2",
      children: [{ name: "C4" }, { name: "C5" }]
    }
  ]
};

// 先序遍历
var preOrder = function(node) {
  if (node) {
    console.log(node.name);
    if (node.children && node.children.length) {
      node.children.map(item => {
        preOrder(item);
      });
    } else {
      return;
    }
  }
};
preOrder(root);
