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

|                                                                |                      |
|----------------------------------------------------------------|----------------------|
| 光标左移                                                       | h                    |
| 光标右移                                                       | l（小写L）           |
| 光标上移                                                       | k                    |
| 光标下移                                                       | j                    |
| 光标移动到下一个单词                                           | w                    |
| 光标移动到上一个单词                                           | b                    |
| 移动游标到第n行                                                | nG                   |
| 移动游标到第一行                                               | gg                   |
| 移动游标到最后一行                                             | G                    |
| 快速回到上一次光标所在位置                                     | Ctrl+o               |
| 删除当前字符                                                   | x                    |
| 删除前一个字符                                                 | X                    |
| 删除整行                                                       | dd                   |
| 删除一个单词                                                   | dw或daw              |
| 删除至行尾                                                     | d$或D                |
| 删除至行首                                                     | d^                   |
| 删除到文档末尾                                                 | dG                   |
| 删除至文档首部                                                 | d1G                  |
| 删除n行                                                        | ndd                  |
| 删除n个连续字符                                                | nx                   |
| 将光标所在位置字母变成大写或小写                               | ~                    |
| 复制游标所在的整行                                             | yy（3yy表示复制3行） |
| 粘贴至光标后（下）                                             | p                    |
| 粘贴至光标前（上）                                             | P                    |
| 剪切                                                           | dd                   |
| 交换上下行                                                     | ddp                  |
| 替换整行，即删除游标所在行并进入插入模式                       | cc                   |
| 撤销一次或n次操作                                              | u{n}                 |
| 撤销当前行的所有修改                                           | U                    |
| 恢复撤销操作                                                   | Ctrl+r               |
| 整行将向右缩进                                                 | >>                   |
| 整行将向左退回                                                 | <<                   |
| 若档案没有更动，则不储存离开，若档案已经被更动过，则储存后离开 | ZZ                   |


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




# 系统相关指令

```bash
# 查看本机IP地址
ifconfig en0 |awk '/inet/{print $2}'
结果：
fe80::806:c00e:76aa:3066%en0
10.20.251.245

# 查看本机磁盘容量
df -h

# 查看本机剩余磁盘容量

```