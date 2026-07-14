# Worktree vs 分支
分支 (branch)	Worktree
本质	一个指针，指向某个提交	一个目录，检出了某个分支
切换方式	git checkout 切换当前目录	不需要切换，多个目录同时存在
适合场景	顺序工作	需要同时在多个分支工作
简单说：分支是概念，worktree 是分支的物理实例化。

基本用法
创建 worktree（基于已有分支）：


git worktree add ../my-feature feature-branch
创建 worktree（同时新建分支）：


git worktree add -b new-feature ../my-feature main
查看所有 worktree：


git worktree list
删除 worktree：


git worktree remove ../my-feature
典型使用场景
场景：你在 feature 分支开发到一半，突然需要修一个紧急 bug

用分支：要么 stash，要么 commit 半成品，切到 main，修完再切回来
用 worktree：直接新开一个目录检出 main，两边互不干扰，同时开着

# 当前在 feature 分支开发中...
git worktree add ../hotfix main   # 新开一个目录
cd ../hotfix                      # 去修 bug
# 修完后
git worktree remove ../hotfix     # 清理
对你的实际意义
你项目里的 .claude/worktrees/ 目录就是 Claude Code 在执行某些任务时自动创建的 worktree —— 它在隔离环境里操作代码，不影响你当前的工作目录。任务完成后理论上会自动清理，但有时会残留，用 git worktree prune 清理即可。