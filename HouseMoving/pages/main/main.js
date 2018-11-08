// pages/main/main.js
const app = getApp()
var util = require('../../utils/util.js');
var myDate = new Date();//获取系统当前时间
var currentDate = myDate.toLocaleDateString(); //获取当前日期

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function () {
    var that = this;
    this.tempData();
  
  },

  tempData: function () {
    let list
    
    if (app.globalData.openID == 'ov_MG0YFFY2_3krqGWQtQlujKzHo'//李贺
      || app.globalData.openID == 'ov_MG0RcvivFDwKb5zQNZ8mq8R0I'//陈秋杉
      || app.globalData.openID == 'ov_MG0UPZ9APJfo07u53n9q-dIvA'){//尊涵
        list = [
          {
            txt: "历史订单",
            flag: 'orders'
          },
          {
            txt: "用户评价",
            flag: 'evaluate'
          },
          // {
          //   txt: "优惠券",
          //   flag: "discount"
          // },
          {
            txt: "客户订单",
            flag: 'clientOrders'
          },
          {
            txt: "车型管理",
            flag: 'carTypeManagement'
          }
        ];
      }else{
        list = [
          {
            txt: "历史订单",
            flag: 'orders'
          },
          {
            txt: "用户评价",
            flag: 'evaluate'
          },
          // {
          //   txt: "优惠券",
          //   flag: "discount"
          // }
        ];
      }
    
    this.setData({
      list: list
    });
  },

  //打电话
  tel: function () {
    wx.makePhoneCall({
      phoneNumber: '18916840930',
    })
  },

  editInfo: function (e) {
    let item = e.currentTarget.dataset.item,
      name = item.flag;
    
    wx.navigateTo({
      url: '../' + name + '/' + name
    })
  },
})