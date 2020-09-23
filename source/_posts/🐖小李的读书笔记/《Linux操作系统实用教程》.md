# 文件和目录

## 操作常用通配符

| 通配符 | 说明                         |
|--------|------------------------------|
| *      | 代表文件中任意长度的任意字符 |
| ？     | 代表文件中任意一个字符       |
| [...]  | 匹配任意一个在中括号中的字符 |

```bash
# 列出所有以字母 c 开头的文件
ls c*

# 列出所有以字母 c 开头, 字母 g 结尾 的文件（包含扩展名）
ls c*s

# 列出包含 f 的文件
ls *f*

# 不知道开头结尾中间是 onfig.j 的文件
ls ?onfig.j?    => config.js

# 列出所有 p,y开头的文件
ls [p,y]*       => package-lock.json       package.json            yarn.lock

# 以长格式列出 config.js 和.eslintrc.js 文件的详细信息
ls -l {config,.eslintrc}.js

=>  -rwxr-xr-x@ 1 xingjuan.li  DATAYES\Domain Users  457  7 28 09:46 .eslintrc.js
    -rwxr-xr-x@ 1 xingjuan.li  DATAYES\Domain Users  237  7 28 09:46 config.js
```



## 显示文件内容

1. cat

cat [选项] [文件]

```bash

# 普通的列出文件内容
cat config.js
或（ls的通配符也可以使用）
cat *onfig.js

# 也可以同时输出多个文件内容
cat config.js .eslintrc.js

# 将config.js 的内容输出到 fakeconfig.js
cat config.js > fakeconfig.js

# 将 config.js和.eslintrc.js 的内容输出到 fakeconfig.js
cat config.js .eslintrc.js > fakeconfig.js

# 👍🏻 配合重定向符 > 将键盘输入内容输出到新建文件， ctrl+d 退出
cat > example.js

#
```

2. more
3. less
4. head
5. tail


# Vim

## Vim的工作模式

1. 普通模式
2. 插入模式：《= 普通模式按 i
3. 可视模式：《= 普通模式按 v

插入模式，保存文件

```bash
:w /Users/xingjuan.li/Documents/git-code/Blog/source/_posts/🐖小李的读书笔记/test.md

:q 退出

:q! 不保存退出
```

## 进入编辑模式

```bash
# 普通模式
i: 在光标前插入
I: 在当前行首插入
a: 在当前光标后插入
A: 在当前行尾插入
o: 在当前行之下新开一行
O: 在当前行之上新开一行
```


## 移动光标

1. 字符移动（小写）

```bash
左、下、 上、 右 移动一个字符
h,  j,  k,  l
```

2. 单词移动

```bash
# 普通模式下

w命令：向后移动一个单词（前面加数字表示移动几个单词）
b命令：向前移动一个单词（前面加数字表示移动几个单词）
e: 下一个单词的最后一个字符
```

3. 行移动

```bash
# 普通模式下

$: 移动到当前行尾，可以接受数字前缀，表示向后移动几行

```



## 删除

```bash
# 普通模式
do: 删除当前行光标之前所有字符
dd: 删除光标所在行
```


## 取消
```bash
.: 重复上一次修改
u: 取消上一次的修改
U: 将当前行恢复到修改前状态
```



# 拷贝指定文件
```bash
pbcopy < ~/.ssh/id_rsa_oschina.pub
```


