// pages/orders/orders.js
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
        time:'2018-08-05 17:00:00',
        startingPlace:'北京市昌平区沙河镇',
        endPlace:'北京市海淀区中关村软件园',
        money:'234',
        distance:'14公里',
        carType:'小面车型',
        workerNum: 1,
        contacts: '李美丽',
        phone:'11111111111'
      },
      {
        time: '2018-08-06 10:30:00',
        startingPlace: '北京市朝阳区',
        endPlace: '北京市西直门',
        money: '234',
        distance: '14公里',
        carType: '小面车型',
        workerNum: 1,
        contacts: '李美丽',
        phone: '11111111111'
      },
      {
        time: '2018-08-20 17:00:00',
        startingPlace: '北京市南锣鼓巷',
        endPlace: '北京市史各庄',
        money: '234',
        distance: '14公里',
        carType: '小面车型',
        workerNum: 1,
        contacts: '李美丽',
        phone: '11111111111'
      }
    ];
    this.setData({
      list: list
    });
  },

  //取消订单
  cancel:function(){
    console.log('取消订单')
  },
  //待支付
  payFor: function () {
    console.log('待支付')
  },
  //待评价
  evaluate: function () {
    console.log('待评价')
  }


})