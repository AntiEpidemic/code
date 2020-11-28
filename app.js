App({
  globalData: {
    //hasLogin: false,
    openid: null,
    usrBaseInfo: null,
    usrDesInfo: null,
    teacher_openids:{'oZ_SA4gr3Z0SFtJ3nMLlgmAWwb8A': 1,//申富饶老师
      'oZ_SA4lo9sZyjtFwmnJSxFiBkpfY': 1,//myself
      //'oZ_SA4oxLUulJ0bV2k0xq8thc4bQ': 1, //son
    },
    course_name: ''
  },

  onLaunch: function () {
   // this.globalData.usrBaseInfo = '123'
    wx.cloud.init({
      env: 'test-c67296',
      traceUser: true
    })
  },

  getUserOpenIdViaCloud() {
    return wx.cloud.callFunction({
      name: 'getOpenid',
      data: {}
    }).then(res => {
      this.globalData.openid = res.result.openid
      return res.result.openid
    })
  },
  getUsrInfo: function (cb) {
    var that = this
    if (this.globalData.usrDesInfo) {
      typeof cb == "function" && cb(this.globalData.usrBaseInfo)
    } else {
      /*wx.redirectTo({
        url: '登录页面',
      })*/
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.usrBaseInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.usrBaseInfo)
            }
          })
        }
      })
    }
  },

  getUsrDes: function (cb) {
    var that = this
    if (this.globalData.usrDesInfo) {
      typeof cb == "function" && cb(this.globalData.usrBaseInfo)
    } else {
      wx.redirectTo({
        url: 'String',
      })
    }
  },

})