// pages/evaluate/evaluate.js
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

  tempData: function () {debugger
    // var list = [
    //   {
    //     userName: '小明',
    //     evaluate: '大事记卡喝咖啡季后赛的咖啡机螺蛳粉'
    //   },
    // ];
    // this.setData({
    //   list: list
    // });

    let that = this;

    wx.request({
      url: app.globalData.url + '/Comment/Index', //仅为示例，并非真实的接口地址
      data: {
        openID: app.globalData.openID
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        console.log(res)
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

})