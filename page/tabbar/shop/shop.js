//index.js
//获取应用实例
const app = getApp()
var util=require('../../../utils/util.js');
wx.cloud.init()
const db=wx.cloud.database()
const courses=db.collection('Courses')

Page({
  
  data: {
    teacher_openids:app.globalData.teacher_openids,
    buttonText1: '发布互助',
    buttonText2: '获取互助',
    motto: '欢迎回来！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    preMargin:45,
    nextMargin:0,
    openid:'',
    dataReady: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  getOpenid() {
    let that = this;
    return app.getUserOpenIdViaCloud()
      .then(res => {
        this.setData({
          openid: res,
          loading: false
        })
        console.log(res)
      //  console.log(that.data.openid)
        return res
      })
      .catch(err => {
        console.error(err)
      })
  },
  onLoad: function (options) {
    let that = this;
    app.globalData.course_name = decodeURIComponent(options.course_name)
    this.getOpenid()
      .then(res => {
        app.globalData.openid = res
        that.setData({dataReady : true})
      })

  },
  onShareAppMessage(){
    return {
      title :'教学支撑平台',
      path :'pages/index/index'
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  clear_cache: function () { //删除教师所授课程的签到信息。
    console.log('remall', app.globalData.course_name)
    db.collection('Cache').where({
      course: app.globalData.course_name
    }).get({
        success(res) {
          var length = res.data.length
          for(var i = 0; i < length; i++){
            db.collection('Cache').doc(res.data[i]._id).remove({
              success: function(res) {
                console.log(res.data)
              },
              fail(res){
                console.log("delete fail!")
              }
            })
          }
        }
      })
  },
  release:function(options){
    wx.navigateTo({
      url: '../../register/release/release',
    })
  },
  request:function(options){
    wx.navigateTo({
      url: '../../register/request/request',
    })
  },
  register:function(options){
    var that = this
    var date = new Date()
    if(this.data.openid in this.data.teacher_openids){
      courses.where({
        _openid: that.data.openid,
        course: app.globalData.course_name
      }).get({
        success(res){
          if(date - res.data[0].start_date > 10 * 60 * 1000){
            courses.doc(res.data[0]._id).update({
              data:{start_date : date}
            })
            that.clear_cache()
          }
        }
      })
      wx.navigateTo({
        url: '../../register/list/list',
      })
    }
    else{
      wx.navigateTo({
        url: '../../register/form/form',
      })
    }
  },

})
