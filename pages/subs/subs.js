// pages/subs/subs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    favored : null,
    hidden : false

  },

  updateMode : function() {
    if(this.data.hidden == false) {
      this.setData({
        hidden : true
      })
    } else {
      this.setData({
        hidden : false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var curpage = this;
    wx.getStorage({
      "key" : "favored",
      success(res) {
        if(res.data != null) {
          curpage.setData({
            favored: res.data
          })
        }
        // console.log("SUCCESS!", curpage.data.favored)
      },
      complete(res) {
        console.log("get favored:", curpage.data.favored)

      }
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
    var curpage = this;
    wx.getStorage({
      "key" : "favored",
      success(res) {
        if(res.data != null) {
          curpage.setData({
            favored: res.data
          })
        }
        // console.log("SUCCESS!", curpage.data.favored)
      },
      complete(res) {
        console.log("get favored:", curpage.data.favored)

      }
    })

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