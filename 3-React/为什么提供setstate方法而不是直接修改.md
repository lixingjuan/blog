## Why can't modify state directly?



1. react会存储一份state, 用来和新的state进行对比从而判断是否更新；如果直接修改，React无法监听值的改变，判断是否要更新dom