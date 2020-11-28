var app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    num: '',
    name: '',
    coursname:''

  },
  seecourse: function () {
    var that = this;
    console.log(that.data.name)
    console.log(that.data.num)
    db.collection('Students').where({
      name: that.data.name,
      num: that.data.num
    })
      .get({
        success(res) {
          res.data.splice(0, 1)
          console.log(res.data)
          that.setData({
            list: res.data
          })
        }
      })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
 console.log(options.course)
    var link = decodeURIComponent(options.course);
    const db = wx.cloud.database({
      env: 'test-c67296'
    })
    db.collection('Students').where({
      course: link
    })
      .get({
        success(res) {
          console.log('res2:', res.data)
          that.setData({
            list: res.data,
          })
        },
      })


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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  },
  inputchange1: function (e) {
    this.setData({
      num: e.detail.value
    })
  },
  inputchange2: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
})