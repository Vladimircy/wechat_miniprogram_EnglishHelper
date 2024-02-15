// pages/setting/setting.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordListRange : ['cet4', 'gre', 'ielts', 'hbs'],
    wordListIndex : app.globalData.curWordListRangeIndex,
    modeRange : ["记忆","默写"],
    modeIndex : app.globalData.modeRangeIndex,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  updateWordList : function(e){
    this.setData({
      wordListIndex : e.detail.value
    })
    app.globalData.curWordList = this.data.wordListRange[e.detail.value]
    app.globalData.curWordListRangeIndex = e.detail.value
    wx.getStorage({
      'key' : app.globalData.curWordList + "_index",
      success(res){
        app.globalData.curIndex = res.data
      },
      fail(res){
        wx.setStorage({
          'key' : app.globalData.curWordList + "_index",
          success(res){
            app.globalData.curIndex = 0
          }
        })
      }
    })
    wx.setStorage({
      'key' : 'curwordList',
      'data' : app.globalData.curWordList,
      success(res){
      }
    })
  },  
  updateMode : function(e){
    const bmode = ["M","R"]
    this.setData({
      modeIndex : e.detail.value
    })
    app.globalData.mode = bmode[e.detail.value]
    app.globalData.modeRangeIndex = e.detail.value
  },
  onLoad(options) {
    this.setData({
      wordListIndex : app.globalData.curWordListRangeIndex,
      modeIndex : app.globalData.modeRangeIndex
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    console.log(this.data.modeIndex)
    const pages = getCurrentPages()
    const perpage = pages[pages.length - 2]
    perpage.onLoad()  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})