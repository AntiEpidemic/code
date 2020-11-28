// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
//获取用户的openid
exports.main = async (event, context) => {
  console.log(event)
  return event.userInfo; //返回用户信息
}


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}