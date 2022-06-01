| 自变量     | 标志变量 | 因变量      |
|------------|----------|-------------|
| useState   |          | useEffect   |
| useReducer | useRef   | useCallback |
| useContext |          | useMemo     |

useReducer, 进阶版的useState, 使用redux的理解，将多个state 合并为一个

useMemo和useCallback定义无副作用的因变量
useEffect定义有副作用的因变量

> 纯函数：一定的输入一定会有一定的输出
> 副作用：一定的输入不一定会有一定的输出


一个组件的自变量和因变量又能作为另一个组件的自变量，当组件层层嵌套，我们想从顶层组件，讲一个变量传到第四层组件的时候，当组件的层级变多时，自变量的传递变得繁琐，此时，我们可以使用 createContext 在父级定义context, 在任意层级 可以使用 useContext 消费context, 通过这种方式使得跨层级的自变量传递变得简单。


useRef, 帮助我们更加灵活的操作组件