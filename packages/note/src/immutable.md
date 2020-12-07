# immutable
1. 原理
将对象按字母分成一个树状结构
每次修改树状结构的分支，其他的复用
返回新的数据

主要用于react中shouldComponentUpdate

源文件过大: 源码总共有5k多行，压缩后有16kb
类型转换: 如果需要频繁地与服务器交互，那么Immutable对象就需要不断地与原生js进行转换，操作起来显得很繁琐
侵入性: 例如引用第三方组件的时候，就不得不进行类型转换；在使用react-redux时，connect的shouldComponentUpdate已经实现，此处无法发挥作用。
