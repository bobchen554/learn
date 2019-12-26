# 宏任务
> script setTimeout setImnmediate

# 微任务
> promise proccess.nextTick

浏览器每执行一个宏任务后，后面都会跟着一个微任务，宏任务收集到微任务里后执行微任务

```
    # 第一个宏任务
    setTimeout(() => {
        console.log("下一个宏任务执行")
    }, 0)
    new Promise((reslove) => reslove()).then(() => console.log("第一个宏任务后到微服务"))


    # 解释了为什么promise优先于settimeout执行
```
