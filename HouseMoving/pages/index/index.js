//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    carExplainTop:'计价：起步1288元(10公里)，超出10元/公里',
    carExplainBottom: '容量：可容纳30个包裹，单个包裹限重100kg',
    items: [
      { name: 'car1', value: '小面' },
      { name: 'car2', value: '金杯', checked: 'true' },
      { name: 'car3', value: '全顺' },
      { name: 'car4', value: '厢货' }
    ]
  },
  //事件处理函数
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  openCarExplain: function(){
    console.log('车型说明')
  }
})
