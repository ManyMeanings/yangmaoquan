// pages/products/products.js
var startTime,
  endTime
Page({

  /**
   * 页面的初始数据
   */
  data: {
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
        id: options.id,
        name: options.name,
        img: options.img,
        price: options.price,
        pre: options.pre,
        category:options.category,
      }),
      wx.setNavigationBarColor({
        backgroundColor: '#ffffff',
        frontColor: '#000000',

      })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("计时开始")
    startTime = new Date();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    endTime = new Date();
    var stayTime = endTime - startTime;
    console.log("页面停留时间：" + stayTime)    
    wx.request({
      url: 'http://tp.adplay.ink/RecordTime.php',
      data:{
        time:stayTime,   
        id:wx.getStorageSync('openId'),
        product_id:this.data.id,
        category:this.data.category,
      },
      success: function (res) {
          console.log(res.data);
          console.log(wx.getStorageSync('openId'));
      },
      fail:function (res) {
        console.log(res.data);
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})