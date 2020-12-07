# diff
## react diff
> 主要原理  lastindex
> 移动 新节点在旧节点最大中的相对位置 if (index < lastIndex) ==> 需要移动

## vue2.0 diff

> 主要原理 双端比较 
preStart === nextStart
preEnd === nextEnd
preStart === nextEnd
preEnd === nextStart
> 移动  找到对应位置 移动后设置为undefiend

## vue3.0 diff
> 主要原理 先比较首端 在比较尾端
> 中间部分移动 使用lastIndex


