// components/bookCard/bookCard.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    wordList : {
      type : Object,
      value : {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    numberFormat : function(x){
      return x.toFixed(2)
    }
  }
})