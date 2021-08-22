


# 1. 1px 问题出现原因

`设备的[物理像素] & [逻辑像素]`

物理像素：移动设备出厂时，不同设备自带的不同像素，也称硬件像素；
逻辑像素：css 中记录的像素；

为什么在开中移动端在 CSS 中写了 1px 比实际上 1px 看起来粗？
因为 UI 设计师要求的实际上是指设备的物理像素 1px；

物理像素和逻辑像素的关系：
`逻辑像素(css像素) = 物理像素 * DPR`

DPR (devicePixelRatio) 设备像素比，默认缩放在 100%的情况下，设备像素和 CSS 像素的比值, 可以使用 `window.devicePixelRatio` 或 媒体查询 `-webkit-min-device-pixel-ratio` 获取， 当然比例多少与设备相关；

所以，比如 iPhone 的 DPR 为 2， 所以 css 写 1px 实际视觉效果是 2px, 所以显得比较粗；
iPhone6/7/8 DPR=2
iPhoneX DPR=3

# 2. 不同场景的实现

## 2.1. 仅一条线

实现方案: `transform: scaleY(0.5)`

<fieldset><legend>code</legend>

```html
<style>
  /* 分割线 */
  div.first-one-px {
    height: 1px;
    transform: scaleY(0.5);
    background-color: red;
  }
</style>

<div class="first-one-px"></div>
```

</fieldset>

<fieldset><legend>效果</legend>

<style>
  /* 分割线 */
div.first-one-px {
  height: 1px;
  transform: scaleY(0.5);
  background-color: red;
}
</style>

<div class="first-one-px border-1px"></div>

</fieldset>

## 2.2. 单条边框

<fieldset>

<legend>效果</legend>

<div>
  <style>
    div.second-one-px::after{
      content: "";
      width: 100%;
      display: block;
      border-bottom: 1px green solid;
      transform: scaleY(0.5);
    }
  </style>

  <div class="second-one-px"></div>
</div>

 </fieldset>

## 2.3. 有圆角的边框

- 优点: 该方案可设置圆角边框;
- 缺点: 会产生遮罩;
  - 处理方案:pointer-events

<fieldset><legend>效果</legend>

<style>
div.third-one-px{
  width: 200px;
  height: 200px;
}

.third-one-px {
  position: relative;
}

.third-one-px::before {
  content: "";
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  width: 200%;
  height: 200%;
  border: 1px solid rgb(212, 18, 238);
  transform: scale(0.5);
  transform-origin: left top;
  pointer-events: none; /* 防止点击触发 */
  box-sizing: border-box;
  border-radius: 40px;

  @media screen and (min-device-pixel-ratio: 3), (-webkit-min-device-pixel-ratio: 3) {
    width: 300%;
    height: 300%;
    -webkit-transform: scale(0.33);
    transform: scale(0.33);
  }
}
</style>
<div class="third-one-px border-1px"></div>
 </fieldset>
