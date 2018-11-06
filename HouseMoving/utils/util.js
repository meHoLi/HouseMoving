let app = getApp()
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

let sendMsg = () => {
  wx.request({
    url: app.globalData.url + '/SendEMail/SendMailUseGmail', //仅为示例，并非真实的接口地址
    data: {},
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {

    }
  })
}

module.exports = {
  formatTime: formatTime,
  sendMsg: sendMsg
}
