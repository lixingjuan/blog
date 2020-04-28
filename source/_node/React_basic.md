# 初识React
## 将组件渲染进指定元素
```javascript
ReactDOM.render(<h1>李幸娟</h1>，document.getElememtById('app'));
```

## 转换过程
```javascript
JSX————————————>javascript对象结构——————————————>DOM元素    =>插入页面
    Bebel转义                     ReactDOM.render   
    React.js构造 
```
           
## React将虚拟DOM转换为真实DOM的原理
```javascript
function renderM(eleObj, container) {
    let { type, props } = eleObj;
    let ele = document.createElement(type);
    for (let attr in props) {
        if (attr === 'children') {
            props[attr].forEach(function (item) {
                if (typeof item === 'string') {
                    let textNode = document.createTextNode(item)
                    ele.appendChild(textNode)
                } else {
                    renderM(item, ele)
                }

            })
        } else if (attr === 'className') {
            ele.setAttribute('class', props[attr])
        } else {
            ele.setAttribute(attr, props[attr])
        }
    }
    container.appendChild(ele)
}
renderM(eleObj, window.yl)
```

## React是由 React元素和React组件组成
### React元素 
- 首字母要小写：凡是首字母小写的都会被认为是React元素
- React 元素是通过js对象描述DOM结构的一种数据结构
## React组件

1. 组件的首字母大写
2. 组件定义完之后可以像React元素一样使用
3. 组件的渲染过程
     - 将对象的属性封装为props
     - 调用组件，得到返回的React元素
     - ReactDOM把React 元素转为真是的DOM元素并且插入目标容器内部
## React组件两种定义方式
- ### 方式一：函数，参数是属性对象
```javascript
let Message = ({msg,id})=>{
    return <h1>{msg}</h1>;
}
// 使用方法
render(<Message msg="hello 自定义组件方法1：函数组件" id="5"/>,window.rootContainer)
```

- ### 方式二：类，继承自component
```javascript
// 方法二：用类的方式(需要将Component从React中解构出来,类继承自Component)
class Clock2 extends Component {
    // render方法指的是该组件如何渲染，一定要返回一个React元素，而且只能返回一个React元素
    constructor() {
        super();
        // 自定义组件状态对象
        // 状态可以用来存放组件内部一些变化的值。状态只能由内部初始化，外部拿不到
        this.state = { time: new Date.toLocaleString() };   
    }
    // 生命周期函数 组件挂载完成
    componentDinMount() {
        // 每隔一秒钟会重新修改状态，当调用setState之后,状态会更新，还会调用render方法进行重新渲染
        // setState两个功能 切换到新状态和定时调用render方法重新渲染
        window.setInterval(() => {
            this.setState({
                time: new Date().toLocaleString()
            })
        }, 1000)
    }
    render(){
        return <h1><span>定时器2</span><span>{this.state.time}</span></h1>
    }
}
// 自定义组件方法二的使用
render(<Clock2 />, window.clock2)
```

## 组件属性
- 可以给组件加默认属性
```javascript
// 组件属性
class Person extends Component{
    render(){
        return (
            <div>
                <p>姓名：{this.props.name}</p>
                <button>改变</button>
            </div>
        )
    }
}
render(<Person name="组件属性：李幸娟"/>,window.componentAttr)
```
## 受控组件
### 什么是是受控组件？
### 

## 非受控组件
###
