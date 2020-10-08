# 1px

## 出现原因

`设备的[物理像素] & [逻辑像素]`

物理像素：移动设备出厂时，不同设备自带的不同像素，也称硬件像素；
逻辑像素：css中记录的像素；

为什么在开中移动端在CSS中写了1px比实际上1px看起来粗？
因为UI设计师要求的实际上是指设备的物理像素1px；

物理像素和逻辑像素的关系：
`逻辑像素 = 物理像素 * DPR` 

DPR (devicePixelRatio) 设备像素比，默认缩放在100%的情况下，设备像素和CSS像素的比值, 可以使用 `window.devicePixelRatio` 或 媒体查询 `-webkit-min-device-pixel-ratio` 获取， 当然比例多少与设备相关；

所以，比如iPhone的 DPR 为2， 所以css 写 1px 实际视觉效果是 2px, 所以显得比较粗；
iPhone6/7/8 DPR=2
iPhoneX DPR=3

## 解决方法

方法1: 使用 `transform: scaleY(0.5)`


```css
/* 分割线 */
div{
  height: 1px;
  transform: scaleY(0.5);
  background-color: red;
}






/* 单边框 */
div::after{
  content: "";
  width: 100%;
  display: block;
  border-bottom: 1px green solid; // ？？ 1: 为什么会出现在上面？
}





/* 有圆角边框 */
/* 问题: 会产生遮罩 */
/* 处理方案:pointer-events */
.border-1px {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    display: block;
    left: 0;
    top: 0;
+   width: 200%;
+   height: 200%;
+   border: 1px solid rgb(212, 18, 238);
+   transform: scale(0.5);
    transform-origin: left top;
    -webkit-transform: scale(0.5);
    -webkit-transform-origin: left top;
    color: red;
    pointer-events: none; /* 防止点击触发 */
    box-sizing: border-box;
    @media screen and (min-device-pixel-ratio: 3), (-webkit-min-device-pixel-ratio: 3) {
      width: 300%;
      height: 300%;
      -webkit-transform: scale(0.33);
      transform: scale(0.33);
    }
  }
}
```


效果图(iphoneX, dpr是3)

<img  src='/Blog/images/1px.jpg' />



 


 



 