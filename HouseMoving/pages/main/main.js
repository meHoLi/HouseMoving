// pages/main/main.js
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
    var list = [
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
    this.setData({
      list: list
    });
  },

  editInfo: function (e) {
    let item = e.currentTarget.dataset.item,
      name = item.flag;
    
    wx.navigateTo({
      url: '../' + name + '/' + name
    })
  },
})