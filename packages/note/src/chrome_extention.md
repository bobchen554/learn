# 主要讨论插件迭代部署方案，以及开发规范
背景：由于功能的不断增加，用户在更新插件上面临从装插件的问题。
安装方式：
1.在chrome扩展商店中安装
2.以crx文件安装
3.加载已解压的扩展程序  -->  目前存在问题：新增功能时需要用户从新安装插件

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
  ```
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


## 根据需求 业务线的不同，拆分为多个插件
