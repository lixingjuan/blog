# 怎么实现一个 v-model?


(其实听到这个，我的第一反应满脑子都是源码😭)

## 基本思路

其实vue中的v-model 自定义实现，我认为和 react 中开发受控组件有一点像，基本的实现思路都是将该 props 变量及 一个回调函数传递给子组件, props变量表示最新的值，回调函数用来提供给子组件，当数据更新的时候，通知到父组件;
只不过在vue中自定义了选项 model, 允许我们将两个东西合并为一个


## 具体代码实现


### Vue

测试地址: https://codesandbox.io/s/crazy-currying-dz83k?file=/src/App.vue


1. 父组件代码

```vue
<template>
  <div id="app">
    点击这个组件，msg的值会 + 1
    <HelloWorld v-model="msg"></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data() {
    return {
      msg: "Hello Vue in CodeSandbox!",
    };
  },
};
</script>


```


2. 子组件代码

```vue
<template>
  <div class="hello" @click="$emit('click', `${msg + 1}`)">{{ msg }}</div>
</template>

<script>
export default {
  model: {
    prop: "msg",
    event: "click",
  },
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>


```
