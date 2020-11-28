// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const xlsx = require('node-xlsx');
const db = cloud.database()
const MAX_LIMIT = 1000
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try{
    let {course} = event
    const countResult = await db.collection('Students').count()
    const total = countResult.total
    // 计算需分几次取
    const batchTimes = Math.ceil(total / MAX_LIMIT)
    // 承载所有读操作的 promise 的数组
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('Students').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
      tasks.push(promise)
    }
    // 等待所有
    let userdata = (await Promise.all(tasks)).reduce((acc, cur) => {
      return acc.data.concat(cur.data)
    })

    let dataCSV = 'Register.xlsx'
    let alldata = [['姓名', '学号', '课程', '签到次数']]
    for(var i = 0; i < userdata.data.length; i++){
      if(userdata.data[i].course != course)
        continue
      let arr = []
      arr.push(userdata.data[i].name)
      arr.push(userdata.data[i].num)
      arr.push(userdata.data[i].course)
      arr.push(userdata.data[i].checkin)
      alldata.push(arr)
    }
    var buffer = await xlsx.build([{
      sheet:'签到信息',
      data: alldata
    }])
    return await cloud.uploadFile({
      cloudPath: dataCSV,
      fileContent: buffer
    })
  }
  catch(e){
      console.error(e)
      return e
    }
}