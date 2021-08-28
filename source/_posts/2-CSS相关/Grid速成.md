# 一些测试

<div>

  <style>
    fieldset ul {
      resize: both;
      overflow: scroll;
    }

    fieldset li:nth-child(odd) {
      background-color: royalblue;
    }
    fieldset li:nth-child(even) {
      background-color: goldenrod;
    }

    fieldset ul.flex {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
    fieldset ul.flex li {
      width: 33%;
      list-style: none;
    }

    fieldset ul.grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  </style>
  <h2>分别使用grid 和 flex 实现一行三个元素，超出换行</h2>
  <fieldset class="flex-fieldset">
    <legend>flex</legend>
    <ul class="flex">
      <li>flex-item</li>
      <li>flex-item</li>
      <li>flex-item</li>
      <li>flex-item</li>
      <li>flex-item</li>
    </ul>
  </fieldset>

  <fieldset>
    <legend>grid</legend>
    <ul class="grid">
      <li>grid-item</li>
      <li>grid-item</li>
      <li>grid-item</li>
      <li>grid-item</li>
      <li>grid-item</li>
    </ul>
  </fieldset>
</div>

## auto

grid-template-columns: repeat(2, 100px) auto repeat(2, 80px) auto;

<style>
.AAAA {
  resize: both;
  height: 200px;
  overflow: scroll;
}

.AAAA ul {
height: 100%;
display: grid;
overflow: scroll;
grid-template-columns: repeat(2, 100px) auto repeat(2, 80px) auto;
}

.AAAA ul li {
border: 1px solid rosybrown;
background-color: royalblue;
list-style: none;
color: #fff;
}
</style>

<div class="AAAA">
  <ul>
    <li>100px</li>
    <li>100px</li>
    <li>auto</li>
    <li>80px</li>
    <li>80px</li>
    <li>auto</li>
  </ul>
</div>

# 测试

[效果测试](https://jsbin.com/piyunuwume/edit?html,css,output)

# grid 速成

# 容器属性

| 属性                    | 描述                                                                                                                                            |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| `display`               | grid/inline-grid                                                                                                                                |
| `grid-template-rows`    | 每行行高                                                                                                                                        |
| `grid-template-columns` | 每列列宽                                                                                                                                        |
| `grid-row-gap`          | 行与行的间隔（行间距）                                                                                                                          |
| `grid-column-gap`       | 列与列的间隔（列间距）                                                                                                                          |
| `grid-gap`              | grid-column-gap 和 grid-row-gap 的合并简写形式                                                                                                  |
| `grid-template-areas`   | 定义每个子区域名称                                                                                                                              |
| `grid-auto-flow`        | 元素流动方向，默认 row，即"先行后列"。<br> column: "先列后行"                                                                                   |
| `justify-items`         | 单元格内容的水平位置（左中右）                                                                                                                  |
| `align-items`           | 单元格内容的垂直位置（上中下）                                                                                                                  |
| `place-items`           | align-items 属性和 justify-items 属性的合并简写形式。                                                                                           |
| `justify-content`       | 整个内容区域在容器里面的水平位置（左中右）                                                                                                      |
| `align-content`         | 整个内容区域的垂直位置（上中下）                                                                                                                |
| `grid-auto-rows`        | 浏览器自动创建的多余网格的行高 (写法同 grid-template-rows)                                                                                      |
| `grid-auto-columns`     | 浏览器自动创建的多余网格的列宽 (写法同 grid-template-columns)                                                                                   |
| `grid-template`         | grid-template-columns、grid-template-rows 和 grid-template-areas 这三个属性的合并简写形式                                                       |
| `grid`                  | grid-template-rows<br>grid-template-columns<br>grid-template-areas<br> grid-auto-rows<br>grid-auto-columnsgrid-auto-flow 六个属性的合并简写形式 |

## 列宽

属性值

1. 行高：`grid-templete-rows`
2. 列宽：`grid-templete-columns`

| name         | 属性值                      | 描述                                                                                       |
|--------------|-----------------------------|--------------------------------------------------------------------------------------------|
| `普通用法`   | `100px 100px`               | 2 列, 宽为 100px                                                                           |
| `百分比`     | `45% 45%`                   | 2 列, 宽为容器的 45%                                                                       |
| `repeat`     | `repeat(2, 100px)`          | 2 列, 宽为 100px                                                                           |
| `repeat多列` | `repeat(2, 100px 120px)`    | 4 列, 宽度依次为 100px 120px 100px 120px                                                   |
| `auto-fill`  | `repeat(auto-fill, 100px)`  | 列数不固定，每列宽 100px                                                                   |
| `fr`         | `100px 1fr 2fr`             | 3 列，第一列 10px, 剩余空间均分三份，第二列 1 份，第三列两份                               |
| `minmax`     | `1fr 1fr minmax(100px 1fr)` | 3 列，第 3 列最窄 100px，最宽 1fr, 第 1，2 列宽均为 1fr (若容器宽度为 100px, 则总宽度溢出) |
| `auto`       | `100px auto 100px`          | 3 列, 其他宽度都给中间列                                                                   |

## 自动生成的行和列的宽度

如果一个容器只有三列, 但是一个项目指定在第五列，则会自动生成一个第四列，该属性则用于指定自动生成的列的宽度；
若不指定，浏览器则完全按照单元格内容的大小赋予宽度；

```css
grid-auto-columns: []
grid-auto-rows: []
```

## 网格线命名

```css
.container {
  display: grid;
  grid-template-columns: [c1 x1] 100px [c2] 100px [c3] auto [c4]; // 同一根线有多个名字, 如 [c1 x1]
  grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
}
```

## 区域命名

**grid-template-areas**: 划分了 9 个区域的名字

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas:
    "a b c"
    "d e f"
    "g h i";
}
```

如果某些区域不需要利用，则使用"点"（.）表示。

```css
grid-template-areas:
  "a . c"
  "d . f"
  "g . i";
```

> 注意，区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为区域名-start，终止网格线自动命名为区域名-end。
> 比如，区域名为 header，则起始位置的水平网格线和垂直网格线叫做 header-start，终止位置的水平网格线和垂直网格线叫做 header-end

## 列/行间隔

**grid-column-gap**
**grid-row-gap**
**grid-gap** : <grid-row-gap> <grid-column-gap>

注：grid-可省略

```css
grid-column-gap: 10px; // 列间隔 10px;
grid-row-gap: 10px; // 行间隔 10px;
grid-gap: 10px 12px; // 缩写，行间隔均为10px, 列间隔均为12px;

grid-column-gap: 10px 12px; // 第一列列间隔 10px，后面的都为12px;
grid-row-gap: 10px 12px; // 第一行行间隔 10px，后面的都为12px;
```

## flow 顺序

**grid-auto-flow**

默认 flow 方向为 **先行后列**，若该属性值为 **column** , 则 **先列后行**

```css
grid-auto-flow: row; // 先行后列
grid-auto-flow: column; // 先列后行
grid-auto-flow: row/column dense; // 某些项目设置位置后，其他项目怎么flow
```

## grid 位置

**justify-content** 整个 grid 容器在其父容器的水平位置
**align-content** 整个 grid 容器在其父容器的垂直位置
**place-content** 缩写， <align-content> <justify-content>

```css
.container {
  justify-content: start | end | center | stretch | space-around | space-between
    | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between |
    space-evenly;
}
```

## 单元格内容位置

设置在父元素上

**justify-items**,

```css
justify-items: start | end | center | stretch;
```

**align-items** :单元格内容的垂直位置

```css
align-items: start | end | center | stretch;
```

**place-items** :简写

```css
place-items: <align-items> <justify-items>;
place-items: center end; // 垂直方向居中，水平方向对齐结束位置
```

- start：对齐单元格的起始边缘;
- end：对齐单元格的结束边缘;
- center：单元格内部居中;
- stretch：拉伸，占满单元格的整个宽度（默认值);

## 多余行/列

多余行/列： 有时只定义了三行，但是某个元素被指定于第五行，浏览器就会生成多余的行来放置该元素；

**grid-auto-columns** :多余生成的列宽度
**grid-auto-rows** :多余生成的行高度

## 缩写

**grid-template** :grid-template-columns、grid-template-rows 和 grid-template-areas 这三个属性的合并简写形式;
**grid** : 属性是 grid-template-rows、grid-template-columns、grid-template-areas、 grid-auto-rows、grid-auto-columns、grid-auto-flow 这六个属性的合并简写形式; （不易读，不推荐）

# 项目属性

## 指定项目位置

通过指定项目四个边框的位置，指定项目的位置
使用这四个属性，如果产生了项目的重叠，则使用 z-index 属性指定项目的重叠顺序。

- grid-column-start 属性：左边框所在的垂直网格线
- grid-column-end 属性：右边框所在的垂直网格线
- grid-row-start 属性：上边框所在的水平网格线
- grid-row-end 属性：下边框所在的水平网格线

## 指定项目区域

**grid-area**

```css
.item-1 {
  grid-area: e;
}
```

## 指定项目对齐方式

**justify-self**
**align-self**
**place-self**

用法同 **justify-items**， **align-items**

# 参考文章

1. [阮一峰 grid](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)
