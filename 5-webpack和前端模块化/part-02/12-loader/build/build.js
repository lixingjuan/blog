/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ (function() {

eval("throw new Error(\"Module parse failed: Unexpected token (10:27)\\nFile was processed with these loaders:\\n * ./loaders/simple-style-loader.js\\n * ./node_modules/css-loader/dist/cjs.js\\nYou may need an additional loader to handle the result of these loaders.\\n|   * 将获取 css 的 require 表达式赋给 style 标签\\n|   */\\n>   style.innerHTML = import \\\"!!../node_modules/css-loader/dist/cjs.js!./index.css\\\";\\n|   // 将 style 标签插入 head\\n|   document.head.appendChild(style);\");\n\n//# sourceURL=webpack://12-loader/./src/index.css?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("__webpack_require__(/*! ./index.css */ \"./src/index.css\");\nconsole.log('ce');\n\n// import { getMax } from './math'\n// const max = getMax([1, 2, 3, 4, 5])\n\n// console.log(max)\n\n// const app = document.getElementById(\"app\")\n\n// const div = document.createElement(\"div\");\n// div.innerHTML = \"Hello World\";\n// div.style = \"width: 200px; height: 200px; background-color: #345634; color: #fff;\"\n\n// app.appendChild(div)\n\n//# sourceURL=webpack://12-loader/./src/index.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;