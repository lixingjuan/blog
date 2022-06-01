this 四种指向

1. **用于方法** => 指向对象
2. **用于构造函数** => 指向新创建的对象
3. **函数** => 全局对象，浏览器为 window; "use strict" 模式为 undefined
4. **call, apply, bind** => 指向参数 1，若参数 1 为 null, 则只想默认 this

## 2.2 call 和 apply

## 2.2.2-call 和 apply 的用法

### 1. 修改 this 指向

（略）

### 2. 实现 bind

<CodeBlock language="js">{Code1}</CodeBlock>

### 3. 借用其他函数方法

注意：⚠️ 借用 Array.prototype.xx.call 方法时，需要满足两个条件

1. 对象本身要可以存储属性
2. 对象的 length 属性支持读写

比如，应用于字符串则会报错
`Array.prototype.push.call("hello", "world");`<br/>
TypeError: Cannot assign to read only property 'length' of object '[object String]'
