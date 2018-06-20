//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    carExplainTop:'计价：起步208元(10公里)，超出5元/公里',
    carExplainBottom: '容量：可容纳10个包裹，单个包裹限重15公斤',
    items: [
      { name: '小面', value: 'car1', checked: 'true' },
      { name: '金杯', value: 'car2' },
      { name: '全顺', value: 'car3'},
      { name: '厢货', value: 'car4' }
    ]
  },
  //事件处理函数
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
  }
})
