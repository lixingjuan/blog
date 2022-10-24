// loaders/simple-loader.js

module.exports = function loader (content, map) {
  console.log('simple-loader is working', content, map);
  // console.log('simple-loader is working');
  return content;
}

// module.exports.pitch = function (remainingRequest, precedingRequest, data) {
//   console.log('this is pitch', remainingRequest,precedingRequest, data);

// };

// module.exports.pitch = function (remainingRequest, precedingRequest, data) {
//   // console.log('this is pitch', remainingRequest,precedingRequest, data);
// };