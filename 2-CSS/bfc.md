## 如何开启BFC？

1. isplay的值是: flow-root、inline-block、table-cell、flex、table-caption或者inline-flex;
2. float的值不是none;
3. overflow的值不是visible;
4. position的值不是static或者relative;

## 创建bfc作用

1. 包含内部浮动
2. 清除外部浮动
3. 避免相邻元素垂直方向上外边距重叠



[BFC-MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)