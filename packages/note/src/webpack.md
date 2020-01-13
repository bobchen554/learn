# webpack 的 Hooks
Webpack 的 Compiler 对象主要有以下 Hooks：

# entryOption
webpack 处理完 entry 配置项后触发，这是一个同步串行的 SyncBailHook 钩子，只要监听函数有一个函数的返回值不为undefined，则直接跳过剩下逻辑

无参数

# afterPlugins
处理完初始化插件后触发，这是一个同步的 SyncHook 钩子，不关心返回值

参数是 compiler 对象

# afterResolvers
Resolve 安装完成后触发，这是一个同步的 SyncHook 钩子

参数是 compiler 对象

# environment
environment 准备好后触发，这是一个 SyncHook 钩子

无参数

# afterEnvironment
environment 安装完成后触发，这是一个 SyncHook 钩子

# beforeRun
compiler.run 函数之前触发，这是一个异步串行 AsyncSeriesHook 钩子

参数是 compiler

# run
开始读取 records 之前触发，这是一个异步串行 AsyncSeriesHook 钩子

参数是 compiler

# watchRun
监听模式下，一个新的编译开始之前触发，这是一个异步串行的 AsyncSeriesHook 钩子

参数是 compiler

# normalModuleFactory
normalModuleFactory 创建之后触发，这是一个同步 SyncHook 钩子

参数是 normalModuleFactory

# contextModuleFactory
contextModuleFactory 创建之后触发，

参数是 contextModuleFactory

# beforeCompile
编译参数创建之后触发，这是一个异步串行 AsyncSeriesHook 钩子

参数是 compilationParams

# compile
一个新的编译创建之后触发，这是一个同步 SyncHook 钩子

参数是 compilationParams

# thisCompilation
触发 compilation 之前触发，这个是一个同步 SyncHook 钩子

参数是 compilation

# compilation
编译创建之后执行，这是一个同步 SyncHook 钩子

参数是 compilation

# make
这是一个异步并发 AsyncParallelBailHook 钩子

参数是 compilation

# afterCompile
这是一个异步串行 �AsyncSeriesHook 钩子

参数是 compilation

# shouldEmit
这是一个 SyncBailHook 钩子

参数是 compilation

# emit
�生成资源到 output 目录之前�触发，这是一个异步串行 AsyncSeriesHook 钩子

参数是 compilation

# afterEmit
生成资源到 output �目录之后，这是一个异步串行 AsyncSeriesHook 钩子

参数是 compilation

# done
编译完成后触发，这是一个异步串行 AsyncSeriesHook 钩子

参数是 stats

# failed
编译失败触发，这是一个同步 SyncHook 钩子

参数是 error

# invalid
监听模式下，编译无效时触发，这是一个同步 SyncHook 钩子

参数是 fileName，changeTime

# �+ watchClose

监听模式停止，一个同步 SyncHook 钩子
# Compilation
Compilation暴露了与模块和依赖有关的粒度更小的事件钩子，官方文档中的说法是模块会经历加载(loaded),封存(sealed),优化(optimized),分块(chunked),哈希(hashed)和重新创建(restored)这几个典型步骤

## buildModule
在模块构建开始之前触发

## rebuildModule
在重新构建一个模块之前触发

## failedModule
模块构建失败时执行。参数：module error

## succeedModule
模块构建成功时执行。 参数 module

## finishModules
所有模块都完成构建。modules

## rebuildModule
在重新构建一个模块之前触发

## rebuildModule
在重新构建一个模块之前触发

## rebuildModule
在重新构建一个模块之前触发

## rebuildModule
在重新构建一个模块之前触发
