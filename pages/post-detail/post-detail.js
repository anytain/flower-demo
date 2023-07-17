// pages/post-detail/post-detail.js
import { postList } from '../../data/data.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData: {},
    isPlaying:false,
    collected: false,
    _pid: null,
    _postsCollected: {},
    _mgr:null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const postData = postList[options.pid];
    this.data._pid = options.pid;
    let arrayId = options.pid;
    console.log(this.data._pid)
    let postsCollected = wx.getStorageSync('posts_collected');
    if(postsCollected==''){
      console.log("null")
      const postCollectedArr = {};
      postCollectedArr[this.data._pid]=false;
      console.log(postCollectedArr);
      wx.setStorageSync('posts_collected',postCollectedArr);
      postsCollected = wx.getStorageSync('posts_collected');
    }

    console.log(postsCollected)
    this.data._postsCollected = postsCollected;
    let collected = postsCollected[this.data._pid]
    if (collected === undefined) {
      collected = false
    }
    this.setData({
      postData,
      collected,
      isPlaying:this.currentMusicIsPlaying()
    })
    const mgr = wx.getBackgroundAudioManager();
    this.data._mgr = mgr
    mgr.onPlay(this.onMusicStart)
    mgr.onPause(this.onMusicStop)
  },
  onMusicStart(event) {
    const mgr = this.data._mgr
   
    const music = postList[this.data._pid].music
    mgr.src = music.url
    mgr.title = music.title
    mgr.coverImgUrl = music.coverImg
    this.setData({
      isPlaying:true
    })
    app.gIsPlayingMusic = true
    app.gIsPlayingPostId = this.data._pid
  },
  onMusicStop(event) {
    const mgr = this.data._mgr
    mgr.stop()
    this.setData({
      isPlaying:false
    })
    app.gIsPlayingMusic = false
    app.gIsPlayingPostId = this.data._pid

  },
  currentMusicIsPlaying(){
    let playMusic = app.gIsPlayingMusic;
    let playMusicId = app.gIsPlayingPostId;
    if(playMusic&&playMusicId==this.data._pid){
        return true
    }
    return false
  },
  onShare(event) {
    wx.showActionSheet({
      itemList: ['分享到QQ', '分享到微信', '分享到微博'],
    })
  },
  async onCollect(event) {
    console.log(this.data._pid);
    const postsCollected = this.data._postsCollected;
    console.log(postsCollected);
    console.log(!this.data.collected);
    wx.getStorageSync('key')
    postsCollected[this.data._pid] =!this.data.collected;
    this.setData({
      collected: !this.data.collected
    })
    wx.setStorageSync('posts_collected', postsCollected)
    wx.showToast({
      title: this.data.collected ? '收藏成功' : '取消收藏',
      duration: 3000
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