/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/data.csv":
/*!*****************************!*\
  !*** ./src/assets/data.csv ***!
  \*****************************/
/***/ (function(module) {

module.exports = [["Mary"," John"," Reminder"," Call Cindy on Tuesday"],["Zoe"," Bill"," Reminder"," Buy orange juice"]]

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.less":
/*!************************!*\
  !*** ./src/style.less ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/assets/data.xml":
/*!*****************************!*\
  !*** ./src/assets/data.xml ***!
  \*****************************/
/***/ (function(module) {

module.exports = {"note":{"to":["Mary"],"from":["Mary"],"heading":["Reminder"],"body":["\n    Call Cindy on Tuesday\n  "]}}

/***/ }),

/***/ "./src/assets/data.json5":
/*!*******************************!*\
  !*** ./src/assets/data.json5 ***!
  \*******************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"title":"TOML Example","owner":{"name":"Tom Preston-werner","organizaion":"Github","bio":"Github Confounder & CEO \\n Likes tater tots and beer.","dob":"1979-05-27T07:32:00Z"}}');

/***/ }),

/***/ "./src/assets/data.toml":
/*!******************************!*\
  !*** ./src/assets/data.toml ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"title":"TOML Example","owner":{"name":"Tom Preston-werner","organizaion":"Github","bio":"Github Confounder & CEO \\n Likes tater tots and beer.","dob":"1979-05-27T07:32:00.000Z"}}');

/***/ }),

/***/ "./src/assets/data.yaml":
/*!******************************!*\
  !*** ./src/assets/data.yaml ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"title":"YAML Example","owner":{"name":"Tom Preston-werner","organizaion":"Github","bio":"Github Confounder & CEO\\nLikes tater tots and beer.","dob":"1979-05-27T07:32:00Z"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _style_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.less */ "./src/style.less");
/* harmony import */ var _assets_data_xml__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/data.xml */ "./src/assets/data.xml");
/* harmony import */ var _assets_data_xml__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_data_xml__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_data_csv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/data.csv */ "./src/assets/data.csv");
/* harmony import */ var _assets_data_csv__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_data_csv__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _assets_data_toml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/data.toml */ "./src/assets/data.toml");
/* harmony import */ var _assets_data_yaml__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/data.yaml */ "./src/assets/data.yaml");
/* harmony import */ var _assets_data_json5__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assets/data.json5 */ "./src/assets/data.json5");








document.body.innerText = "hello, I'm body";

document.body.classList.add("hello");

console.log((_assets_data_xml__WEBPACK_IMPORTED_MODULE_2___default()));
console.log((_assets_data_csv__WEBPACK_IMPORTED_MODULE_3___default()));

console.log(_assets_data_toml__WEBPACK_IMPORTED_MODULE_4__.title);
console.log(_assets_data_toml__WEBPACK_IMPORTED_MODULE_4__.owner.name);

console.log(_assets_data_yaml__WEBPACK_IMPORTED_MODULE_5__.title);
console.log(_assets_data_yaml__WEBPACK_IMPORTED_MODULE_5__.owner.name);

console.log(_assets_data_json5__WEBPACK_IMPORTED_MODULE_6__.title);
console.log(_assets_data_json5__WEBPACK_IMPORTED_MODULE_6__.owner.name);

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBLGtCQUFrQixRQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNBMUI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnFCO0FBQ0M7QUFDZTtBQUNDO0FBQ0E7QUFDQTtBQUNFOztBQUV4Qzs7QUFFQTs7QUFFQSxZQUFZLHlEQUFJO0FBQ2hCLFlBQVkseURBQUs7O0FBRWpCLFlBQVksb0RBQVU7QUFDdEIsWUFBWSx5REFBZTs7QUFFM0IsWUFBWSxvREFBVTtBQUN0QixZQUFZLHlEQUFlOztBQUUzQixZQUFZLHFEQUFXO0FBQ3ZCLFlBQVksMERBQWdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9kYXRhLmNzdiIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUuY3NzPzg3ZjEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlLmxlc3M/OGU3NCIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2RhdGEueG1sIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBbW1wiTWFyeVwiLFwiIEpvaG5cIixcIiBSZW1pbmRlclwiLFwiIENhbGwgQ2luZHkgb24gVHVlc2RheVwiXSxbXCJab2VcIixcIiBCaWxsXCIsXCIgUmVtaW5kZXJcIixcIiBCdXkgb3JhbmdlIGp1aWNlXCJdXSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIm1vZHVsZS5leHBvcnRzID0ge1wibm90ZVwiOntcInRvXCI6W1wiTWFyeVwiXSxcImZyb21cIjpbXCJNYXJ5XCJdLFwiaGVhZGluZ1wiOltcIlJlbWluZGVyXCJdLFwiYm9keVwiOltcIlxcbiAgICBDYWxsIENpbmR5IG9uIFR1ZXNkYXlcXG4gIFwiXX19IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5pbXBvcnQgXCIuL3N0eWxlLmxlc3NcIjtcbmltcG9ydCBEYXRhIGZyb20gXCIuL2Fzc2V0cy9kYXRhLnhtbFwiO1xuaW1wb3J0IE5vdGVzIGZyb20gXCIuL2Fzc2V0cy9kYXRhLmNzdlwiO1xuaW1wb3J0IHRvbWwgZnJvbSBcIi4vYXNzZXRzL2RhdGEudG9tbFwiO1xuaW1wb3J0IHlhbWwgZnJvbSBcIi4vYXNzZXRzL2RhdGEueWFtbFwiO1xuaW1wb3J0IGpzb241IGZyb20gXCIuL2Fzc2V0cy9kYXRhLmpzb241XCI7XG5cbmRvY3VtZW50LmJvZHkuaW5uZXJUZXh0ID0gXCJoZWxsbywgSSdtIGJvZHlcIjtcblxuZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwiaGVsbG9cIik7XG5cbmNvbnNvbGUubG9nKERhdGEpO1xuY29uc29sZS5sb2coTm90ZXMpO1xuXG5jb25zb2xlLmxvZyh0b21sLnRpdGxlKTtcbmNvbnNvbGUubG9nKHRvbWwub3duZXIubmFtZSk7XG5cbmNvbnNvbGUubG9nKHlhbWwudGl0bGUpO1xuY29uc29sZS5sb2coeWFtbC5vd25lci5uYW1lKTtcblxuY29uc29sZS5sb2coanNvbjUudGl0bGUpO1xuY29uc29sZS5sb2coanNvbjUub3duZXIubmFtZSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=