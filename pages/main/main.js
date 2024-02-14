// pages/main/main.js
import cet4 from "../../data/cet4"
import gre from "../../data/gre"
import hbs from "../../data/hbs"
import ielts from "../../data/ielts"

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
  getWord : function(index){
    console.log(cet4.cet4word(index))
    return cet4.cet4word(index)
  },
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
      this.setData({
        wordIndex : this.data.wordIndex + 1,
        curWord : nextWord,
        wordHidden : !this.data.input.hidden
      })
    }
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
    wx.getStorage({
      "key" : "curwordList",
      success(res){
        that.setWordList(res.data)   
      },
      fail(){
        wx.setStorage({
          "key" : "curwordList",
          "data" : "cet4",
          success(res){
          }
        })
      }
    })
    wx.getStorage({
      "key" : "wordListIndex",
      success(res){
        that.setData({
          wordIndex : res.data
        })
      },
      fail(){
        wx.setStorage({
          "key" : "wordListIndex",
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
  changeMode : function(e){
    this.setData({
      wordHidden : e.detail.value,
      input : {
        hidden : !e.detail.value,
        answer : this.data.input.answer
      }
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