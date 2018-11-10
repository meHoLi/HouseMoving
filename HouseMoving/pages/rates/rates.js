// pages/rates/rates.js
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
    let list = [
      {
        txt: "小面车型",
        flag: 'car1'
      },
      {
        txt: "金杯车型",
        flag: 'car2'
      },
      {
        txt: "全顺车型",
        flag: 'car3'
      },
      {
        txt: "精品搬家",
        flag: 'carAll'
      },
      {
        txt: "4.2米厢货",
        flag: 'car4'
      }
    ];

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
      flag = item.flag;

    wx.navigateTo({
      url: '../webView/webView?flag=' + flag
    })
  },
})