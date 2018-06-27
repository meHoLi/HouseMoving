//index.js
//获取应用实例
const app = getApp()
var amapFile = require('../../utils/amap-wx.js');
// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../utils/bmap-wx.min.js');
var markersData = [];
Page({
  data: {
    //车型计价和容量
    carExplainTop: '计价：起步208元(10公里)，超出5元/公里',
    carExplainBottom: '容量：可容纳10个包裹，单个包裹限重15公斤',
    items: [{
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
    casArray: ['电梯-免费', '1楼-免费', '2楼-加收20元', '3楼-加收30元', '4楼-加收40元', '5楼-加收50元', '6楼-加收60元', '7楼-加收70元', '8楼-加收80元'],
    userName: '',
    mobile: '',
    Gender: 'female',
    casIndex: 0,
    //高德
    tips: {},
    keywords: '',
    keywordssd: '',
    keywordsed: '',
    displayValue: 'block',
    distance: '',
    addressValue: '',
    jsonArray: [],
    //百度
    sugData: '',
    //途经点
    passingPlaceLists: [],
    itemCount: 0,
    multiArray: [
      ['无脊柱动物', '脊柱动物'],
      ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'],
      ['猪肉绦虫', '吸血虫']
    ],
    objectMultiArray: [
      [{
          id: 0,
          name: '无脊柱动物'
        },
        {
          id: 1,
          name: '脊柱动物'
        }
      ],
      [{
          id: 0,
          name: '扁性动物'
        },
        {
          id: 1,
          name: '线形动物'
        },
        {
          id: 2,
          name: '环节动物'
        },
        {
          id: 3,
          name: '软体动物'
        },
        {
          id: 3,
          name: '节肢动物'
        }
      ],
      [{
          id: 0,
          name: '猪肉绦虫'
        },
        {
          id: 1,
          name: '吸血虫'
        }
      ]
    ],
    //multiIndex: [0, 0, 0],
  },

  onLoad: function() {

  },
  //高德
  bindInput: function(e) {
    var that = this;
    that.setData({
      displayValue: 'block'
    })
    var dv = e.detail.value;
    var addressValue = e.target.dataset.address;
    console.log(addressValue);
    var myAmapFun = new amapFile.AMapWX({
      key: 'ab3b9da6a118e991647e3b91606d6fba'
    });
    myAmapFun.getInputtips({
      keywords: dv,
      location: '',
      success: function(data) {
        if (data && data.tips) {
          that.setData({
            tips: data.tips,
            addressValue: addressValue
          });
        }

      }
    })
    //计算地址距离
    myAmapFun.getDrivingRoute({
      origin: '116.481028,39.989643',
      destination: '116.434446,39.90816',
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
          that.setData({
            distance: data.paths[0].distance + '米'
          });
          //console.log(that.data.distance);
        }

      },
      fail: function(info) {

      }
    })
  },
  //获取地址信息
  bindSearch: function(e) {
    //console.log(e.target.dataset.location); 
    let parentid = e.target.dataset.parentid;
    let keywords = e.target.dataset.keywords;
    //起始地
    if (parentid == 'sd') {
      this.setData({
        keywordssd: keywords,
        displayValue: 'none'
      })//目的地
    } else if (parentid == 'ed') {
      this.setData({
        keywordsed: keywords,
        displayValue: 'none'
      })
    } else {

      //动态添加的地址逻辑 
      var jsonData = {
        keywords: keywords,
        parentid: parentid
      };
      var {
        jsonArray,
        itemCount
      } = this.data;

      let isUpdate = false;
      for (let i = 0; i < jsonArray.length; i++) {
        if (jsonArray[i].parentid == jsonData.parentid) {
          jsonArray[i] = jsonData;
          isUpdate = true;
        }
      }
      if (isUpdate == false) {
        jsonArray.push(jsonData);
      }
      this.setData({
        jsonArray: jsonArray,
        displayValue: 'none'
      })
    }
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
  radioChange: function(e) {
    let value = e.detail.value;
    if (value == 'car1') {
      this.data.carExplainTop = '起步208元(10公里)，超出5元/公里';
      this.data.carExplainBottom = '容量：可容纳10个包裹，单个包裹限重15公斤';
    } else if (value == 'car2') {
      this.data.carExplainTop = '起步288元(10公里)，超出6元/公里';
      this.data.carExplainBottom = '容量：可容纳15个包裹，单个包裹限重15公斤';
    } else if (value == 'car3') {
      this.data.carExplainTop = '起步388元(10公里)，超出8元/公里';
      this.data.carExplainBottom = '可容纳20个包裹，单个包裹限重15公斤';
    } else if (value == 'car4') {
      this.data.carExplainTop = '起步1288元(10公里)，超出10元/公里';
      this.data.carExplainBottom = '可容纳30个包裹，单个包裹限重15公斤';
    }
    this.setData({
      carExplainTop: this.data.carExplainTop,
      carExplainBottom: this.data.carExplainBottom
    });
  },
  openCarExplain: function() {
    console.log('车型说明')
  },
  //下拉框事件
  bindCasPickerChange: function(e) {
    console.log('乔丹选的是', this.data.casArray[e.detail.value])
    if (e.detail.value == 4) {
      this.setData({
        reply: true
      })
    } else {
      this.setData({
        reply: false
      })
    }
    this.setData({
      casIndex: e.detail.value
    })
  },
  //添加途经点
  addPassingPlace: function() {
    var {
      passingPlaceLists,
      itemCount
    } = this.data;
    var newData = {
      id: itemCount
    };
    passingPlaceLists.push(newData);
    this.setData({
      passingPlaceLists: passingPlaceLists,
      itemCount: itemCount + 1,
    })
  },
  //删除途径点
  delPassingPlace: function(e) {
    var {
      passingPlaceLists,
      itemCount
    } = this.data;
    var index = e.target.dataset.index;

    passingPlaceLists.splice(index, 1)
    for (var i = 0; i < passingPlaceLists.length; i++) {
      passingPlaceLists[i].id = i
    }
    itemCount = itemCount - 1

    this.setData({
      passingPlaceLists: passingPlaceLists,
      itemCount: itemCount + 1,
    })
    console.log(passingPlaceLists.length, '////////', itemCount)
  },
  //搬家时间下拉选择
  bindMultiPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  //搬家时间下拉列选择
  bindMultiPickerColumnChange: function(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
            break;
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            data.multiArray[2] = ['鲫鱼', '带鱼'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                break;
              case 1:
                data.multiArray[2] = ['蛔虫'];
                break;
              case 2:
                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                break;
              case 3:
                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                break;
              case 4:
                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['鲫鱼', '带鱼'];
                break;
              case 1:
                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                break;
              case 2:
                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
})