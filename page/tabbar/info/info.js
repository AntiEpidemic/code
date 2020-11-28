// pages/advice/advice.js
var app = getApp()
wx.cloud.init({ traceUser: true })
const db = wx.cloud.database()
var menu_static = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hid : false,
    openid : '',
    menu : ['国内疫情', '国外疫情'],
    menuStatic:menu_static,
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh', new Date())
  },
  stopPullDownRefresh: function () {
    wx.stopPullDownRefresh({
      complete: function (res) {
        console.log(res, new Date())
      }
    })
  },
  onReady:function(){
      var that = this;
      setTimeout(function () {
          that.setData({ hid: true });
      }, 2000);
  },

  onShow:function(){
      var that = this;
      setTimeout(function () {
          that.setData({ dis:"display_none" });
      }, 1500);


  },

  click_menu:function(event){
      this.menu_static = event.currentTarget.id;
      this.setData({
         menuStatic:this.menu_static
      });
  }
  
});
