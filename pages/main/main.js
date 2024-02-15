// pages/main/main.js
import cet4 from "../../data/cet4"
import gre from "../../data/gre"
import hbs from "../../data/hbs"
import ielts from "../../data/ielts"
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordIndex : 0,
    wordListLength : 0,
    getWordfunc : cet4.cet4word,
    curWord : cet4.cet4word(0),
    wordHidden : false,
    input : {
      hidden : true, // mode : true when memoring, false when reciting
      answer : null
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  preWord : function(){
    if(this.data.wordIndex > 0 ){
      var nextWord = this.data.getWordfunc(this.data.wordIndex - 1) 
      this.setData({
        wordIndex : this.data.wordIndex - 1,
        curWord : nextWord,
        wordHidden : !this.data.input.hidden
      })
    }
  },
  nextWord : function(){
    if(this.data.wordIndex < this.data.wordListLength - 1){
      var nextWord = this.data.getWordfunc(this.data.wordIndex + 1) 
      console.log(nextWord)
      var wordIndex = this.data.wordIndex
      this.setData({
        wordIndex : wordIndex + 1,
        curWord : nextWord,
        wordHidden : !this.data.input.hidden
      })
      wx.setStorage({
        "key" : app.globalData.curWordList + "_index",
        "data" : wordIndex + 1,
        success(){
        }
      })
    }
  },
  toSetting : function(){
    wx.navigateTo({
      url: '../setting/setting',
    })
  },
  setWordList : function(wordListName){
    switch(wordListName){
      case "cet4" :
       this.setData({
        "wordListLength" : cet4.cet4length(),
        "getWordfunc" : cet4.cet4word
      })
      break
      case "gre" :
       this.setData({
        "wordListLength" : gre.grelength(),
        "getWordfunc" : gre.greword
      })
      break
      case "hbs" :
       this.setData({
        "wordListLength" : hbs.hbslength(),
        "getWordfunc" : hbs.hbsword
      })
      break
      case "ielts" :
       this.setData({
        "wordListLength" : ielts.ieltslength(),
        "getWordfunc" : ielts.ieltsword
      })
      break
      default :
      this.setData({
        "wordListLength" : cet4.cet4length(),
        "getWordfunc" : cet4.cet4word
      })
      break
    }
  },
  updateAnswer(res){
    this.setData({
      input : {
        hidden : this.data.input.hidden,
        answer : res.detail.value
      }
    })
  },
  onLoad(options) {
    const that = this
    var hidden = !(app.globalData.mode == 'M')
    this.setData({
      wordHidden : hidden,
      input : {
        hidden : !hidden,
        answer : this.data.input.answer
      }
    })
    
    wx.getStorage({
      "key" : "curwordList",
      success(res){
        that.setWordList(res.data)   
        app.globalData.curWordList = res.data
      },
      fail(){
        wx.setStorage({
          "key" : "curwordList",
          "data" : "cet4",
          success(res){
            app.globalData.curWordList = "cet4"
          }
        })
        
      }
    })
    wx.getStorage({
      "key" : app.globalData.curWordList + "_index",
      success(res){
        console.log(res.data)
        that.setData({
          wordIndex : res.data,
          curWord : that.data.getWordfunc(res.data)
        })
      },
      fail(){
        wx.setStorage({
          "key" : app.globalData.curWordList + "_index",
          "data" : 0,
          success(res){
          }
        })
      }
    })
    
  },
  showAnswer : function(){
    this.setData({
      wordHidden : false
    })
  },
  checkAnswer : function(){
    if(this.data.input.answer == this.data.curWord.word){
      this.setData({
        wordHidden : false
      })
    }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})