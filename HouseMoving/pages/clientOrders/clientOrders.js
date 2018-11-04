// pages/clientOrders/clientOrders.js
const app = getApp()
var util = require('../../utils/util.js');
var myDate = new Date();//获取系统当前时间
var currentDate = myDate.toLocaleDateString(); //获取当前日期

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true
  },
  onLoad: function () {
    var that = this;

    this.tempData();
  },

  tempData: function () {
    // var list = [
    //   {
    //     time:'2018-08-05 17:00:00',
    //     startingPlace:'北京市昌平区沙河镇',
    //     endPlace:'北京市海淀区中关村软件园',
    //     money:'234',
    //     distance:'14公里',
    //     carType:'小面车型',
    //     workerNum: 1,
    //     contacts: '李美丽',
    //     phone:'11111111111'
    //   },
    //   {
    //     time: '2018-08-06 10:30:00',
    //     startingPlace: '北京市朝阳区',
    //     endPlace: '北京市西直门',
    //     money: '234',
    //     distance: '14公里',
    //     carType: '小面车型',
    //     workerNum: 1,
    //     contacts: '李美丽',
    //     phone: '11111111111'
    //   },
    //   {
    //     time: '2018-08-20 17:00:00',
    //     startingPlace: '北京市南锣鼓巷',
    //     endPlace: '北京市史各庄',
    //     money: '234',
    //     distance: '14公里',
    //     carType: '小面车型',
    //     workerNum: 1,
    //     contacts: '李美丽',
    //     phone: '11111111111'
    //   }
    // ];
    // this.setData({
    //   list: list
    // });

    let that = this;

    wx.request({
      url: app.globalData.url + '/Order/GetOrderList', //仅为示例，并非真实的接口地址
      data: {
        startTime: '1979-01-01 00:00:00',
        endTime: '2050-01-01 00:00:00'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
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

  //取消订单
  cancel:function(e){
    let id = e.currentTarget.dataset.item.ID,
      that = this;

    wx.request({
      url: app.globalData.url + '/Order/Cancel', //仅为示例，并非真实的接口地址
      data: {
        id: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        if (!!res.data.Status){
          wx.showToast({
            title: '订单取消成功',
            icon: 'none',
            duration: 1000,
            mask: true
          })
          that.tempData();
        }
        
      }
    })

  },
  //支付
  payFor: function (e) {
    let item = e.currentTarget.dataset.item,
      that = this
    
    wx.request({
      url: app.globalData.url + '/WXPay/WxUnifiedOrder',
      data: {
        openID: app.globalData.openID,
        total_fee: item.PayPrice*100,
        out_trade_no: item.OrderNo,
        body: '搬家服务'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {debugger
        let data = JSON.parse(res.data.Data)

        wx.requestPayment({
          timeStamp: data.timeStamp,
          nonceStr: data.nonceStr,
          package: data.package,
          signType: 'MD5',
          paySign: data.paySign,
          success: function (res) {debugger
            // success
            wx.showToast({
              title: '订单支付成功',
              icon: 'none',
              duration: 1000,
              mask: true
            })
            that.tempData();
          },
          fail: function (res) {
            // fail
            console.log(res);

            wx.showToast({
              title: '订单支付失败',
              icon: 'none',
              duration: 1000,
              mask: true
            })
          },
          complete: function (res) {
            // complete
            console.log(res);
          }
        })

      }
    })
  },
  //退款
  refund: function(e) {debugger
    let item = e.currentTarget.dataset.item,
      that = this;

    wx.request({
      url: app.globalData.url + '/WXPay/WeChatRefund', //仅为示例，并非真实的接口地址
      data: {
        origTransactionNo: '',
        origOutTradeNo: item.OrderNo,
        refundFee: item.PayPrice*100,
        totalFee: item.PayPrice * 100,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        if (!!res.data.Status) {
          wx.showToast({
            title: '退款成功',
            icon: 'none',
            duration: 1000,
            mask: true
          })
          that.tempData();
        }else{
          wx.showToast({
            title: '退款失败',
            icon: 'none',
            duration: 1000,
            mask: true
          })
        }

      }
    })
  },

  //待评价
  evaluate: function (e) {
    let item = e.currentTarget.dataset.item

    this.setData({
      hiddenmodalput: false,
      item: item
    })
  },

  //订单备注字数限制
  bindEvaluateInput: function (e) {
    var value = e.detail.value;
    var len = parseInt(value.length);

    if (len > 200) return;

    this.setData({
      currentEvaluateInfoLen: len, //当前字数  
      evaluate: value
    });
  },

  //确认评价
  confirm: function () {
    let evaluate = this.data.evaluate,
      item = this.data.item,
      that = this;

    if (!evaluate) {
      wx.showToast({
        title: '请输入评价信息',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    } else {
      wx.request({
        url: app.globalData.url + '/Comment/Add', //仅为示例，并非真实的接口地址
        data: {
          OrderID: item.ID,
          OpenID: app.globalData.openID,
          Content: evaluate,
          NickName: '1111'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {

          if (!!res.data.Status) {
            wx.showToast({
              title: '评价成功',
              icon: 'none',
              duration: 1000,
              mask: true
            })

            that.setData({
              hiddenmodalput: true,
              currentEvaluateInfoLen: 0, //当前字数  
              evaluate: ''
            });
            that.tempData();
          }

        }
      })

    }
  },
  //取消评价
  cancel: function(){
    
    this.setData({
      hiddenmodalput: true,
      currentEvaluateInfoLen: 0, //当前字数  
      evaluate: ''
    });
  }


})