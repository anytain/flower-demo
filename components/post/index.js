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
    res: Object
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
    onTop(event) {
      const pid = this.properties.res.postId
     this.triggerEvent('posttap',{
       pid
     });
    },
  }
})
