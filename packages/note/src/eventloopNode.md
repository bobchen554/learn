# node eventloop

第一个基于事件回调的编译器

1.node启动时，会启动多个线程，如主线程（执行js）、eventloop线程、i/o线程池等
2.node执行主现场代码，收集各类异步i/o操作，交给i/o线程池处理
3.i/o线程处理完后，将结果推送到事件队列
4.eventloop不断监听事件队列，取出事件队列交给主线程处理


## eventloop
```
    # 六个阶段
    timers: 执行setTimeout() 和 setInterval() 预先设定的回调函数。
    I/O callbacks: 大部分执行都是timers 阶段或是setImmediate() 预先设定的并且出现异常的回调函数事件。
    idle, prepare: nodejs 内部函数调用。
    poll: 搜寻I/O事件，nodejs进程在这个阶段会选择在该阶段适当的阻塞一段时间。
    check: setImmediate() 函数会在这个阶段执行。
    close callbacks: 执行一些诸如关闭事件的回调函数，如socket.on('close', ...) 。

```