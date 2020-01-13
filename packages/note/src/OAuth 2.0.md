# OAuth 2.0
问题缘由：第三方服务需要向供应商获取数据，但是需要用户的密码
>> 不能直接给密码，容易密码泄漏 提供一个可控（时间，权限等）的令牌（授权层）
# 授权方式
1. 授权码
   第三方发起供应商的一个链接https://b.com/oauth/authorize?response_type=code&client_id=CLIENT_ID&
  redirect_uri=https://a.com/callback?&scope=read
  code 返回授权码格式  client_id 第三方   redirect_uri 跳转的链接  scope授权范围
2. 供应商返回https://a.com/callback?code=AUTHORIZATION_CODE
3. 第三方通过code向供应商拿到令牌 