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
    wordfavor : 0,
    wordfavorlist : null,
    input : {
      hidden : true, // mode : true when memoring, false when reciting
      answer : null
    },
    inputvalue : '',
    isCorrect : false,
    submitted : false
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
        wordHidden : !this.data.input.hidden,
        submitted : false,
        isCorrect : false,
        input : {
          answer : '',
          hidden : this.data.input.hidden
        }
      })
      var curpage = this;
      wx.getStorage({
        "key" : "favorlist",
        success(res) {
          if(res.data != null) {
            curpage.setData({
              wordfavorlist : res.data,
              wordfavor : res.data[curpage.data.wordIndex]
            })
            console.log("current word", curpage.data.wordfavor)
          }
        }

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
        wordHidden : !this.data.input.hidden,
        inputvalue : '',
        submitted : false,
        isCorrect : false,
        input : {
          answer : '',
          hidden : this.data.input.hidden
        }
      })
      var curpage = this;
      wx.getStorage({
        "key" : "favorlist",
        success(res) {
          if(res.data != null) {
            curpage.setData({
              wordfavorlist : res.data,
              wordfavor : res.data[wordIndex + 1]
            })
            console.log("current word", curpage.data.wordfavor)
          }
        }
        // complete(res) {
        //   curpage.setData({
        //     wordfavor : curpage.data.wordfavorlist[wordIndex + 1]
        //   })
        // }
      })
      // this.setData({
      //   wordfavor : curpage.data.wordfavorlist[wordIndex + 1]
      // })
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
  toFavorite : function(){
    var idx = this.data.wordIndex;
    var curpage = this;
    wx.getStorage({
      key : "favorlist",
      success(res) {
        if(res.data == null) {
          var favorlist = new Array(4447).fill(0);
          if (favorlist[idx] == 0) {
            favorlist[idx] = 1
          } else {
            favorlist[idx] = 0
          }
          curpage.setData({
            wordfavorlist: favorlist
          })
        } else {
          var favorlist = res.data;
          if (favorlist[idx] == 0) {
            favorlist[idx] = 1
          } else {
            favorlist[idx] = 0
          }
          curpage.setData({
            wordfavorlist: favorlist
          })
        }
        wx.setStorage({
          "key" : "favorlist",
          "data" : curpage.data.wordfavorlist
        })
        console.log("change", curpage.data.wordIndex)
      },
      fail (res) {
        var favorlist = new Array(4447).fill(0);
        console.log(idx);
        if (favorlist[idx] == 0) {
          favorlist[idx] = 1
        } else {
          favorlist[idx] = 0
        }
        curpage.setData({
          wordfavorlist: favorlist
        })
        wx.setStorage({
          "key" : "favorlist",
          "data" : curpage.data.wordfavorlist
        })
        console.log("Fail")
      },
      complete(res) {
        curpage.setData({
          wordfavor: curpage.data.wordfavorlist[idx]

        })
        console.log(curpage.data.wordfavor)
        console.log("complete")
      }
    })
    var favored = [];
    wx.getStorage({
      "key" : "favored",
      success(res) {
        if(res.data != null) {
          favored = res.data;
          if(curpage.data.wordfavor == 0) {
            favored = favored.filter(function(item) {
              return item.word != curpage.data.curWord.word
            })
          } else{
            favored.push(curpage.data.curWord)
          }
        }
      },
      fail(res) {
        var favorlist = curpage.data.wordfavorlist;
        favored = [];
        for (var i = 0; i < favorlist.length; i++) {
          if (favorlist[i] == 1) {
            // favored.push(i);
          }
        }
      },
      complete(res) {
        console.log("favored: ", favored);
        wx.setStorage({
          "key" : "favored",
          "data" : favored
        })
      }
    })
    // if(this.data.wordfavor == 0) {
    //   this.setData({
    //     wordfavor : 1
    //   })
    // } else if(this.data.wordfavor == 1) {
    //   this.setData({
    //     wordfavor : 0
    //   })
    // }
    // this.setData({
    //   wordfavor: curpage.data.wordfavorlist[idx]
    // })
    // console.log(this.data.wordfavor)
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
  updateAnswer : function(res){
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
      wordIndex : 0,
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
    this.setData({
      submitted : true
    })
    if(this.data.input.answer == this.data.curWord.word){
      this.setData({
        wordHidden : false,
        isCorrect : true
      })
    }
    else{
      this.setData({
        wordHidden : true,
        isCorrect : false
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