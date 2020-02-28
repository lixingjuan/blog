<!--
 * @version: 0.0.1
 * @Author: lixingjuan <xingjuan.li@hand-china.com>
 * @Date: 2020-01-08 14:52:41
 * @copyright: Copyright (c) 2019, Hand
 -->
## Uncaught TypeError: Converting circular structure to JSON
- 描述: JSON.stringify()方法时报错  Converting circular structure to JSON
- 原因: 在请求中传递的对象有一个循环引用 