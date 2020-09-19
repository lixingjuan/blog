## 文件和目录操作常用通配符

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




# 拷贝指定文件
```bash
pbcopy < ~/.ssh/id_rsa_oschina.pub
```