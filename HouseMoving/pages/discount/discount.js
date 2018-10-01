// pages/discount/discount.js
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
        amount: '100',
        condition: '满300元可使用',
        deadline: '2018-08-14',
        isUsed: true
      },
      {
        amount: '30',
        condition: '满150元可使用',
        deadline: '2018-08-20'
      },
      {
        amount: '50',
        condition: '满200元可使用',
        deadline: '2018-09-30'
      }
    ];
    this.setData({
      list: list
    });
  }

})