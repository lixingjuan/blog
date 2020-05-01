const hooks = ["create", "activate", "update", "remove", "destory"];

export function createPathFunction(backend) {
  let i, j;
  const cbs = {};

  const { modules, nodeOps } = backend
  
  for ( i = 0; i < hooks.length; ++i) {
    if (j = 0; j < modules.length; ++j) { 
      if (isDef(modules[j][hooks[i]])) { 
        cbs[hooks[i]].push(modules[j][hooks[i]])
      }
    }
  }

  // ..............

  return function patch(oldVnode, vnode, hydrating, removeOnly) { 
    if (isUndef(vnode)) { 
      if (ifDef(oldVnode)) { 
        invokeDestoryHook(oldVnode) // 调用销毁钩子
        return 
      }
    }
  }
}
