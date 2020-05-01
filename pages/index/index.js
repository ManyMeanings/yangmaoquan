//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: ['/images/test.jpg','/images/test.jpg','/images/test.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500
    
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: "今日好券"
    })
    
  },
  click: function (option) {
    wx.navigateTo({
      url: '/pages/products/products',
    })
  },
  
})
