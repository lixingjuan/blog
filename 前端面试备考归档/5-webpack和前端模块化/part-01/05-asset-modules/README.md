1. 4中静态资源的导入方式
   1. `type: "asset/resource"`: 生成文件并导出文件URL
   2. `type: "asset/inline"`: 生成base64
   3. `type: "asset/source"`: 导出资源源代码
   4. `type: "asset"`: 通用资源类型，在1，2中选择，默认>8k,选择1 ，可以通过 `parser.dataUrlCondition.maxSize` 来自定义