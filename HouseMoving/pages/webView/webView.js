// pages/webView/webView.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {debugger
    options
    let path

    switch (options.flag) {
      case "car1":
        path = 'https://mp.weixin.qq.com/s/mRzHizLltYJBb51cc1YLIQ'
        break;
      case "car2":
        path = 'https://mp.weixin.qq.com/s/mgFPjVvm78LMdyK4W-Y8Ug'
        break;
      case "car3":
        path = 'https://mp.weixin.qq.com/s/loMcZUE_GeEiclgMyKfy4w'
        break;
      case "car4":
        path = 'https://mp.weixin.qq.com/s/3lgf8K46OI5R3lTLkIQcSQ'
        break;
      case "carAll":
        path = 'https://mp.weixin.qq.com/s/Y8AWTwOx9XoShvral7q4aw'
        break;
      default:
        path = 'https://mp.weixin.qq.com/s/mRzHizLltYJBb51cc1YLIQ'
        break;
    }
    
    this.setData({
      path: path
    });
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