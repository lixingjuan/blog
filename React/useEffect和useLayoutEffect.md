## useEffect和useLayoutEffectde的区别

1. useEffect, brower repaint, 之后执行;
2. useLayoutEffectde, dom mutated 之后, brower repaint, 之后执行;


![执行时机对比图](https://pbs.twimg.com/media/FQfQwHXakAISgnr?format=jpg&name=large)

## when to use?

1. useLayoutEffect, 想要在brower repaint之前对Dom做一些操作，eg. 修改Dom、测量Dom尺寸等;
2. useEffect, 大多数情况下都应该使用这个，不应该阻塞浏览器的渲染


## code

```jsx
import React, { useContext, useEffect } from "react";

export default function App() {
  const ref = React.useRef("");

  React.useEffect(() => {
    ref.current = "some value";
  });

  // then, later in another hook or something
  React.useLayoutEffect(() => {
    console.log("ref.current", ref.current); // <-- this logs an old value because this runs first!
    // 会打印两次，第一次："", 第二次："some value"
  });

  return (
    <div>
      <div>{ref.current}</div>
    </div>
  );
}

```

## 参考

1. [useEffect vs useLayoutEffect](https://kentcdodds.com/blog/useeffect-vs-uselayouteffect)
1. [twitter](https://twitter.com/D555Sai/status/1515409331428429824)