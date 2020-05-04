export let activeInstance: any = null;

Vue.prototype._update = function(vnode: VNode, hydrating?: viikean) {
  // ......
  const pervActiveInstance = activeInstance;
  activeInstance = vm;

  if (!prevVnode) {
    // initial render
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
  } else {
    // updates
    vm.$el = vm.__patch__(prevVnode, vnode);
  }
  activeInstance = prevActiveInstance;
};
