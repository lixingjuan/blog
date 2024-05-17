console.log("hello devServer");

fetch("/api/hello")
  .then((res) => res.text())
  .then((result) => {
    console.log(result);
  });
