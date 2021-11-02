# git常用操作 🎀

## 其他

向指定分支推送代码

```js
git push --set-upstream origin dev-home
```


## hexo d失败

```js
// 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## 基本知识

```bash
remote：远程主仓库
repository：本地仓库
index：Git追踪库，暂存区
workspace：本地工作区，
```

## 清空本地保存的用户名和密码
```bash
git config --system --unset credential.helper
```


## git revert

git reset 是 操作记录向后回退一个，
git revert 是使用一个新的revert, 抵消掉上一次的 记录
导致再次执行merge 的时候，这部分代码会丢失

解决方法： revert 掉 此次 revert

```bash
git revert --no-commit commit号
git commit -a -m '此处填写正常的commit信息'
git push
```
## 查看git信息

```bash
# 查看用户名
git config --global user.name

# 查看邮箱
git config --global user.email

# 修改全局用户名
git config --global user.name '李幸娟'

# 修改当前项目用户名
git config user.name '李幸娟'

# 删除本地仓库的远程关联
git remote rm origin

# 为本地仓库添加远程仓库
git remote add origin https://xxx.git

```

## 修改git配置

解决gitlab忽略大小写的问题

```bash
# 使git检测大小写
git config core.ignorecase false
```



## 提交类操作

```bash
# 暂存指定文件
git add <文件名>

# 暂存所有文件
git add .

# commit时漏提交
git add missed-file // missed-file 为遗漏提交文件
git commit --amend --no-edit


```


## 分支类操作

创建分支

```bash
# 创建本地分支dev
git branch dev

```

查看分支

```bash
# 查看本地分支
git branch

# 查看所有远程分支
git branch -r

# 查看所有本地分支
git branch -a

# 查看当前分支状态
git status

# 当前分支与远程某分支关联
git push --set-upstream origin feature-finance-apply
```



修改分支

```bash
# 本地分支重命名dev->uat
git branch -m dev uat
```

切换分支

```bash
# 切换分支到dev
git checkout dev

# 创建并切换到dev分支
git checkout -b dev
```

<!-- 切换分支2 -->
<!--  -->
<!-- ```bash -->
<!-- # 创建并切换到新的dev分支 -->
<!-- git switch -c dev -->
<!-- ``` -->


删除分支

```bash
# 删除远程dev分支
git push origin -d dev

# 删除本地dev分支
git branch -d dev

# 强行删除本地某分支
git branch -D feat-finance-apply
```

推动分支代码

```bash
# 推送当前代码到远程指定分支
git push origin 25037

```

合并分支

```bash
# 合并dev到当前分支（当前在master分支的话）
git merge dev

# 将本地仓库 指定分支代码 推送到 远程指定分支
git push origin <本地分支>：<远程分支>

# 将本地分支与远程同名分支相关联
git push --set-upstream origin <本地分支名>

# 将【远程指定分支】拉取到【本地指定分支】上：
git pull origin <远程分支名>:<本地分支名>

# 报错：fatal: refusing to merge unrelated histories（两个分支是两个不同的版本，具有不同的提交历史）
git pull origin master --allow-unrelated-histories


```

## 查看历史commit记录

```bash
# 查看历史记录
git reflog

# 查看本地所有已经commit但未push的内容
git cherry -v
```

## 回退版本

```bash
# 撤销一次commit到暂存区域
git reset --soft HEAD^

# 撤销二次commit到暂存区域
git reset --soft HEAD～2

# 回退到某次提交，并将commit的内容撤回到暂存区，撤销commit, 不撤销add
git reset --soft e79fcfb

# 回退到某次提交 => 删除工作空间改动代码,撤销commit,撤销add
git reset --hard 9dac256

# 回退到某次提交 => 不删除工作空间改动代码,撤销commit,撤销add
git reset --mixed 9dac256

```




## 文件暂存

```bash
# 储藏当前暂存的文件，[并提交储藏信息] >> 切换分支可能会提醒
git stash [save "msg"]

# 查看储藏列表
git stash list

# 应用某次储藏(不会删除那一次)
git stash apply stash@{0}

# 应用并弹出栈顶的储藏
git stash pop
```


## 更新submodules

```bash
# 递归更新
git submodule update --init --recursive

# 自动化此过程，配置如下命令，之后git都会在拉取后执行git submodule update
：git pull --recurse-submodules

```

## 查看git 状态

```bash
git status
# 有改动了之后.未add查看
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   git-test.md

no changes added to commit (use "git add" and/or "git commit -a")

# 有改动了之后,git add . 后查看状态

PS D:\gitLab\git_test> git status
On branch master
Your branch is up to date with 'origin/master'.

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   README.md
        new file:   git-test.md

# 刚提交完查看
PS D:\gitLab\git_test> git status
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean

```




## 拉取远程分支代码

```bash
# 拉取远程分支代码，不自动合并
# 用户在检查了以后决定是否合并到工作本机分支中
git fetch

# 拉取最新代码，自动合并
git pull

```



## 查看两个分支的代码差异

```bash
# 显示出查看dev和uat所有有差异的文件列表
Git diff dev uat --stat

# 显示出所有有差异的文件的详细差异
Git diff dev uat

# 显示dev和master分支 src/index.js 的详细差异
Git diff branch1 branch2 src/index.js
```



## 查看git 仓库的位置

```bash

# 指令看
git remote -v

# 手动看
.git>config>
url = https://rdc.hand-china.com/gitlab/25037/todoList-dva-react.git

# 删除远程仓库
git remote rm origin

# git修改远程仓库地址
git remote set-url origin 仓库的url

```

## 删除本地缓存

```bash
git rm -r --cached .
```

## 相关文章：
- 最常见的 Git 问题和操作清单汇总： https://juejin.im/post/5d5d61e96fb9a06ace5254bd
- [git merge和git rebase的区别](https://www.jianshu.com/p/6960811ac89c)


## git 设置代码 & 移除
https://blog.csdn.net/mnbvcxz111123/article/details/53894242







# 代码提交规范

## 安装git commit步骤

1. 安装套件@commitlint/config-angular @commitlint/cli、husky

```
npm install -g @commitlint/cli @commitlint/config-conventional
```

2. 安装套件husky

```
npm install --save-dev husky
```

3. 在package.json里面加husky hook

```
"husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
}
```
4. 在项目根目录创建配置文件commitlint.config.js

```
echo "module.exports = {extends: ['@commitlint/config-angular']};" > commitlint.config.js
```

5. .gitignore

```
## commitlint
node_modules/
package-lock.json
```
