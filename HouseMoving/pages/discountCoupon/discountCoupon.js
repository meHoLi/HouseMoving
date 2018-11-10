// pages/discountCoupon/discountCoupon.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.tempData();
  },

  tempData: function () {
    let that = this;

    wx.request({
      url: app.globalData.url + '/Coupon/Index', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        debugger
        let list = res.data.Data

        if (!!list[0]) {
          that.setData({
            noClassDis: 'none',
            haveClassDis: 'block',
            list: list
          });
        } else {
          that.setData({
            noClassDis: 'block',
            haveClassDis: 'none',
            list: list
          });
        }
      }
    })
  },

  //输入优惠码
  bindSaleCodeInput: function (e) {
    debugger
    let value = e.detail.value;

    this.setData({
      Code: value
    });
  },

  //输入优惠金额
  bindSaleMoneyInput: function (e) {
    debugger
    let value = e.detail.value;

    this.setData({
      Amount: value
    });
  },

  //输入超出单价
  bindUnitPriceInput: function (e) {
    debugger
    let data = this.data,
      list = data.list,
      index = e.currentTarget.dataset.index,
      value = e.detail.value;

    list[index].UnitPrice = value

    this.setData({
      list: list
    });
  },

  //保存
  add: function (e) {
    debugger
    let that = this,
      data = this.data;

    if (!data.Code){
      wx.showToast({
        title: '请输入优惠码',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      return
    }

    if (!data.Amount) {
      wx.showToast({
        title: '请输入优惠金额',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      return
    }

    wx.request({
      url: app.globalData.url + '/Coupon/Add', //仅为示例，并非真实的接口地址
      data: {
        Code: data.Code,
        Amount: data.Amount
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        debugger
        let list = res.data.Data

        if (!!res.data.Status) {
          wx.showToast({
            title: '优惠券添加成功',
            icon: 'none',
            duration: 1500,
            mask: true
          })
          that.tempData();
        } else {
          if (res.data.Result == "900"){
            wx.showToast({
              title: '优惠码重复',
              icon: 'none',
              duration: 10500,
              mask: true
            })
          }else{
            wx.showToast({
              title: '优惠券添加失败',
              icon: 'none',
              duration: 1500,
              mask: true
            })
          }
        }
      }
    })

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