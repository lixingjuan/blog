# code-review

> 软件开发的基本思想: 高内聚，低耦合

> 请听题: code-review你通常关注那些点？



1. 代码性能，是否重复渲染
2. 组件维度的可维护性;
   1. 组件是否逻辑耦合，
   2. 组件是否过于庞大，
   3. 是否拆分纯组件，
   4. 是否清晰划分组件和容器？
      1. 组件，就仅仅接受数据渲染，状态改变回调即可，不关心谁使用如何使用，不负责网络请求，可以拆分出项目，
      2. 容器，负责: 请求数据, 组件的组织，排列等
3. 变量命名是否可维护
   1. eg. 以下代码，条件判断之间没有相互关系，后面维护的人根本不懂开发者的意图是为了屏蔽什么元素， 我认为好的处理两种做法 1. 将条件赋值给有意义的变量名 2. 添加注释
   ```js
   const demo = ()=>{
      if(item.hasMenus > -1 && it.children) {
        // ...do something
      }
      if(item.pictureUrl){
        // ...do something
      }
   }
   ```
4. 一些明显的常量，是否在最高公共组件处维护了常量?
   1. 比如，url的base, 数量判断的常量
5. js层的可维护性
   1. if-else 的嵌套 1. 层级不要太深, 2. 尽量扁平 3. 提前退出
   ```js
    // eg. 改造前
     const handleSelect = (record: SearchIndicItem, selected: boolean) => {
       if (selected) {
         if (record.hasPrivilege) {
           if (selectedKeys.length >= maxSelected) {
             message.warn(t('INDICATOR_LIBRARY.SEARCH.SELECT_WARN_TEXT'));
           } else {
             setSelectedRowKeys([...selectedKeys, record.searchId]);
           }
         } else {
           handleOpenModal(record.isVip, record.indicId, record.displayNameCn);
         }
       } else {
         setSelectedRowKeys((preRowKeys) => preRowKeys.filter((item) => item !== record.searchId));
       }
     };

    // 改造后
  const handleSelect = (record: SearchIndicItem, selected: boolean) => {
    if (!selected) {
      setSelectedRowKeys((preRowKeys) => preRowKeys.filter((item) => item !== record.searchId));
      return;
    }

    if (!record.hasPrivilege) {
      handleOpenModal(record.isVip, record.indicId, record.displayNameCn);
    }

    if (selectedKeys.length >= maxSelected) {
      message.warn(t('INDICATOR_LIBRARY.SEARCH.SELECT_WARN_TEXT'));
    } else {
      setSelectedRowKeys([...selectedKeys, record.searchId]);
    }
  };
   ```
   2. 逻辑判断职责要单一，常见场景，
      1. 多选/部分选的条件判断中，
      2. useEffect 根据数据的变化设置不同的值，不要让一个useEffecct 依赖太多变量，导致代码难以拆分