function getComponent() {
  import("lodash").then(({ default: _ }) => {
    console.log(
      "async-module",
      _.join(["another", "module", "hello", "world"])
    );
  });
}

getComponent();
