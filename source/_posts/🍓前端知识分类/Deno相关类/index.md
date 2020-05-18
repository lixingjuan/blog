## deno和node区别

1. deno支持ES6 Module, 而node遵循 CommonJS 模块格式 与 ES 模块不兼容;
2. 由于历史原因，node必须支持回调函数，导致异步接口会有Promise和回调函数两种写法;
3. 内置v8引擎，内置ts引擎，若文件结尾 `.ts` 则调用v8引擎；若结尾 `.js` 则调用js引擎；
4. node 加载模块是从中心化模块系统引入，举例：

```js
// TODO: 这里我是有疑问的，我突然有点迷茫ES6 ， CommonJS区别了
import React from 'react'
import { Box, Grid} from '@material-ui/core'
```

但是deno完全通过URL（绝对路径或相对路径引入模块）(所以上面的写法在deno中都会失效)，不需要中心化模块系统，但是demo下载后仍然会有一个总的目录，在本地缓存模块，因此可以离线使用；
deno所有的模块都要通过入口脚本加载，不能通过模块名加载，所以必须带有后缀名；

```js
import { bar } from 'https://foo.com/bar.ts'  // 绝对路径
OR
import { bar } from './foo/bar.ts'  // 相对路径
```


5. ?? Deno 只有一个可执行文件，所有操作都通过这个文件执行；可跨平台（MAC，linux,Windows）
6. 全局环境变量是window, 支持大多js原生方法;
7. 脚本默认不具备读写文件等功能，除非运行时添加参数；