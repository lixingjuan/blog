const reverseEach = (arr, callback) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    // TODO 原书中这里为什么又不call绑定了？
    callback.call(arr[i], arr[i], i);
  }
};

reverseEach(["apple", "pear", "strawberry"], console.log);
