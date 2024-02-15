// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    mode : "M",
    modeRangeIndex: 0 ,
    curWordList : "cet4",
    curIndex : 0,
    curWordListRangeIndex : 0
  }
})
