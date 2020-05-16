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
    duration: 500,
    product_array: "",
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: "今日好物"
    })
    var that = this;
    wx.request({
      url: 'https://tp.adplay.ink/QueryProductByClientId.php',//此处不能用https，需勾选不校验合法域名，上线需使用https协议
      data: {
        'client_id':wx.getStorageSync('openId'),
      },									//传参
      success: function(res) {
        that.setData({
          user_product_array: res.data						//设置数据，将表中查询出来的信息传给info
        })
        if(res.data=='0')      
      { 
      wx.request({
      url: 'https://tp.adplay.ink/QueryProductByRandom.php',//此处不能用https，需勾选不校验合法域名，上线需使用https协议
      data: {},									//传参
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          product_array: res.data						//设置数据，将表中查询出来的信息传给info
        }) 
      },
      fail: function(err) {
        console.log(err)
      }
    })
        }
      },
      fail: function(err) {
        console.log(err)
      }
    })
  
  },
  onReachBottom: function () {
    var that =this;
    wx.request({
      url: 'https://tp.adplay.ink/QueryProductByRandom.php',
      data: {},									//传参
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          product_array: that.data.product_array.concat(res.data)
        })
      },
      fail: function(err) {
        console.log(err)
      }
    })
    
 },
  click: function (option) {
    wx.navigateTo({
      url: '/pages/products/products?id=' + option.currentTarget.dataset.id + '&name=' + option.currentTarget.dataset.name + '&img=' + option.currentTarget.dataset.img + '&pre=' + option.currentTarget.dataset.pre + '&price=' + option.currentTarget.dataset.price + '&category=' + option.currentTarget.dataset.category + '&desc=' + option.currentTarget.dataset.desc,
    })
  },
  search: function (option) {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  

  
})