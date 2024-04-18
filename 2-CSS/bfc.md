# BFC

## 什么是BFC

在CSS中，BFC（Block Formatting Context，块级格式化上下文）是Web页面的可视化CSS渲染的一部分，用于布局块级盒子并决定它们如何相互作用以及与其它元素的关系和相互作用。**BFC是一个隔离的独立容器**，容器内部的元素不会影响到外面的元素，反之亦然。

## BFC的工作原理

BFC规定了内部的Block Box如何布局，具体规则包括：

1. **垂直布局**：在BFC中，盒子发生的布局是垂直方向的，一个接一个地放置。
2. **盒子垂直间距**：来自不同盒子的垂直距离由 `margin`决定。在BFC中，相邻的块级盒子的垂直外边距会发生重叠。
3. **BFC的区域不会与float box重叠**：BFC可以用来清除浮动，因为浮动元素对BFC内部的块格式化盒子布局没有影响。
4. **计算BFC的高度时，浮动元素也参与计算**：这是由于BFC内部的浮动元素也被视为BFC的一部分。

## 如何生成BFC

BFC通常由以下CSS属性的设置产生：

- `float` 的值不是 `none`。
- `position` 的值不是 `static` 或 `relative`。
- `overflow` 的值不是 `visible`。
- `display` 的值是 `inline-block`、`table-cell`、`table-caption`、`flex`、`inline-flex`、`grid` 或 `inline-grid`。

### 应用场景

**1. 清除内部浮动**：当容器内部的元素浮动时，容器不会自动扩展以包含该浮动元素。通过将容器设置为BFC，可以使容器包裹内部的浮动元素。

**示例**：

```css
.container {
  overflow: hidden;  /* 生成BFC */
}
.container .float-child {
  float: left;
}
```

**2. 阻止外边距折叠**：相邻的块级元素常常会发生外边距折叠现象，通过创建BFC可以避免这种情况。

**示例**：

```css
.div1 {
  overflow: hidden;  /* 生成BFC */
}
```

**3. 自适应多栏布局**：可以利用BFC防止某个内容区域被浮动元素覆盖，实现侧栏和内容主体的布局。

**示例**：

```css
.sidebar {
  float: left;
  width: 200px;
}
.content {
  overflow: hidden;  /* 生成BFC */
}
```

### 总结

理解BFC对于深入掌握CSS布局技术至关重要，尤其是在涉及浮动布局和边距折叠的复杂布局中。通过适当地使用BFC，开发者可以更精确地控制布局和元素之间的相互作用。
