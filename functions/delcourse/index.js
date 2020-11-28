// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()


exports.main = async (event, context) => {
 // console.log('cloud',enent.coursename)
  try {
    return await db.collection('Cache').where({
     course:event.coursename
    }).remove()
  } catch (e) {
    console.error(e)
  }
}


