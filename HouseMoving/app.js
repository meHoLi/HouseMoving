//app.js
App({
  onLaunch: function () {
    console.log('我是公共的')
    let that = this

    wx.login({
      success: function (res) {
        wx.request({
          //获取openid接口
          url: that.globalData.url + '/WeChatAppAuthorize/GetOpenIdAndSessionKeyString',
          data: {
            code: res.code,
          },
          success: function (res) {debugger
            console.log('我停止了')
            let data = JSON.parse(res.data.Data);

            that.globalData.openID = data.openid
            that.globalData.session_key = data.session_key
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    url: 'https://www.xiaoshangbang.com/HouseMovingAPI'//'http://192.168.0.7:38494'//'http://172.16.46.90:61242'//'https://pay.houjiale.com'//
  }
})