## 初级了解
对比react-redux，我发现他们好像差不多
1. connect
   
```javascript
// connect的，dva的括号1只接收一个参数（即mapStateToProps），括号2仍然是要连接的组件
/* 可以这么写 */
function mapStateToProps(state) {
  console.log(state);
  // 打印的state
  // {
  //   routing: {},
  //   @@dva: 0,
  //   products: [{ ...}, { ...}] ,
  //   todos: [{ ...}, { ...}],
  // };
  return {
    todos: state.todos
  };
}
export default connect(mapStateToProps)(TodoList);

/* 也可以这么写 */
export default connect(({ todos }) => ({ todos }))(TodoList);

```

2. models 写法

```javascript
export default {
  // 全局state上的key
  namespace: "todos",
  // state是初始值，在这里是空数组
  state: [],
  // reducers：等同于redux 中的reducers，接受action, 同步更新state
  reducers: {
    delete(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    }
  }
};
```

3. /src/index.js

```javascript

import dva from "dva";
import "./index.css";
import "antd/dist/antd.css";

// 1. Initialize
// const app = dva();
+  const app = dva({
+    initialState: {
+      // 这里的 `products` 是key,就是 `/src/models/products.js` 中的 `namespace` 的值，一定要对应，不然connect之后也找不到这个model
+      products: [
+        { name: "dva", id: 1 },
+        { name: "antd", id: 2 }
+      ],
+      todos: [
+        { text: "你好，我是初始化的todo", checked: false, id: 1 },
+        { text: "哈喽哈喽", checked: true, id: 2 }
+      ]
+    }
+  });

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
+ app.model(require("./models/products").default);
+ app.model(require("./models/todos").default);

// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");

```
