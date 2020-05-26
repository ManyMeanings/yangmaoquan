// pages/data/data.js
import * as echarts from '../../ec-canvas/echarts';
var historyTime;
var historyPrice;
var history;
const app = getApp();

function setOption(chart) {
  const option = {
    //定义图标的标题和颜色
    title: {
      text: '价格走势',
      left: 'left'
    },
    color: ["#37A2DA"],
    //定义你图标的线的类型种类
    legend: {
      data: ['价格'],
      top: 35,
      left: 'right',
      backgroundColor: 'white',
      z: 100
    },
    grid: {
      containLabel: true
    },
    //当你选中数据时的提示框
    tooltip: {
      trigger: 'none',
        axisPointer: {
            type: 'cross'
        }
    },
    //	x轴
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: historyTime, //x轴数据
      // x轴的字体样式
      axisLabel: {
        show: true,
        textStyle: {
          color: '#000',
          fontSize: '14',
        }
      },
      // 控制网格线是否显示
      splitLine: {
        show: true,
        //  改变轴线颜色
        lineStyle: {
          // 使用深浅的间隔色
          color: ['#aaaaaa']
        }
      },
      // x轴的颜色和宽度
      axisLine: {
        lineStyle: {
          color: '#000',
          width: 1, //这里是坐标轴的宽度,可以去掉
        }
      }
      // show: false //是否显示坐标
    },
    yAxis: {
      x: 'center',
      type: 'value',
      //网格线
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      min: 'dataMin'
    },
    series: [{
      name: '价格',
      type: 'line',
      smooth: true,
      data: historyPrice
    }]
  };
  chart.setOption(option);
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    isLoaded: false,
    isDisposed: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://tp.adplay.ink/ComparePrice.php',
      data: {
        url: options.url,
        price:options.price
      },
      success: function (res) {
        console.log("res.data: " + res.data);
        history = res.data;
        var flag = false;
        for (var i = 0; i < history.length; i++) {
          if (history[i] == "]") {
            historyTime = history.slice(2, i);
            flag = true;
            for (var j = i + 2; j < history.length; j++) {
              if (history[j] == "]") {
                historyPrice = history.slice(i + 3, j);
                break;
              }
            }
          }
          if (flag) break;
        }
        historyTime = historyTime.split(',').reverse();
        historyPrice = historyPrice.split(',').reverse();
        console.log("historyTime: " + historyTime);
        console.log("historyPrice: " + historyPrice);

        that.setData({
          name: options.name,
          img: options.img,
          price: options.price,
          source: options.source,
          historyTime: historyTime,
          historyPrice: historyPrice
        })

        that.ecComponent = that.selectComponent('#mychart-dom-bar');

        that.ecComponent.init((canvas, width, height, dpr) => {
          // 获取组件的 canvas、width、height 后的回调函数
          // 在这里初始化图表
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr // new
          });
          setOption(chart);

          // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
          that.chart = chart;

          that.setData({
            isLoaded: true,
            isDisposed: false
          });

          // 注意这里一定要返回 chart 实例，否则会影响事件处理等
          return chart;
        });
      },
      fail: function (res) {
        console.log("error: " + res.data)
      }
    }, )
  },

  dispose: function () {
    if (this.chart) {
      this.chart.dispose();
    }
    this.setData({
      isDisposed: true
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
