//index.js
//获取应用实例
var app = getApp()
var amapFile = require('../../utils/amap-wx.js');
// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../utils/bmap-wx.min.js');
//使用小程序的日期控件
var util = require('../../utils/util.js')

//日期时间选择器
var  dateTimePicker = require('../../utils/dateTimePicker.js');

var markersData = [];
//高德地图实例
var myAmapFun = new amapFile.AMapWX({
  key: 'ab3b9da6a118e991647e3b91606d6fba'
});

const casArray = [
  { name: '电梯-免费', money: 0},
  { name: '1楼-免费', money: 0 },
  { name: '2楼-加收20元', money: 20 },
  { name: '3楼-加收30元', money: 30 },
  { name: '4楼-加收40元', money: 40 },
  { name: '5楼-加收50元', money: 50 },
  { name: '6楼-加收60元', money: 60 },
  { name: '7楼-加收70元', money: 70 },
  { name: '8楼-加收80元', money: 80 }
]

Page({
  data: {
    //车型计价和容量
    carExplainTop: '',
    carExplainBottom: '容量：可容纳10个包裹，单个包裹限重15公斤',
    carType: '小面',
    carValue: 'car1',
    carList: [{
        name: '小面',
        value: 'car1',
        checked: 'true'
      },
      {
        name: '金杯',
        value: 'car2'
      },
      {
        name: '全顺',
        value: 'car3'
      },
      {
        name: '厢货',
        value: 'car4'
      }
    ],
    //下拉框
    nickName: "",
    avatarUrl: "",
    casArray: casArray,//['电梯-免费', '1楼-免费', '2楼-加收20元', '3楼-加收30元', '4楼-加收40元', '5楼-加收50元', '6楼-加收60元', '7楼-加收70元', '8楼-加收80元'],
    userName: '',
    mobile: '',
    Gender: 'female',
    casIndex1: 0,//起始地电梯
    casIndex2: 0,//目的地电梯
    //高德
    tips: {},
    keywords: '',//暂未使用
    keywordssd: '',//起始地
    keywordsed: '',//目的地
    displayValue: 'block',
    addressValue: '',
    jsonArray: [],
    jsonLocationArray: [],
    //起点经纬度
    origin: "",
    //终点经纬度
    destination: "",
    //百度
    sugData: '',
    //途经点
    itemCount: 0,

    name: '', 
    phoneNum: '', 
    personNum: '', 
    remark: '',

    distance: 0,
    price: 0,
    figurePrice: 0
  },

  onLoad: function() {
    let that = this;
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj.dateTimeArray.pop();
    var lastTime = obj.dateTime.pop();

    wx.request({
      url: app.globalData.url + '/CarPriceSetting/GetModelByCarCode', //仅为示例，并非真实的接口地址
      data: {
        CarCode: this.data.carValue
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let data = res.data.Data,
         carExplainTop = '计价：起步' + data.StartPrice + '元(' + data.StartDistance + '公里)，超出' + data.UnitPrice + '元/公里'

        that.setData({
          carExplainTop: carExplainTop,
          StartDistance: res.data.Data.StartDistance,
          StartPrice: res.data.Data.StartPrice,
          UnitPrice: res.data.Data.UnitPrice,
          dateTimeArray: obj.dateTimeArray,
          dateTime: obj.dateTime
        });
      }
    })
  },

  //设置搬家时间下拉
  changeDateTime(e) {debugger
    this.setData({ dateTime: e.detail.value });
  },

  changeDateTimeColumn(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },


  //高德
  bindInput: function(e) {
    var that = this;
    // that.setData({
    //   displayValue: 'block'
    // })
    var dv = e.detail.value;
    var addressValue = e.target.dataset.address;
    myAmapFun.getInputtips({
      keywords: dv,
      location: '',
      success: function(data) {
        if (data && data.tips) {
          that.setData({
            displayValue: 'block',
            tips: data.tips,
            addressValue: addressValue
          });
        }

      }
    })
  },
  bindSearch: function(e) {
    var that = this;
    //获取地址信息
    //console.log(e.target.dataset.location); 

    let parentid = e.target.dataset.parentid;
    let keywords = e.target.dataset.keywords;
    var {
      jsonLocationArray,
      itemCount
    } = this.data;
    //起始地
    if (parentid == 'sd') {
      that.origin = e.target.dataset.location
      this.setData({
        keywordssd: keywords,
        displayValue: 'none'
      }) //目的地
    } else if (parentid == 'ed') {
      that.destination = e.target.dataset.location;
      this.setData({
        keywordsed: keywords,
        displayValue: 'none'
      })
    } else {debugger

      //动态添加的地址逻辑 
      var jsonData = {
        keywords: keywords,
        parentid: parentid,
        id: parentid
      };
      var {
        jsonArray,
        itemCount
      } = this.data;

      //动态添加的地址维度
      var jsonLocationData = {
        location: e.target.dataset.location,
        parentid: e.target.dataset.parentid
      };

      let isUpdate = false;
      for (let i = 0; i < jsonArray.length; i++) {
        if (jsonArray[i].id == jsonData.parentid) {
          jsonData.casIndex = jsonArray[i].casIndex
          jsonArray[i] = jsonData;
          jsonLocationArray[i] = jsonLocationData;
          isUpdate = true;
        }
      }
      if (isUpdate == false) {
        jsonArray.push(jsonData);
        jsonLocationArray.push(jsonLocationData);
      }
      this.setData({
        jsonArray: jsonArray,
        displayValue: 'none'
      })
    }
    //计算地址距离
    that.data.distance = 0;

    if (jsonLocationArray.length == 0) {
      that.calcDistance(that.origin, that.destination);
    } else {
      that.calcDynamicDistance(jsonLocationArray);
    }
  },

  //计算动态里程
  calcDynamicDistance: function (jsonLocationArray){
    let s, e, that = this;

    for (let i = 0; i < jsonLocationArray.length + 1; i++) {
      if (i == 0) {
        s = that.origin;
        e = jsonLocationArray[i].location;
      } else if (i == jsonLocationArray.length) {
        s = jsonLocationArray[i - 1].location;
        e = that.destination;
      } else {
        s = jsonLocationArray[i - 1].location;
        e = jsonLocationArray[i].location;
      }
      that.calcDistance(s, e);
    }
  },

  //计算单个里程
  calcDistance: function(origin, destination) {
    var that = this;
    myAmapFun.getDrivingRoute({
      origin: origin,
      destination: destination,
      success: function(data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        if (data.paths[0] && data.paths[0].distance) {
          let sumDistance = parseInt(that.data.distance*1000) + parseInt(data.paths[0].distance);
          //向上取整,有小数就整数部分加1
          let showDistance = Math.ceil(sumDistance / 1000);

          that.countPrice(showDistance)

          // that.setData({
          //   distance: showDistance
          // });
          // console.log(that.data.distance);
          //console.log(that.data.jsonLocationArray); 
        }

      },
      fail: function(info) {

      }
    })

  },
  countPrice: function (distance){debugger
    let that = this,
      data = this.data,
      carValue = data.carValue,
      beyondDistance = distance > 10 ? Number(distance) - 10 : 0,
      jsonArray = this.data.jsonArray,
      startMoney = !!this.data.startMoney ? Number(this.data.startMoney) : 0,
      endMoney = !!this.data.endMoney ? Number(this.data.endMoney) : 0,
      figurePrice,
      price

    if (carValue == 'car1') {//小面  起步208元(10公里)，超出5元/公里
      price = Number(data.StartPrice) + Number(data.UnitPrice) * beyondDistance
    } else if (carValue == 'car2') {//金杯 起步288元(10公里)，超出6元/公里
      price = Number(data.StartPrice) + Number(data.UnitPrice) * beyondDistance
    } else if (carValue == 'car3') {//全顺 起步388元(10公里)，超出8元/公里
      price = Number(data.StartPrice) + Number(data.UnitPrice) * beyondDistance
    } else if (carValue == 'car4') {//厢货 起步1288元(10公里)，超出10元/公里
      price = Number(data.StartPrice) + Number(data.UnitPrice) * beyondDistance
    }

    figurePrice = !!data.keywordssd && !!data.keywordsed ? price : 0
    price = figurePrice + startMoney + endMoney

    for (let i = 0; i < jsonArray.length; i++) {
      price = price + this.data.casArray[jsonArray[i].casIndex].money
    }

    that.setData({
      distance: distance,
      price: price,
      figurePrice: figurePrice
    });
  },

  //百度
  // 绑定input输入 
  bindKeyInput: function(e) {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'ApYZvojZZg4Ok2GjvQhY3D82OR5FiYhb'
    });
    var fail = function(data) {
      console.log(data)
    };
    var success = function(data) {
      var sugData = '';
      for (var i = 0; i < data.result.length; i++) {
        sugData = sugData + data.result[i].name + '\n';
      }
      that.setData({
        sugData: sugData
      });
    }
    // 发起suggestion检索请求 
    BMap.suggestion({
      query: e.detail.value,
      region: '北京',
      city_limit: true,
      fail: fail,
      success: success
    });
  },
  //车型事件处理函数
  radioChange: function(e) {debugger
    let that = this,
      value = e.detail.value,
      data = this.data,
      distance = data.distance,
      carList = this.data.carList,
      item = carList.filter(item => { return item.value == value})[0],
      beyondDistance = distance > 10 ? Number(distance) - 10 : 0,
      jsonArray = this.data.jsonArray,
      startMoney = !!this.data.startMoney ? Number(this.data.startMoney) : 0,
      endMoney = !!this.data.endMoney ? Number(this.data.endMoney) : 0,
      figurePrice,
      price;

    wx.request({
      url: app.globalData.url + '/CarPriceSetting/GetModelByCarCode', //仅为示例，并非真实的接口地址
      data: {
        CarCode: value
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {debugger
        let valueList = res.data.Data,
          carExplainTop = '计价：起步' + valueList.StartPrice + '元(' + valueList.StartDistance + '公里)，超出' + valueList.UnitPrice + '元/公里',
          carExplainBottom;

        if (value == 'car1') {
          carExplainBottom = '容量：可容纳10个包裹，单个包裹限重15公斤';
          price = Number(valueList.StartPrice) + Number(valueList.UnitPrice) * beyondDistance;
        } else if (value == 'car2') {
          carExplainBottom = '容量：可容纳15个包裹，单个包裹限重15公斤';
          price = Number(valueList.StartPrice) + Number(valueList.UnitPrice) * beyondDistance
        } else if (value == 'car3') {
          carExplainBottom = '容量：可容纳20个包裹，单个包裹限重15公斤';
          price = Number(valueList.StartPrice) + Number(valueList.UnitPrice) * beyondDistance
        } else if (value == 'car4') {
          carExplainBottom = '容量：可容纳30个包裹，单个包裹限重15公斤';
          price = Number(valueList.StartPrice) + Number(valueList.UnitPrice) * beyondDistance
        }

        figurePrice = !!data.keywordssd && !!data.keywordsed ? price : 0
        price = figurePrice + startMoney + endMoney

        for (let i = 0; i < jsonArray.length; i++) {
          price = price + data.casArray[jsonArray[i].casIndex].money
        }

        that.setData({
          carExplainTop: carExplainTop,
          carExplainBottom: carExplainBottom,
          StartDistance: valueList.StartDistance,
          StartPrice: valueList.StartPrice,
          UnitPrice: valueList.UnitPrice,
          carType: item.name,
          carValue: value,
          price: price,
          figurePrice: figurePrice
        });
      }
    })

  },
  openCarExplain: function() {
    console.log('车型说明')
  },
  //下拉框事件
  bindCasPickerChange: function(e) {debugger
    console.log('乔丹选的是', e.detail.value, this.data.casArray[e.detail.value])

    let jsonArray = this.data.jsonArray,
      casItem = this.data.casArray[e.detail.value],
      figurePrice = this.data.figurePrice,
      startMoney,//起始地楼梯收费   
      endMoney;//目的地楼梯收费 

    if (e.currentTarget.dataset.flag == "start"){
      startMoney = casItem.money
      endMoney = !!this.data.endMoney ? Number(this.data.endMoney) : 0

      let price = figurePrice + startMoney + endMoney

      for (let i = 0; i < jsonArray.length; i++) {
        price = price + this.data.casArray[jsonArray[i].casIndex].money
      }

      this.setData({
        casIndex1: e.detail.value,
        price: price,
        startMoney: startMoney
      })
    } else if (e.currentTarget.dataset.flag == "end") {
      startMoney = !!this.data.startMoney ? Number(this.data.startMoney) : 0
      endMoney = casItem.money

      let price = figurePrice + startMoney + endMoney

      for (let i = 0; i < jsonArray.length; i++) {
        price = price + this.data.casArray[jsonArray[i].casIndex].money
      }

      this.setData({
        casIndex2: e.detail.value,
        price: price,
        endMoney: endMoney
      })
    } else if (e.currentTarget.dataset.flag == "passing") {
      startMoney = !!this.data.startMoney ? Number(this.data.startMoney) : 0
      endMoney = !!this.data.endMoney ? Number(this.data.endMoney) : 0

      let item = e.currentTarget.dataset.item,
        index = e.currentTarget.dataset.index,
        price = figurePrice + startMoney + endMoney

      jsonArray[index].casIndex = e.detail.value

      for (let i = 0; i < jsonArray.length; i++){
        price = price + this.data.casArray[jsonArray[i].casIndex].money
      }

      this.setData({
        jsonArray: jsonArray,
        price: price
      })
    }
  },
  //添加途经点
  addPassingPlace: function() {
    var {
      jsonArray,
      itemCount
    } = this.data;
    var newData = {
      id: itemCount,
      parentid: itemCount,
      casIndex: 0
    };
    jsonArray.push(newData);
    this.setData({
      jsonArray: jsonArray,
      itemCount: itemCount + 1,
    })
  },
  //删除途径点
  delPassingPlace: function(e) {
    let { jsonArray, itemCount, jsonLocationArray} = this.data,
      index = e.target.dataset.index

    jsonArray.splice(index, 1)
    jsonLocationArray.splice(index, 1)
    for (var i = 0; i < jsonArray.length; i++) {
      jsonArray[i].id = i
      jsonArray[i].parentid = i
    }
    itemCount = itemCount - 1

    this.setData({
      jsonArray: jsonArray,
      itemCount: itemCount + 1,
      distance: 0//距离请零重新计算
    })

    if (!!jsonLocationArray[0]){//有途经点
      this.calcDynamicDistance(jsonLocationArray);
    }else{
      this.calcDistance(this.origin, this.destination);
    }
    console.log(jsonArray.length, '////////', itemCount)
  },

  //录入联系人
  bindContactsInput: function(e){
    var value = e.detail.value;

    this.setData({
      name: value  
    });
  },

  //录入联系电话
  bindPhoneInput: function (e) {
    var value = e.detail.value;

    this.setData({
      phoneNum: value
    });
  },

  //录入搬家师傅数量
  bindPersonNumInput: function (e) {
    var value = e.detail.value;

    this.setData({
      personNum: value
    });
  },

  //订单备注字数限制
  bindRemarkInput: function(e) {
    var value = e.detail.value;
    var len = parseInt(value.length);

    if (len > 200) return;

    this.setData({
      currentRemarkInfoLen: len, //当前字数  
      remark: value
    });
  },
  //录入优惠码
  bindSaleCodeInput: function (e) {
    var value = e.detail.value;

    this.setData({
      saleCode: value
    });
  },

  //确认下单
  placeOrder: function(e){debugger
    let that = this,
      data = that.data,
      dateTime = data.dateTime,
      dateTimeArray = data.dateTimeArray,
      dateArr = [],
      timeArr = [],
      serviceTime = '';

    if (!data.keywordssd){
      wx.showToast({
        title: '请输入起始地',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    } else if (!data.keywordsed){
      wx.showToast({
        title: '请输入目的地',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    } else if (!data.dateTime) {
      wx.showToast({
        title: '请选择搬家时间',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    } else if (!data.name){
      wx.showToast({
        title: '请输入联系人',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    } else if (!data.phoneNum) {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }

    if (!!data.dateTime && !!data.dateTime[0] && !!dateTimeArray && !!dateTimeArray[0]){
      data.dateTime.map((item,index)=>{
        if (index<3){
          dateArr.push(dateTimeArray[index][item])
        }else{
          timeArr.push(dateTimeArray[index][item])
        }
      })

      serviceTime = dateArr.join('-') + ' ' + timeArr.join(':') + ':00'
    }
    
    let queryParams = {
        OpenID: app.globalData.openID,
        CarType: data.carType,
        CreateTime:'',
        Distance: data.distance,//未使用
        EndPlace: data.keywordsed,
        Name: data.name,
        OrderNo:'',
        OrgPrice: data.price,
        PayPrice: data.price,
        PeopleNum: !!data.personNum ? data.personNum : 1,
        Phone: data.phoneNum,
        SalePrice:0,
        CouponCode: !!data.saleCode ? data.saleCode : '',
        ServiceTime: serviceTime,
        StartPlace: data.keywordssd,
        Remark: data.remark,
        PayState: 0
      };

    wx.request({
      url: app.globalData.url + '/Order/Add',
      data: queryParams,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {debugger
        let data = res.data.Data

        if (!res.data.Status){
          wx.showToast({
            title: '当前优惠码已使用或无效',
            icon: 'none',
            duration: 1500,
            mask: true
          })
          return
        }
        wx.request({
          url: app.globalData.url + '/WXPay/WxUnifiedOrder',
          data: { 
            openID: app.globalData.openID, 
            total_fee: data.PayPrice*100, 
            out_trade_no: data.OrderNo,
            body: '搬家服务'
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            let data = JSON.parse(res.data.Data)

            wx.requestPayment({
              timeStamp: data.timeStamp,
              nonceStr: data.nonceStr,
              package: data.package,
              signType: 'MD5',
              paySign: data.paySign,
              success: function (res) {
                // success
                console.log(res);
              },
              fail: function (res) {
                // fail
                console.log(res);
              },
              complete: function (res) {
                // complete
                console.log(res);
              }
            })

          }
        })

      }
    })


  }
})