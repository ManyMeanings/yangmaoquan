// pages/data/data.js
import * as echarts from '../../ec-canvas/echarts';
function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);

  var option = {
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
      show: true,
      trigger: 'axis'
    },
    //	x轴
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['2-3', '2-23', '3-14', '4-3', '4-23', '5-13'],//x轴数据
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
          width: 1,   //这里是坐标轴的宽度,可以去掉
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
      // show: false
    },
    series: [{
      name: '价格',
      type: 'line',
      smooth: true,
      data: [148, 148, 166, 99, 148, 148]
    }]
  };
  chart.setOption(option);
  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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