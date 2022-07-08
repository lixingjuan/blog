- [代码测试地址](https://codesandbox.io/s/dazzling-chaplygin-ofgfer?file=/src/ProfilePageClass.js:72-160)

class组件this是可变的，所以，访问 `this.prop.xxx`, 可以拿到最新的props, 如下代码代码中，当`showMessage`被调用的时候，此时去访问的this, 已经不是该宏任务被加入宏任务队列的时候那个this了。


```jsx
function ProfilePage(props) {
  const showMessage = () => {
    alert('Followed ' + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return (
    <button onClick={handleClick}>Follow</button>
  );
}
```

```jsx
class ProfilePage extends React.Component {
  showMessage = () => {
    alert('Followed ' + this.props.user);
  };

  handleClick = () => {
    setTimeout(this.showMessage, 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
```


`handleClick` 改为下面的写法, 当该定时任务（宏任务）被从任务队列拿出来执行的时候，使用的参数为基本数据类型，即被加入宏任务队列的时候的数值

```jsx
  handleClick = () => {
    setTimeout(alert, 3000, "Followed " + this.props.user);
  };
```





## 参考

1. [函数式组件与类组件有何不同？](https://overreacted.io/zh-hans/how-are-function-components-different-from-classes/)