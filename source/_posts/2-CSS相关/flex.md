<!--

<div>
  <style>
    .wrapper1 {
      display: flex;
      flex-direction: column;
      height: 100px;
      border: 3px red solid;
    }
    .top {
      background-color: aqua;
    }
    .bottom {
      background-color: rgba(22,33,55, 0.4);
      margin: unset !important;
    }
    .bottom ul li {
      height: 20px;
      list-style: none;
    }
  </style>
  <h2>flex 设置了固定高度，并为其设置 flex, 列表的长度会超出容器 </h2>
  <h3> 解决方法，根据方向为被撑开的flex-item 设置:
  纵向：height: 0; 或者 min-height: 0; 横向：width: 0;  或者 min-width: 0;</h3>
  <div class="wrapper1">
    <div class="top">top</div>
    <div class="bottom">
      <ul>
        <li>wowoo</li>
        <li>wowoo</li>
        <li>wowoo</li>
        <li>wowoo</li>
        <li>wowoo</li>
        <li>wowoo</li>
        <li>wowoo</li>
        <li>wowoo</li>
        <li>wowoo</li>
        <li>wowoo</li>
      </ul>
    </div>
  </div>
</div>



 -->
<div class="wrap2">

<style>
.wrap2 {
  resize: both;
  overflow: scroll;
  margin-top: 200px;
}

.parent {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: unset !important;
}

.box {
  height: 80px;
  flex: 1 1 150px;
  margin: 5px;
  flex-basis: 33.3%;
}

.green {
  background-color: green;
  color: #fff;
  list-style : none;
}
</style>

<h2>flex一行三个元素，超出换行</h2>
<ul class="parent white">
  <li class="box green">1</li>
  <li class="box green">2</li>
  <li class="box green">3</li>
  <li class="box green">4</li>
  <li class="box green">5</li>
</ul>
</div>

# 容器属性

1. display
2. flex-direction
3. flex-wrap
4. flex-flow
5. justify-content
6. align-items
7. align-content

## flex-disection

## flex-wrap

```css
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

默认：nowrap， 不换行

# 项目属性
order
flex-grow
flex-shrink
flex-basis
flex
align-self



## order

定义==项目的排列顺序==。数值越小，排列越靠前，默认为0

## flex-grow

属性定义==项目的放大比例==，默认为0，即如果存在剩余空间，也不放大
若一个项目的flex-grow属性为1，其他项目都为0，则空间多余时，前者放大；

## flex-shrink

项目的缩小比例，默认为1，即如果空间不足，该项目将缩小;
若一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小；

## flex-basis

定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小

## flex

flex属性是flex-grow, flex-shrink 和 flex-basis的简写
默认值为0 1 auto。后两个属性可选;

## align-self:
允许==单个项目有与其他项目不一样的对齐方式==，可覆盖align-items属性;