# 强缓存
    head：
> Cache-control:no-cache（协商缓存）、no-store（禁止缓存）(优先级高)
> expires: 绝对时间的GMT格式的时间字符串，没超时有效

# 协商缓存

Last-Modified（responeHead）/If-Modified-Since(requestHead) 表示最后修改事件
> 检查颗粒度为秒、文件修改但内容没变则不需求从新get
Etag（responeHead）/If-None-Match(requestHead) 文件修改的hash 值
