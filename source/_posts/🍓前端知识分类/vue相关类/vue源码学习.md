# vue源码学习

## 目录结构 - src

```javascript
src
├── compiler        # 编译相关 
├── core            # 核心代码 
├── platforms       # 不同平台的支持
├── server          # 服务端渲染
├── sfc             # .vue 文件解析
├── shared          # 共享代码
```

**compiler**

compiler 目录包含 vue.js所有编译相关的工作，它包括把模版解析成ast语法树，ast语法优化，代码生成等功能

编译的工作可以在构建的时候做(借助 webpack、vue-Loader等辅助插件)，也可以在运行的时候做（使用包含构建功能的vue.js）
编译是一项耗性能的工作，所以更推荐前者--离线编译


**core**

core目录包含了vue.js的核心代码，包括一些插件、全局API的封装，vue实例化、观察者、虚拟DOM、工具函数等；

这的代码是vue的灵魂，也是重点学习部分；


**platform**

vue.js是一个跨平台的MVVM框架，既可以跑在web端，也可以搭配weex跑在nativa客户端。

platform 是vue.js的入口，两个目录代表两个主要入口，web入口打包后的vue.js和weex入口打包后的vue.js

**server**

这里是vue.js所有的服务器端渲染相关的逻辑（vue.js支持服务器端渲染）
这部分代码是跑在node.js伤的，不要和跑在浏览器端的vue.js搞混

服务器端渲染的主要的工作是将组件渲染为可以跑在服务器端的HTML字符串，然后将它发送给浏览器客户端，最后将静态标记'混合'为完全交互的应用程序

**sfc**

这里的代码负责将我们编写的.vue文件解析为一个个的javascript的**对象**

通常我们开发的vue.js都会借助webpack构建，然后通过.vue文件编写组件，编译工作webpack已经帮我们做了，即前面说的“离线构建”

**shared**

vue.js定义的一些所有目录（包括客户端和服务器端）共享的**工具方法**


## src/core

```javascript
core
├── components        # 内置组件 keep-alive
├── global-api        # 公共api(mixin等等) 
├── instance          # 渲染的辅助函数(初始化，生命周期等等)
├── observer          # 和响应式数据相关，vue的核心概念
├── util              # 一些工具方法
├── vdom              # 虚拟DOM
├── config.js           
├── index.js           
```

## src/sfc

```javascript
sfc
├── parser.js        # 将 .vue文件编译为javascript对象
```