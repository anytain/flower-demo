// components/post/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // text:{
    //   type:String,
    //   value:'123' 
    // }
    res:Object
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
    onGoToDeatil(event){
      const pid = event.currentTarget.dataset.id;
      console.log(pid);
      wx.navigateTo({
        url: '/pages/post-detail/post-detail?pid=' + pid,
      })
  },
  }
})
