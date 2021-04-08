历程
1. 采用html2canvas导出图片，刚开始看起来挺好
2. 问题：




```flow
s=start:开始
e=end:结束
o=operation:操作项

s-o-e
```



# html2canvas保存图片踩坑
## 正常获取dom导出没有问题
## 但是该库不支持插入dom
## 新起iframe,将页面嵌入导出
