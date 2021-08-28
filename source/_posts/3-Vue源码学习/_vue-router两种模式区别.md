Vue-Router 有两种模式: hash 和 history

hash 在路由切换的时候，是通过监听window.onhashChange实现的
history是HTML5新增的一个api, 他会记录我们所有的路由切换历史，有一个历史栈，我们可以对其进行清空， push, pop, replace 更改


history模式如果找不到某个路由匹配的资源，就会返回404，所以通常会在nginx配置一个匹配所有路由的 html


```js
location / {
  try_files $uri $uri/ /index.html;
}
```