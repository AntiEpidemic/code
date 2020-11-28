// pages/plan/plan.js
var util=require('../../../utils/util.js');
var check
var res_check
var  app = getApp()
wx.cloud.init()
const db=wx.cloud.database()
const lat = 32.111650 //教室
const lng = 118.959435
//const lat = 32.110960//系楼//32.09636
//const lng = 118.962868//118.90907
const max_interval = 5 * 60 * 1000 //签到最大间隔时间

Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher_openids:app.globalData.teacher_openids,
    result:'',
    res_text:'',
    formid:'',
    access_token:'',
    username:'',
    usernum:'',
    course_name:'',
    start_date:'',
    register_date:'',
    openid:'',
    loading: false,
    start: true
  },
  getOpenid() {
    let that = this;
    return app.getUserOpenIdViaCloud()
      .then(openid => {
        this.setData({
          openid,
        })
      })
      .catch(err => {
        console.error(err)
      })
  },
 
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  inputchange1:function(e){
    this.setData({
      usernum: e.detail.value
    })  
  },  
  inputchange2:function(e){
      this.setData({
        username: e.detail.value
      })  
  }, 
  getDistance: function (lat1, lng1, lat2, lng2) {
    lat1 = lat1 || 0;
    lng1 = lng1 || 0;
    lat2 = lat2 || 0;
    lng2 = lng2 || 0;

    var rad1 = lat1 * Math.PI / 180.0;
    var rad2 = lat2 * Math.PI / 180.0;
    var a = rad1 - rad2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var r = 6378137;
    var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)));

    return distance;
  },

  update_checkin(){
    var that = this
    console.log("用户名：" + this.data.username + "学号：" + this.data.usernum)
    db.collection('Students').where({//查看学生名单，根据情况更新总签到次数。
      _openid: that.data.openid,//找到对应课程下该学生信息
      course:that.data.course_name
    })
      .get({
        success(res) {
          // res.data 是包含以上定义的两条记录的数组
          if (res.data.length == 0)//将该学生信息加入学生表中
          {
            db.collection('Students').add({
              data: {
               num: that.data.usernum,
               name: that.data.username,
               course: that.data.course_name,
               checkin: check? 1 : 0,
               //openid: that.data.openid
              },
              success: function (res) {
                console.log('res', res)
              }
            })
            .then((res) => {
              that.data.start = true
            })
          }
          else//该学生信息已在学生表中，更新学生签到次数
          {
            if (check == true) {//该学生签到成功的话
              console.log('---------------------------', res.data)
              var doc = res.data[0]._id
              var n = res.data[0].checkin + 1
              console.log('签到次数：', n)
              db.collection('Students').doc(doc).update({
                data: {
                  // 表示将 done 字段置为 true
                  checkin: n
                },
                success(res) {
                  console.log('更新签到次数', res.data)
                }
              })
              .then((res) => {
                that.data.start = true
              })
            }
          }
        }
      })
  },
 
  add_data (){
    var that=this
    var date = new Date()
    var time = util.formatTime(date)
    var diff = date - that.data.start_date
    console.log('Difference', diff)
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res.latitude,res.longitude)
        var res2 = that.getDistance(res.latitude, res.longitude, lat, lng)
        if (res2 > 200 || diff > max_interval) {//距离超出或者时间超出
          res_check = '签到失败!'
          check = false
          that.setData({
            date: date,
            //result: res2,
            res_text: '你不在教学范围内或已超出签到时间，签到失败。如有疑问请联系老师。' + time,
            result: res_check
          })
        }
        else {
          res_check = '签到成功！'
          check = true
          that.setData({
            date: date,
            res_text: '在教学范围内，签到成功！你的签到时间为：' + time,
            result: res_check
          })
        }
        that.update_checkin()
        db.collection('Cache').add({
          data: {
            success: check,
            date: date,
            latitude: res.latitude,
            longitude: res.longitude,
            num: that.data.usernum,
            name: that.data.username,
            course: that.data.course_name,
            //openid: that.data.openid,
          },
          success: function (res) {
            console.log('res', res)
          },
          fail: function(res){
            console.log(res)
          }
        })
        wx.showToast({
          title: res_check,
          duration: 2000
        })
      }
    })
  },

  register_in: function (e) {
    var that = this

    console.log(that.data.course_name)
    console.log(Object.keys(that.data.teacher_openids)[0])
    console.log(this.data.username)
    db.collection('Courses').where({//通过教师微信号和课程名确定签到开始时间
      _openid: Object.keys(that.data.teacher_openids)[0],  // 此处填入授课教师微信号！！！！！！！！！！！！
      course:that.data.course_name
    })
      .get({
        success(res) {
          that.data.start_date = res.data[0].start_date
          console.log('----------------')
          console.log(that.data.start_date)
          db.collection('Cache').where({
            _openid: that.data.openid,//本人微信号
            course: that.data.course_name,//该课程签到信息
            success: true
            }).get({
              success(res) {
                if(res.data.length==0){
                  console.log('签到信息插入！')
                  that.add_data()
                  }
                else{
                  wx.showToast({
                    title: '无需再次签到！',
                    duration: 2000,
                  })
                  that.data.start = true
                }
              }
            })
        },
        fail(res){
          console.log('fail')
        }
      })
  },

  register: function(e){
    console.log(this.data.start)
    if(this.data.start){
      this.data.start = false
      this.register_in()
    }
  },

  openLocation: function (e) {
    console.log(e)
    wx.openLocation({
      longitude: Number(value.longitude),
      latitude: Number(value.latitude)
    })
    
  },
  get_start_time: function (e) {
   // console.log('load s-time')
    var that=this
    db.collection('Courses').where({//通过教师微信号和课程名确定签到开始时间
      _openid: Object.keys(that.data.teacher_openids)[0],  // 此处填入授课教师微信号！！！！！！！！！！！！
      course:that.data.course_name
    })
      .get({
        success(res) {
          console.log('timeeeeeee',res.data)
          that.setData({
            register_date: util.formatTime(res.data[0].start_date)
          })
          console.log(that.data.register_date)
        }
      })
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.course_name)
    this.setData({
      course_name: app.globalData.course_name
    })
    console.log(this.data.course_name)
    var that = this
    this.getOpenid().then(res => {
      db.collection('Students').where({
        _openid: that.data.openid,//本人微信号
        course: that.data.course_name,//该课程签到信息
        })
        .get({
          success(res) {
            if(res.data.length > 0)
            {
              that.setData({
                username : res.data[0].name,
                usernum : res.data[0].num
              })
            }
          }
        })
    })
    this.get_start_time()
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
      this.get_start_time()
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