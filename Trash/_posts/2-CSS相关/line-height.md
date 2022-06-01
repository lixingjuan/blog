
## 内容总结

具体来说是指两行文字间基线之间的距离
英文单词，即四线格的倒数第二条线，
中文由于没有基线的概念，所以可以理解为文字底部(不同浏览器的实现不同)


撑起无高度div的是 **行高**，而非 **文字大小**

<div style="margin: 100px auto;">

<style>
    .test1{ font-size:20px; line-height:0; border:1px solid #cccccc; background:#eeeeee;}
    .test2{ font-size:0; line-height:20px; border:1px solid #cccccc; background:#eeeeee;}
</style>

<div class="test1">测试1</div>
<div class="test2">测试2</div>
</div>

### 行高还有一个特性，叫做垂直居中性

line-height的最终表现是通过line boxes实现的，而无论line boxes所占据的高度是多少（无论比文字大还是比文字小），
其占据的空间都是与文字内容公用水平中垂线的。

由于 ⬆️ 测试一的表现 => **字体大小正常，而line-height为0时，文字文字的水平中垂线对称分布的**
可以利用该特性，实现文字或图片的垂直居中对齐；

> TODO: ios, 安卓，由于对中文字体的baseline的实现不同，导致无论是使用 `display: flex; align-items: center;` 还是使用 `line-height: 容器高度`，两者表现都不一致，我最终怎么解决的来着？





### 在单行或多行或图片垂直居中实现上的应用

1. 单行文字的垂直居中对齐
将 line-height 设置为所需的容器高度即可，并不需要同步设置容器高度

2. 多行文字的垂直居中
   1. 高度不固定：利用padding;
   2. 容器高度固定, 里面文字单行或多行显示，字体大小有大有小: 设置容器的line-height属性为所需容器高度值；




### 行高在文章显示中的应用

首先要知道行高的几种表示方法：px/em，或normal，或百分值，或数值，或inherit继承

在显示文章的box里，px的表示方法首先是要被淘汰的。因为文章里面的文字是有大有小的，使用px定值，由于继承性，无法实现根据文字大小自动调整间距，会出现大号文字重叠的现象。normal也是不行的，一般文章显示最好是650像素的宽度，1.5倍的行距较好。一般浏览器的normal值在1~1.2之间，使用normal必然文字间距过小，阅读吃力。








## 参考文章

[css行高line-height的一些深入理解及应用](https://www.zhangxinxu.com/wordpress/2009/11/css%E8%A1%8C%E9%AB%98line-height%E7%9A%84%E4%B8%80%E4%BA%9B%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E5%8F%8A%E5%BA%94%E7%94%A8/)