//index.js
//获取应用实例
const app = getApp()
var amapFile = require('../../utils/amap-wx.js'); 
var markersData = [];
Page({
  data: {
    //车型计价和容量
    carExplainTop:'计价：起步208元(10公里)，超出5元/公里',
    carExplainBottom: '容量：可容纳10个包裹，单个包裹限重15公斤',
    items: [
      { name: '小面', value: 'car1', checked: 'true' },
      { name: '金杯', value: 'car2' },
      { name: '全顺', value: 'car3'},
      { name: '厢货', value: 'car4' }
    ],
    //下拉框
    nickName: "",
    avatarUrl: "",
    casArray: ['电梯-免费', '1楼-免费', '2楼-加收20元', '3楼-加收30元', '4楼-加收40元', '5楼-加收50元', '6楼-加收60元', '7楼-加收70元','8楼-加收80元'],
    userName: '',
    mobile: '',
    Gender: 'female',
    casIndex: 0,
    //高德
    tips: {},
    keywords:''
  },

  onLoad: function () {

  },
  bindInput: function (e) {
    var that = this;
    var keywords = e.detail.value;
    var myAmapFun = new amapFile.AMapWX({ key: 'ab3b9da6a118e991647e3b91606d6fba' });
    myAmapFun.getInputtips({
      keywords: keywords,
      location: '',
      success: function (data) {
        if (data && data.tips) {
          that.setData({
            tips: data.tips
          });
        }

      }
    })
  },
  bindSearch: function (e) {
    this.setData({
      keywords: e.target.dataset.keywords
    })
    //wx.redirectTo({
   //   url: url
    //})
  },
  //车型事件处理函数
  radioChange: function (e) {
    let value = e.detail.value;
    if (value == 'car1') {
     this.data.carExplainTop = '起步208元(10公里)，超出5元/公里';
     this.data.carExplainBottom = '容量：可容纳10个包裹，单个包裹限重15公斤';
    }
    else if (value == 'car2') {
      this.data.carExplainTop = '起步288元(10公里)，超出6元/公里';
      this.data.carExplainBottom = '容量：可容纳15个包裹，单个包裹限重15公斤';
    }
    else if (value == 'car3') {
      this.data.carExplainTop = '起步388元(10公里)，超出8元/公里';
      this.data.carExplainBottom = '可容纳20个包裹，单个包裹限重15公斤';
    }
    else if (value == 'car4') {
      this.data.carExplainTop = '起步1288元(10公里)，超出10元/公里';
      this.data.carExplainBottom = '可容纳30个包裹，单个包裹限重15公斤';
    }
    this.setData({
      carExplainTop: this.data.carExplainTop, 
      carExplainBottom: this.data.carExplainBottom
    });
  },
  openCarExplain: function(){
    console.log('车型说明')
  },
   //下拉框事件
  bindCasPickerChange: function (e) {
    console.log('乔丹选的是', this.data.casArray[e.detail.value])
    if (e.detail.value == 4) {
      this.setData({ reply: true })
    } else {
      this.setData({ reply: false })
    }
    this.setData({
      casIndex: e.detail.value
    })
  }
})
