# vue-router 原理 版本3.0.2

Vue 有个响应式_route属性

## History值
1. 利用HTML5 的history的栈记录
2. 监听 popstate事件

## Hash值
1. 利用HTML5 的history的栈记录
2. 手动更改url的hash
3. supportsPushState 判断 监听popstate和或者hashchange

## AbstractHistory
1. 自己维护一个栈记录
2. 手动切换
3. 没有监听事件


