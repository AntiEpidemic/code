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
    buttonText1: '课程签到',
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
        if(res in that.data.teacher_openids)
        {
          that.setData({buttonText1:'开始签到'})
          db.collection('Courses').where({
            _openid: res,
            course: app.globalData.course_name
          }).get({
            success(data_res){
              wx.showModal({
                title: app.globalData.course_name,
                content: data_res.data[0].teacher + '老师欢迎您!',
                showCancel: false,
              })
            }
          })
        }
        else{
          db.collection('Students').where({
            _openid: res,
          }).get({
            success(data_res){
              wx.showModal({
                title: app.globalData.course_name,
                content: data_res.data[0].name + '同学欢迎您!',
                showCancel: false,
              })
            }
          })
        }
        that.setData({dataReady : true})
      })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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
