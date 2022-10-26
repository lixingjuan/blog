见： 设计模式/03-闭包/3.1.6-闭包与内存管理.md
https://github.com/yacan8/blog/issues/33

## 浏览器

标记清除

## 分代垃圾回收机制

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/357189121dda46368c4200eeb481c957~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?"/>


1. 堆空间分为两部分，**新生区**（小） 和 **老生区**（大）;
2. 新生区
   1. 采用Scavenge算法实现;
   2. 分为 **From** 区（激活区-new space）和 **To区**（未激活区（inactive new space））;
3. 新增加的对象都放在新生代-From区;
4. 等 **From区** 快满的时候，会执行一次垃圾清理;
5. 先给 **From区** 所有垃圾做标记;
6. 标记完成后，存活的对象被复制到 **To区**，并且将他们有序的排列一遍
7. 然后将**from-space**中的非活动对象的内存进行释放，完成之后，
8. 将**from space** 和**to space**进行互换，这样可以使得新生代中的这两块区域可以重复利用。

## 什么时候 新生代 晋升 老生代？

**下一次垃圾回收**，如果这个对象还在新生代中，副垃圾回收器会将该对象移动到老生代中，这个移动的过程被称为晋升。