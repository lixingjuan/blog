// // const oneLine = function () {

// // };

// let x = "hi";
// let y = "haha";
// let a = "aaa";
// let b = "bbb";
// let c = "ccc";
// // function message(literals, value1, value2) {
// //   /*  console.log(literals); // [ "", ", I am ", "" ]
// //   console.log(value1); // Hi
// //   console.log(value2); // Kevin */
// // }

// function oneLine(template, ...expressions) {
//   console.log(template);
//   let result = template.reduce((tol, cur, index) => tol + expressions[index - 1] + cur);
//   result = result.replace(/(\n\s+)/g, " ");
//   result = result.trim();

//   return result;
// }

// function includeArrays(template, ...expressions) {
//   let result = template.reduce((prev, next, i) => {
//     let expression = expressions[i - 1];

//     if (Array.isArray(expression)) {
//       expression = expression.join("");
//     }

//     return prev + expression + next;
//   });

//   result = result.trim();

//   return result;
// }

// let html = `
// 	<span>1<span>
// 	<span>2<span>
// 		<span>3<span>
// `;
// console.log(includeArrays`
// 	<span>1<span>
// 	<span>2<span>
// 	<span>3<span>
// `);
