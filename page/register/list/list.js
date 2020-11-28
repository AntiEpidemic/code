const app = getApp()
const db = wx.cloud.database({
  env: 'test-c67296'
})

function flushPage(that){
  console.log('flush page!')
  db.collection('Cache').where({
    course:app.globalData.course_name
 })
   .get({
     success(res) {
       console.log('res:',res.data)
       that.setData({
         list:res.data,
       })
     },
     fail: console.error
   })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    uhide: 0,
    intervalID: 0,
  },
  toggleBtn: function (event) {
    var that = this;
    var toggleBtnVal = that.data.uhide;
    if (toggleBtnVal == 1) {
      that.setData({
        uhide: 0
      })
    } else {
      that.setData({
        uhide: 1
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.name)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.data.intervalID = setInterval(flushPage, 1000, that) 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log(this.data.intervalID)
    clearInterval(this.data.intervalID)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log(this.data.intervalID)
    clearInterval(this.data.intervalID)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})