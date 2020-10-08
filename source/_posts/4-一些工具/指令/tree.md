```bash
# 遍历两层并输出到README.md
tree -L 2 >README.md

# 显示项目的层级，n表示层级数
tree -L n 

# 过滤不想要显示的文件或者文件夹
tree -I “node_modules”
```