## 参考文章
- React最佳实践系列 —— Dva 进阶之路由和动态加载 ：https://blog.csdn.net/topgum/article/details/83040299
- React Router 4 简介及其背后的路由哲学： https://github.com/rccoder/blog/issues/29
- React-Router动态路由设计最佳实践：https://segmentfault.com/a/1190000011765141?utm_source=tag-newest

## dva路由原本的写法
- 这样每次添加路由都要修改import和<Router>标签两处，若之后路由很多，麻烦又不好管理
- 静态路由缺点：即使不需要有些页面，也还是会把他的路由渲染了，性能浪费，而且也不符合react组件思想
- dva原本路由代码

```javascript
import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
      </Switch>
    </Router>
  );
}
export default RouterConfig;
```


## 动态路由我的理解

- 只渲染用户请求的页面的路由
- dynamic背后做了什么我还没看
- 优点: 提高了首屏加载时间

## 存在的问题

- ？问题1：Hzero没有import组件，我还没明白怎么弄
- ？问题2：目前的写法，未考虑嵌套多层路由的情况，有点生硬


## 路由抽数组+动态路由配置全部代码

- 做法：就是使用抽出一个数组，然后使用react的语法，遍历再渲染Routr标签
- 现在说起来容易，当时怎么都搞不好，各种报错+不生效，代码路真是坎坷


```javascript
// 位置：src/router.js
import React from 'react';
import { Route, Switch, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic'

const { ConnectedRouter } = routerRedux

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: "/",
      component: () => import('./routes/index'),
      name: 'IndexPage'
    },
    {
      path: "/Test",
      component: () => import('./routes/Test/index'),
      name: 'Test'
    }
  ];

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <div>
          {
            routes.map(({ path, name, ...dynamics }) => {
              const Component = dynamic({ app, ...dynamics })
              return (
                <Route path={path} key={name} exact
                  render={(props) => {
                    return (<Component {...props} />)
                  }} />
              )
            })
          }
        </div>
      </Switch>
    </ConnectedRouter>
  )
}

export default RouterConfig;

```


## ×遇见的报错
TypeError: Cannot read property 'location' of undefined
- 原因1：router引入位置错误
- 原本写法

```JavaScript
import { Link, Router, Route } from 'dva/router';
```
- 改正写法

```JavaScript
import { Link, Route } from 'dva/router';
import { BrowserRouter as Router } from "react-router-dom";
```


- 原因2：+号位置忘记写 history={history}（仍迷茫）
- 迷茫todo：这都是一堆啥？history我知道是指定路由方式的，但是ConnectedRouter是干嘛的？我这一通动态路由配置老子很懵


```JavaScript
+<ConnectedRouter history={history}>
      <Switch>
        <div>
          {
            routes.map(({ path, name, ...dynamics }) => {
              const Component = dynamic({ app, ...dynamics })
              return (
                <Route path={path} key={name} exact
                  render={(props) => {
                    return (<Component {...props} />)
                  }} />
              )
            })
          }
        </div>
      </Switch>
    </ConnectedRouter>
```

