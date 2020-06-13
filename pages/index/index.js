//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    product_array: "",
  },
  onLoad: function () {
    var that = this;
    var imgUrls = [];
    wx.request({
      url: 'https://tp.adplay.ink/QueryProductByClientId.php',
      data: {
        'client_id': wx.getStorageSync('openId'),
      }, //传参
      success: function (res) {
        that.setData({
          user_product_array: res.data, //设置数据，将表中查询出来的信息传给info
        })
        if (res.data == '0') {
          wx.request({
            url: 'https://tp.adplay.ink/QueryProductByRandom.php',
            data: {}, //传参
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)
              imgUrls.push(res.data[5].goods_thumbnail_url);
              imgUrls.push(res.data[10].goods_thumbnail_url);
              imgUrls.push(res.data[15].goods_thumbnail_url);
              that.setData({
                product_array: res.data, //设置数据，将表中查询出来的信息传给info
                imgUrls : imgUrls
              })
            },
            fail: function (err) {
              console.log(err)
            }
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })

  },
  onReachBottom: function () {
    var that = this;
    wx.request({
      url: 'https://tp.adplay.ink/QueryProductByRandom.php',
      data: {}, //传参
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          product_array: that.data.product_array.concat(res.data)
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })

  },
  click: function (option) {
    var url = option.currentTarget.dataset.url;
    var encodeURIComponent_url = encodeURIComponent(url);
    wx.navigateTo({
      url: '/pages/products/products?id=' + option.currentTarget.dataset.id + '&name=' + option.currentTarget.dataset.name + '&img=' + option.currentTarget.dataset.img + '&pre=' + option.currentTarget.dataset.pre + '&price=' + option.currentTarget.dataset.price + '&category=' + option.currentTarget.dataset.category + '&desc=' + option.currentTarget.dataset.desc + '&url=' + encodeURIComponent_url,
    })
  },
  search: function (option) {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  rank: function (option) {
    wx.navigateTo({
      url: '/pages/rank/rank',
    })
  },
  history: function (option) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  }
})