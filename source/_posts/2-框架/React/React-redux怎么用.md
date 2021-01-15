# Redux到底是什么？
## 工作流程

- 首先，用户发出Action

`store.dispatch(action)`

- 然后，Store自动调用Reducer,并且传入两个参数，当前store和收到的Action, Reducer会返回新的 State

`let nextState = todoApp(perviousState, action)`

- State 一旦有变化，Store就会调用监听函数。

`store.subscribe(listener)`

- listener可以通过 `store.getState()`得到当前状态。如果使用的是React, 这时可以出发重新渲染 View

```javascript
function listerner(){
  let newState = store.getState();
  component.setState(newState)
}
```



## 我知道redux能干啥了
使用了connect连接UI和容器之后，使得store里面的数据，可以出现在react组件的props

- 连接之前的 this

<img src='/Blog/images/connect之前的this.png'>

- 连接之后的 this
  
<img src='/Blog/images/connect之后的this.png'>

- 然后我们就可以通过 `this.props` 去访问redux的state啦！





## 在create-react-app中的使用流程

1. 在App.js中 
  
- store就是保存数据的地方，可以给他堪称一个容器，整个应用只能有一个store
- 函数`createStore`用来生成store
  
```javascript
// 引入createStore 和reducer函数 , 并且创建创建store
import { createStore } from "redux";  // 接受一个函数作为参数
import todosReducer from "./reducers/todoReducer";  // reducer函数

const store = createStore(todosReducer)
```

- 引入Provider, 并且使用它包裹根组件, 使得该应用所有页面均可访问store
```javascript
import { Provider } from "react-redux";

// 使用 `<Provider>` 包裹根组件
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            {/* <Route path="/" exact render={() => <Redirect to="/TodoList" />} /> */}
            <Route path="/" exact component={index} />
            <Route path="/TodoList" component={TodoList} />
            <Route path="/TodoListRedux" component={TodoListRedux} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

```

1. 我们需要一个文件，分别定义我们的 action变量、reducer函数、action creators

```javascript
// action types
// 其实就是一堆常量，表示不同的action的类型
const ADD_TODO = "ADD_TODO";
const INIT_TODO = "INIT_TODO";

// action creators
// TODO: 没感觉 这个action creators有节省多少代码啊？反而还多了
// 作用就是用户发起了 `dispatch` 看 触发哪个 action creators， 然后就返回一个对象，表示此次 `dispath` 的类型
export const addTodo = todo => {
  return { type: "ADD_TODO", todo };
};

export const initTodos = todos => {
  return { type: "INIT_TODOS", todos };
};

// reducer函数，用来处理页面 `dispatch` 触发的action creators，然后 reducer函数根据 action creators return出来的 `type` 类型去处理 `state`
export default function(state, action) {
  if (!state) {
    state = {
      comments: [],
      todos: []
    };
  }
  console.log("action", action);
  switch (action.type) {
    case INIT_COMMENTS:
      // 初始化评论
      return { comments: action.comments };
    case ADD_COMMENT:
      // 新增评论
      return {
        comments: [...state.comments, action.comment]
      };
    default:
      return state;
  }
}

```

3. 在要使用的页面要做的事情

```javascript
import { connect } from 'redux'
// 把要用到的 action generator 函数引进来，下面 `mapDispatchToProps` 里面要用
import { addTodo, initTodos } from "../../reducers/todoReducer";

class 组件名字 extends Component {
  ......

  componentDidMount() {
    // 这里调用的名字是你命的名字 `toInitTodos`
    this.props.toInitTodos([
      {
        text: "你好，我是初始化的第一项todo",
        uuid: uuid(),
        checked: false
      }
    ]);
  }

  render()
}

const mapStateToProps = state => {
  return {
    // 这里return出来谁，谁才会出现在 `this.props`
    comments: state.comments,
    demo:state.demo
  };
};
//
const mapDispatchToProps = dispatch => {
  return {
    // UI组件就可以通过this.props.onSubmit() 向redux 中的reducer 发起dispatch触发reducer函数
    toInitTodos: todos => {
      dispatch(initTodos(todos));
    },
    toAddTodo: todo => {
      dispatch(addTodo(todo));
    }
  };
};

// 用来给 当前UI组件 和 数据容器 连接起来，这样 redux 的东西就会出现在 this.props 里面
export default connect(mapStateToProps, mapDispatchToProps)(组件名字);


```


- 没了，就简单的以上三处的处理就可以完美的使用redux了，哎，真是奇怪，这么简单的东西之前怎么搞不明白呢？？？？
- 其实就是就是把state放在一个大家都能访问和修改的文件里面嘛，但是又怕大家都改搞混了，所以搞个dispatch规范下修改state行为, 也便于寻找是哪里改的