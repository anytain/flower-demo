const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:[],
    comingSoon:[],
    top250:[],
    searchResult:false,
    searchData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      wx.request({
        url: app.gBaseUrl+'in_theaters',
        data:{
          start:0,
          count:3
        },
        success:(res)=>{
            this.setData({
              inTheaters : res.data.subjects
            })
        }
      })
      wx.request({
        url: app.gBaseUrl+'coming_soon',
        data:{
          start:0,
          count:3
        },
        success:(res)=>{
            this.setData({
              comingSoon : res.data.subjects
            })
        }
      })
      wx.request({
        url: app.gBaseUrl+'top250',
        data:{
          start:0,
          count:3
        },
        success:(res)=>{
            this.setData({
              top250 : res.data.subjects
            })
        }
      })
      //API地址
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
onGoToMore(event){
  const type = event.currentTarget.dataset.type;
  console.log(type)
    wx.navigateTo({
      url: '/pages/more-movie/more-movie?type='+type,
    })
},
onSearchCancel(event){
  this.setData({
    searchResult:false
  })
},
onConfirm(event){
  this.setData({
    searchResult:true
  })
  const key = event.detail.value;
  wx.request({
    url:app.gBaseUrl+'search',
    data:{
      q:key
    },
    success:(res)=>{
      this.setData({
        searchData:res.data.subjects
      })
    }
  })
},

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