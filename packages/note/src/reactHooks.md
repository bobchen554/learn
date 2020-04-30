# hooks
## 为什么会出现hooks







## 之前class写法有什么问题
1. super(this)
2. this.clickEvent = this.clickEvent.bind(this)
 









## 优点
1. 简洁
2. 复用(复用业务逻辑)








### 闭包
1. 闭包
2. 我如果说闭包在我们的实践中几乎无处不在，你认同这样的说法吗？
3. 模块化你应该知道吧，你认为模块和闭包有没有可能存在什么联

```js

// state.js
let state = null;

export const useState = (value: number) => {
  // 第一次调用时没有初始值，因此使用传入的初始值赋值
  state = state || value;

  function dispatch(newValue) {
    state = newValue;
    // 假设此方法能触发页面渲染
    render();
  }

  return [state, dispatch];
}



const [counter, setCounter] = useState(0);
```
### 函数式组件
```js

import React, { useState } from 'react';

export default function Counter() {
  const [counter, setCounter] = useState(0);

  return [
    <div key="a">{counter}</div>,
    <button key="b" onClick={() => setCounter(counter + 1)}>
      点击+1
    </button>
  ]
}
```

### useState

```js

export default function AsyncDemo() {
  const [param] = useState<Param>({});
  const [listData, setListData] = useState<ListItem[]>([]);

  function fetchListData() {
    // @ts-ignore
    listApi(param).then(res => {
      setListData(res.data);
    })
  }

  function searchByName(name: string) {
    param.name = name;
    fetchListData();
  }

  return [
    <div>data list</div>,
    <button onClick={() => searchByName('Jone')}>search by name</button>
  ]
}
```


```js
componentDidMount () {
    this.updateRepos(this.props.id)
 }
componentDidUpdate (prevProps) {
  if (prevProps.id !== this.props.id) {
    this.updateRepos(this.props.id)
  }
}
updateRepos = (id) => {
  this.setState({ loading: true })
  fetchRepos(id)
    .then((repos) => this.setState({
      repos,
      loading: false
  }))
}
```




```js
useEffect(() => {
  setState({
    ...state,
    loading: true
  })
  fetchRepos(id)
    .then((repos) => setState({
      ...state,
      repos,
    })))
}, [props.id])
```




### useEffect

在function组件中，每当DOM完成一次渲染，都会有对应的副作用执行，useEffect用于提供自定义的执行内容，它的第一个参数（作为函数传入）就是自定义的执行内容。为了避免反复执行，传入第二个参数（由监听值组成的数组）作为比较(浅比较)变化的依赖，比较之后值都保持不变时，副作用逻辑就不再执行。

```js
  useEffect(() => {
    // todo

  }, [xxx, xxx]);
```


```jsx

import React, { useState, useEffect } from 'react';
import './style.scss';

export default function TestDemo() {
  const [counter, setCounter] = useState(0);

  // DOM渲染完成之后副作用执行
  useEffect(() => {
    setTimeout(() => {
      setCounter(counter + 1);
    }, 1000);
  });

  return (
    <div className="container">
      <div>{counter}</div>
    </div>
  )
}
```






```js
  useEffect(() => {
    setTimeout(() => {
      setCounter(counter + 1);
    }, 1000);
  }, []);
```





```jsx

import React, { useState, useEffect } from 'react';
import './style.scss';

export default function TestDemo1(props) {
  const [counter, setCounter] = useState(0);

  // DOM渲染完成之后副作用执行
  useEffect(() => {
    props.changeId(++id)
  }, [props.id]);

  return (
    <div className="container">
      <div>{counter}</div>
    </div>
  )
}
```








### 清除副作用
```js
 useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.id, handleStatusChange);
    };
  });
```




•每次副作用执行，都会返回一个新的clear函数
•clear函数会在下一次副作用逻辑之前执行（DOM渲染完成之后）
•组件销毁也会执行一次










### 自定义hooks

#### 外面的世界很精彩，可精彩是属于真正厉害的人

### 解决了什么问题？

逻辑片段复用

```js

import { useState, useEffect } from 'react';

export default function useInitial<T, P>(
  api: (params: P) => Promise<T>,
  params: P,
  defaultData: T
) {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(defaultData);
  const [errMsg, setErrmsg] = useState('');

  useEffect(() => {
    if (!loading) { return };
    getData();
  }, [loading]);

  function getData() {
    api(params).then(res => {
      setResponse(res);
    }).catch(e => {
      setErrmsg(errMsg);
    }).finally(() => {
      setLoading(false);
    })
  }

  return {
    loading,
    setLoading,
    response,
    errMsg
  }
}

const {loading, setLoading, response, errMsg} = useInitial(api, {id: 10}, {});
```