# less速成
Less 是一门 CSS 预处理语言，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展。
Less 可以运行在 Node 或浏览器端。

# 常见用法

## 变量

变量可以用作属性值，也可以用作属性名称，也可以从其他地方引用。

变量定义: `变量用@+字符定义;`
 
定义了一个nice-blue变量
变量用作css的属性值

```css
@nice-blue: #5B83AD;

#header{color:@light-blue;}
```

输出：

```css
#header{color: #5B83AD;}
```

## 插值

变量可以作为插值, 就是字符串替换。
可以用在选择器名称，css属性名，路径，@import，甚至变量名称都可以。

下面以用在选择器为例，其他都是这种规则：


```less
/* 用在选择器名称中 */
+ @my-selector: banner;

+ .@{my-selector}{
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}

/* 作为属性 */
@base-color: green;
@dark-color: darken(@base-color, 10%);
 
div{
  background-color: @dark-color;
}
```

需要这种方式`@{my-selector}`使用,需要加上大括号，

输出结果如下：

```css
.banner{
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}

div{
  background-color: darken(green, 10%);
}
```


## 扩展

less支持使用Extend语法将一个选择器的所有属性应用到当前选择器中, 类似于继承；
语法：:extend()，冒号+extend+括号，

```less
/* extend基本用法 */
// 将.b的规则扩展到.a中去
.a:extend(.b){
  // ...
}

// 将所有.b匹配的规则都用到.a上
.a:extend(.b all){
  // ...
}

```

当然也可以扩展多个,用逗号隔开：

```javascript
// 将.b .c 的规则扩展到.a中去
.a:extend(.b, .c){
  // ...
}
```

括号里的扩展源也可以用变量代替。基本上所有的选择器规则都可以使用；

## mixin 混入

和extend的意思差不多，和js中的mixin概念几乎一样了。

先看例子：

```less
.a, #b{
  color: red;
}

.mixin-class{  
  .a();
}
.mixin-id{  
  #b();
}
```

输出：

```css
.a, #b{
  color: red;
}

.mixin-class{
  color: red;
}
.mixin-id{
  color: red;
}
```

.a();和#b(); 就是mixin的语法，这个括号可以不加，建议还是最好加上，增加可读性。

语法是不是很简单？

需要注意的地方，这种带括号的混入定义，不会输出到最终的css文件中,使用和上面的完全一致，可以作为减少css文件大小的优化方法：

```less
.my-other-mixin(){
  background: white;
}
```

## mixin传参

定义：

```less
.border-radius(@radius){
  -webkit-border-radius:@radius;
     -moz-border-radius:@radius;
          border-radius:@radius;
}
```
使用：

```css
#header{  
  .border-radius(4px);
}
.button{  
  .border-radius(6px);
}
```

参数甚至可以传递一个规则集，或者一个mixin

可以像函数一样使用mixin

```less
.average(@x,@y){
  @average:((@x + @y) / 2);
}
div{  
  .average(16px, 50px); // 调用 mixin  
  padding:@average;    // 使用返回值
}
```

## & 替代父名

less结构可以描述父子关系和节点的层次关系
`&` 在less中代表父选择器的代替符号，

请看下面的例子：

```less
.grand{
  .parent{
    & > &{
      color: red;
    }
    & &{
      color: green;
    }
    &&{
      color: blue;
    }
    &, &ish{
      color: cyan;
    }
  }
}
```

输出：

```less
.grand .parent > .grand .parent {
  color: red;
}
.grand .parent .grand .parent {
  color: green;
}
.grand .parent.grand .parent {
  color: blue;
}
.grand .parent,
.grand .parentish {
  color: cyan;
}
```

## 函数

仅仅举个例子，需要什么函数，可以自己查询less的文档。

`length()` 用于计算传入变量代表的值的长度

```less
@list: "banana", "tomato", "potato", "peach";

n: length(@list);
```

## @import

例子

```less
@import "foo";      // foo.less 被引入
@import "foo.less"; // foo.less 被引入
@import "foo.php";  // foo.php 被当做less文件引入，开发者可以利用此特性改后缀名
@import "foo.css";  // 可以引入普通的css
```
 

@import可以加选项

语法: `@import (keyword) "filename";`

keyword:
1. reference: 只引用了使用，不输出，比如引用基础less文件
2. inline: 引用，输出，不处理
3. less: 不管什么后缀名，都认为是less文件的方式引入。
4. css: 不管什么后缀，都认为是css文件
5. once: 只引用一次，默认的引入行为
6. multiple: 可以引用多次
7. optional: 找不到引用文件，不会报错，继续编译。

## 参考

1. [less官网-语言特性](http://lesscss.cn/features/#features-overview-feature)
