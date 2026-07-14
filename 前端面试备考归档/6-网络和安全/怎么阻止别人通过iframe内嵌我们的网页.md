# 防止页面被 iframe 内嵌

## x-frame-options

response-header 字段： X-Frame-Options

- deny：禁止，不允许任何网页嵌套，包括是同源的域名也不可以。
- sameorigin：只允许同源的域名访问
- allow-from：url

## Content-Security-Policy

简称 CSP

CSP 的主要目标是减少和报告 XSS 攻击

开启方式

1. 在 response-header 中配置策略
2. 也可以在 meta 标签中实现，如下

```js
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';">

```

## 通过窗口判断

```js
if (window.top != window.self) {
  window.top.location = window.self.location; // 替换顶级窗口的地址
}
```
