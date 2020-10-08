# scss速成

scss是sass的升级版，sass依赖于缩进表示嵌套关系，scss使用大括号

scss语法总览

1. 变量
2. 计算
3. 继承 
4. 嵌套
5. 引用父选择器
6. 循环
8. import 引入其他scss文件
10. extend继承
11. mixin
12. 注释
13. 自定义函数





## 嵌套规则

SASS允许使用变量，所有变量以$开头。

```scss
$blue : #1875e7;　

div {
　color : $blue;
}
```

如果变量需要镶嵌在字符串之中，就必须需要写在#{}之中。

```scss
$side:left;

.rounded {
　　border-#{$side}-radius: 5px;
}
```

## 计算

```scss
$var:20px;

body {
  margin: (14px/2);
  top: 50px + 100px;
  right: $var * 10%;
}
```

## 嵌套

```scss
div h1 {
  color : red;
}
```
可以写成

```scss
div {
  h1{
    color:red;
  }
}
```

属性也可以嵌套

```scss
p{
  border:{    // 注意 border后面加上分号
    color:red
  }
}
```

## &引用父元素

比如，a:hover 可以写成

```scss
a{
  &:hover{
    color:#ffb3ff;
  }
}
```

## 注释

SASS共有两种注释风格。

标准的CSS注释 /* comment */ ，会保留到编译后的文件。

单行注释 // comment，只保留在SASS源文件中，编译后被省略。

在/*后面加一个感叹号，表示这是"重要注释"。即使是压缩模式编译，也会保留这行注释，通常可以用于声明版权信息。

```scss
/*!
  重要注释！
*/
```

## 继承

SASS允许一个选择器，继承另一个选择器。比如，现有class1：

```scss
.class1 {
  border: 1px solid #ddd;
}
```

class2要继承class1，就要使用@extend命令：

```scss
.class2 {
+ @extend .class1;
  font-size:120%;
}
```




## mixin

使用@mixin命令，定义一个代码块。

```scss
@mixin left {
  float:left;
  margin-left:10px;
}
```

使用`@include`命令，调用这个mixin

```scss
div {
  @include left;
}
```

mixin的强大之处，在于可以指定参数和缺省值:

```scss
@mixin left($value: 10px){
  float:left;
  margin-right:$value;
}
```

使用的时候根据需要加入参数

```scss
div {
  @include left(20px);
}
```

mixin使用举例：

使用`mixin`语法生辰浏览器前缀

```scss
@mixin rounded($vert, $horz, $radius:10px){
  border-#{$vert}-#{$horz}-radius: $radius;
  -moz-border-radius-#{$vert}#{$horz}: $radius;
  -webkit-border-#{$vert}-#{$horz}-radius: $radius;
}
```

使用时，如下调用即可：

```scss
#navboar li { 
  @include rounded(top,left );
}
#footer{ 
  @include rounded(top, left, 5px)
}
```




## 颜色函数

SASS提供了一些内置的颜色函数，以便生成系列颜色：

```scss
lighten(#cc3, 10%) // #d6d65c
darken(#cc3, 10%) // #a3a329
grayscale(#cc3) // #808080
complement(#cc3) // #33c
```




## @import文件

`@import "./filename.scss";`

1. scss 的 @import 不同于 css 的import ,
css的@import 是运行到的时候才回去加载资源；
但是scss的import 规则是生成css文件的时候就把相关文件导入进来；
如果导入的是css 文件，则@import应用的是css的import规则;

2. 若要使被导入的scss文件，不再单独生成css文件，则在命名时前面加上 _ 即可, 引入文件时不用加

```css
// 当前目录下文件名称 _reset.scss
@import './reset'
```



## 循环

### 条件循环
`@if`  

```scss
p {
  @if 1 + 1 == 2 { border: 1px solid; }
  @if 5 < 3 { border: 2px dotted; }
}
```

`@else`

```scss
@if lightness($color) > 30% {
  background-color: #000;
} @else {
  background-color: #fff;
}
```

### 循环语句

for循环 - `@for` 

```scss
@for $i from 1 to 10 {
  .border-#{$i} {
　　　border: #{$i}px solid blue;
  }
}
```

while循环 - `@while`

```scss
$i: 6;

@while $i > 0 {
  .item-#{$i} { 
    width: 2em * $i; 
  }
  $i: $i - 2;
}
```

each命令，作用与for类似：

```scss
@each $member in a, b, c, d {
  .#{$member} {
    background-image: url("/image/#{$member}.jpg");
  }
}
```




## 自定义函数

允许自定义函数

```scss
@function double($n) {
  @return $n * 2;
}

#sidebar {
  width: double(5px);
}
```