// pages/setting/setting.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode : "M"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  updateMode : function(e){
    this.setData({
      mode : e.detail.value ? "M" : "R"
    })
    app.globalData.mode = e.detail.value ? "M" : "R"
  },
  onLoad(options) {
    this.setData({
      mode : app.globalData.mode 
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