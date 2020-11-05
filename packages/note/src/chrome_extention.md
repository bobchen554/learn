# chrome插件是干嘛的

大家怎么理解插件的？

像大家常用的eslint插件、webpack插件
eslint-plugin-react-hooks 规范hooks的写法
html-webpack-plugin 给html插入script标签的

他们都是给eslint、webpack增加功能的

同样chrome插件是给chrome增加用户自定义功能



## 能干啥？
1. 操作浏览器

打开新的页面
- window.open()
假设我们现在开了三个tab页面 依次排列着，我想在第二个页面后面新开一个页面
关闭制定的页面

2. 操作cookie

之前我写过一个项目，这个项目是帮助用户一键登录到ele  美团的后台管理页面
美其名曰 帮助用户快速登陆  然后把cookie传到我们后台来，偷偷的爬人家数据

3. 劫持ajax请求
还有更坏的 我们还可以劫持你浏览器的ajax请求
你发送的什么请求 我都传到后台去

是不是很恐怖 以后插件是不是不敢乱装了



# 由那些构成的
1. manifest.json 清单列表
  它描述里我们这个插件
  ...

  ## manifest_version
  manifest.json 文件的版本
  取值 1-2  chrome18版本后 都用2

  ## name
  ## version

  ## incons
  16 用于扩展程序页面的收藏夹图标
  48 用于扩展程序管理页面
  128 用与安装过程中以及 Chrome 网上应用店


  ## permissions
  提供插件的权限
  cookie tabs...
  同时在安装的时候就能看到这个插件需要那些权限
  安装的时候就要小心


  ## content-scripts
  字段 matches、js、run_at
  向matches的网页插入一段js、css
  ### 特点
  1. 这段js不能访问原来js的所有变量、他的运行环境完全独立
  2. 可以操作dom 但是事件监听是无效的
  3. 只能访问 extension、runtime等部分API





  ## popup
  插件的门户页面，用户可以直观的看到
  ### 特点

  1. 可访问绝大部分API
  2. 独立运行环境
  3. 有个html页面共用户跟插件交互





  ## background
  一个独立环境运行的后台js
  ### 特点

  1. 可访问绝大部分API
  2. 有个html页面但是看不到

  chrome.tabs.executeScript(tab.id, { code })






  ##  injected-script
  和普通JS无任何差别
  	window.postMessage 通信到content-scripts












# 主要讨论插件迭代部署方案
背景：由于功能的不断增加，用户在更新插件上面临从装插件的问题。











安装方式：
1. 在chrome扩展商店中安装
2. 以crx文件安装
3. 加载已解压的扩展程序  -->  目前存在问题：新增功能时需要用户从新安装插件
4. 预安装





... 










## 插件的构成
1. background
2. content_scripts
3. popup.html




## 插件的运行环境
每个独立的页面都是独立的运行环境






# 更新插件

## 上传到chrome扩展商店
更新插件方法：
存在问题：
1.由于国内翻墙限制







## 以crx文件安装
更新插件方法：manifest.json 中 update_url
存在问题：
2014年5月，我们宣布了一项新政策，通过强制将扩展程序托管在Chrome网上应用店中来保护Windows用户。
（可以更新，但是无法使用插件）





## 通过Enterprise策略进行的预安装

存在问题：
仅当用户有权访问公共扩展程序库或保留CRX文件的其他URL时，此方法才有效。如果用户位于限制访问图库的公司防火墙或代理之后，则此方法可能不起作用。
此方法通常仅适用于新安装。使它与现有安装一起使用很麻烦，并且需要大量清理步骤。




## 加载已解压的扩展程序
更新插件方法：代码层面解决
存在问题：
无法更新插件（无法使用update_url）



### 代码层面解决方案
1.对chromeApi进行封装，通过通信的方式，实现在页面层面可以调用chromeApi
  相关实现api
  ```
  1. chrome.runtime.sendMessage
  2. chrome.tabs.sendMessage //可向内容脚本发送（content_script）
  3. chrome.runtime.onMessage.addListener
  ```
2.动态向指定页面插入指定content_script
  相关实现api
  ```
  1. chrome.tabs.executeScript(integer tabId, InjectDetails details, function callback)
  2. chrome.tabs.insertCSS(integer tabId, InjectDetails details, function callback)
  ```
3.content_script插入热更新代码
  ```js
  function injectScript(src) {
    const script = document.createElement('script')
    script.src = `${src}?time=${new Date().getTime()}`
    script.onload = function () {
      script.remove()
    }
    ;(document.head || document.documentElement).prepend(script)
  }
  ```
4.对热更新代码进行迭代

## 动态更新popup.js
动态插入js


问题：
1. 有些逻辑必须执行在页面初始化之前
2. 想调用chrome api怎么办




## 根据需求 业务线的不同，拆分为多个插件





## chrome插件代码混淆
