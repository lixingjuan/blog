// const book = {
//   title: 'Profeeeional javas',
//   authors: ['2', 2],
//   edition: 4444,
//   year: 2018
// }

let book = {
  title: "Professional",
  authors: [
    "Nicholas C. Zakas",
    "Matt Frisbie"
  ],
  edition: 4,

};

let jsontext1 = JSON.stringify(book, (key, value) => {
  switch (key) {
    case "title":
      return value.split('').join('-')
    case "authors":
      return value.join(",")
    default:
      return value
  }
})



console.log(jsontext1)



let jsonTex2 = JSON.stringify(book, (key, value) => {
  switch (key) {
    case "authors":
      return value.join(",")
    case "year":
      return 5000;
    case "edition":
      return undefined;
    default:
      return value;
  }
});

console.log(jsonTex2)