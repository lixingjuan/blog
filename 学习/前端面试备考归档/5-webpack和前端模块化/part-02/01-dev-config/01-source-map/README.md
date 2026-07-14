# 7中source-map

```js
{
  devtools: ?
}
```

| 值                       | 描述                                                                                                |
|--------------------------|-----------------------------------------------------------------------------------------------------|
| eval(默认值)             | eval("console.log(1);\n\n\n//# sourceURL=webpack://01-source-map/./app.js?");                       |
| source-map               | 生成一个 main.js.map 文件                                                                           |
| *cheap-module-source-map | 生成一个没有列信息的SourceMap文件，loader的 SourceMap 也被简化为只包含行信息                        |
| cheap-source-map         | 生成一个没有列信息的SourceMap文件，不包含loader的sourcemap(譬如babel的SourceMap)                    |
| hidden-source-map        | js文件末尾没有注释qq`//# sourceMappingURL=main.js.map` => js文件和map文件不会形成关联=>定位不到源码 |
| inline-source-map        | 生成dataURL形式的SourceMap文件                                                                      |
| eval-source-map          | 每个module会通过eval来执行                                                                          |


推荐* `cheap-module-source-map`