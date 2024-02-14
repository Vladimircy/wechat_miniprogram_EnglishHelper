// components/wordCard/wordCard.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    word : {
      type : Object,
      value : {}
    },
    hidden : {
      type : Boolean,
      value : false
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
    Subscribe(){
      console.log("subscribe")
      console.log(this.properties.word)
    }
  }
})