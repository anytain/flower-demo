// pages/post-detail/post-detail.js
import { postList } from '../../data/data.js'
const app = getApp()
console.log(app)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData:{},
    collected:false,
    _pid:null,
    _postsCollected:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      const postData = postList[options.pid];
      this.data._pid =options.pid
      const postsCollected = wx.getStorageSync('posts_collected');
      this.data._postsCollected = postsCollected;
      let collected = postsCollected[this.data._pid]
      if(collected===undefined){
        collected = false
      }
      this.setData({
        postData,
        collected
      })
  },
onCollect(event){
  const postsCollected = this.data._postsCollected;
  wx.getStorageSync('posts_collected');
  postsCollected[this.data._pid]=!this.data.collected
  let collectedNew = !this.data.collected;
  this.setData({
    collected:!this.data.collected
  })
  wx.setStorageSync('posts_collected', postsCollected)
  wx.showToast({
    title: collectedNew?'收藏成功':'取消收藏',
    duration:3000
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