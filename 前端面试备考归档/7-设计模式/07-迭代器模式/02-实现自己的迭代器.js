const each = (arr, callback) => {
  for (let i = 0; i < arr.length; i++) {
    /**
     * TODO 为什么特意在这里用call
     */
    callback.call(arr[i], arr[i], i);
  }
};

// const demoArr = ["apple", "pear", "strawberry"];
// each(demoArr, console.log);

module.exports = {
  each,
};
