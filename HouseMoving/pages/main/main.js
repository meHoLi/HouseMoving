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
        txt: "历史订单"
      },
      {
        txt: "用户评价"
      },
      {
        txt: "优惠券"
      }
    ];
    this.setData({
      list: list
    });
  },

  editInfo: function (e) {
    let index = e.currentTarget.dataset.index,
      name = index == 0 ? 'orders' : (index == 1 ? 'evaluate' : 'discount')
    
    wx.navigateTo({
      url: '../' + name + '/' + name
    })
  },
})