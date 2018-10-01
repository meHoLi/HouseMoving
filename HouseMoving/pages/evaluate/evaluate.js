// pages/evaluate/evaluate.js
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
        userName: '驾驶的快捷键',
        evaluate: '大事记卡喝咖啡季后赛的咖啡机螺蛳粉'
      },
      {
        userName: '驾驶的快捷键',
        evaluate: '撒不记得快解放啦开始的拉开健身房和卢卡斯积分落户是返回雷克萨返回萨克的技能卡夫卡设计费链接的'
      },
      {
        userName: '驾驶的快捷键',
        evaluate: '撒谎购房客户的刷卡房间很深刻的电视剧附近开始的粉红色快递费开发商将打开附件是分开的设计费花露水的空间发生了款到发货'
      }
    ];
    this.setData({
      list: list
    });
  },

})