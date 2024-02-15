// pages/plan/plan.js
import cet4 from "../../data/cet4"
import gre from "../../data/gre"
import hbs from "../../data/hbs"
import ielts from "../../data/ielts"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordLists : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {  
    var titles = ['cet4', 'gre', 'ielts', 'hbs']  
    var wordListLengthFunc = {
      'cet4' : cet4.cet4length,
      'gre' : gre.grelength,
      'hbs' : hbs.hbslength,
      'ielts' : ielts.ieltslength
    }
    var promises = titles.map((title) => {  
      return new Promise((resolve, reject) => {  
        wx.getStorage({  
          key: title + "_index",  
          success(res) {  
            var wordListLength = (wordListLengthFunc[title])()
            resolve({ title: title, index: res.data ,wordListLength : wordListLength})  
          },  
          fail() {  
            wx.setStorage({  
              key: title + '_index',  
              data: 0,  
              success(res) {  
                resolve({ title: title, index: 0 })  
              }  
            })  
          }  
        })  
      })  
    })  
    
    Promise.all(promises).then((wordLists_) => {  
      console.log(wordLists_)
      this.setData({  
        wordLists: wordLists_  
      })  
    })  
  },
  refresh : function(){
    this.onLoad()
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
    this.onLoad()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})