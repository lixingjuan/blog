const obj = {
  name: "hong",
  age: 23
};
console.log(Object.getOwnPropertyDescriptors(obj));
// {
//   name: {
//     value: 'hong',
//     writable: true,
//     enumerable: true,
//     configurable: true
//   },
//   age: {
//     value: 23,
//     writable: true,
//     enumerable: true,
//     configurable: true
//   }
// }

const demo = ({ a }) => ({ a });
console.log(demo({ a: 1, b: 2 })); // { a:1 }

class TodoList extends Component {
  handleAddtodo = (...args) => {
    //触发dispatch,addTodo
    const { dispatch, todos } = this.props;
    console.log(this);

    /* 这里打印this, 是TodoList整个实例 */
    // {
    // isMounted: undefined,
    // replaceState: undefined,
    // props: {
    // match: { },
    // location: { },
    // history: { },
    // staticContext: undefined,
    // todos: [],
    // dispatch: { }
    // },
    // context: { },
    // refs: { },
    // updater: {
    //
    // },
    // state: { },
    // handleAddtodo: f(){ },
    // _reactInternalFiber: { },
    // _reactInternalInstance: { },
    // __proto__:Component
    // }
    console.log(args);

    /* 这里打印的args 是一堆乱七八槽的，应该是Class的各种属性 */
    //     { nativeEvent: (...),
    // type: (...),
    // target: (...),
    // currentTarget: (...),
    // eventPhase: (...),
    // bubbles: (...),
    // cancelable: (...),
    // timeStamp: (...),
    // defaultPrevented: (...),
    // isTrusted: (...),
    // view: (...),
    // detail: (...),
    // screenX: (...),
    // screenY: (...),
    // clientX: (...),
    // clientY: (...),
    // pageX: (...),
    // pageY: (...),
    // ctrlKey: (...),
    // shiftKey: (...),
    // altKey: (...),
    // metaKey: (...),
    // getModifierState: (...),
    // button: (...),
    // buttons: (...),
    // relatedTarget: (...),
    // movementX: (...),
    // movementY: (...),
    // isDefaultPrevented: (...),
    // isPropagationStopped: (...),
    // preventDefault: (...),
    // stopPropagation: (...),
    // dispatchConfig: null,}
  };
}

React.createElement(
  "div",
  {
    id: "test"
  },
  React.createElement("span", null, "demo1"),
  React.createElement("span", null, "demo2")
);
