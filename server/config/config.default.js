exports.keys = "lixingjuancookies";

// 添加 view 配置
exports.view = {
  defaultViewEngine: "nunjucks",
  mapping: {
    ".tpl": "nunjucks"
  }
};

// 添加 news 的配置项
exports.news = {
  pageSize: 5,
  serverUrl: "https://news.baidu.com/widget?id=LocalNews&ajax=json"
};

// 添加 news 的配置项
exports.juejinSearch = {
  pageSize: 5,
  searchUrl: "https://apinew.juejin.im/search_api/v1/search",
  myLikeUrl: "https://apinew.juejin.im/interact_api/v1/digg/query_page"
};

// add middleware robot
exports.middleware = ["robot"];
// robot's configurations
exports.robot = {
  ua: [/Baiduspider/i]
};
