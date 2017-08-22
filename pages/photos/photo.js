// pages/photos/photo.js
var app = getApp();
Page({


  data: {
    photos: [],
    x: 5,
    y: 10
  },
  onLoad: function (options) {
    // 获取图片url
    //http://gank.io/api/data/%E7%A6%8F%E5%88%A9/y/x?imageView2/0/w/100  x = 1 ~ 54 y = 1~10 ?imageView2/0/w/200
    var x = parseInt(Math.random() * 10) || 1;
    var y = parseInt(Math.random() * 54) || 1;
    var url = app.globalData.gankApi + '/' + this.data.x + '/' + this.data.y;
    // console.log(url)
    this.getPhotosList(url);
  },
  getPhotosList: function (url) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        // 填写appalication/json会报错，为空或为其它的不报错，豆瓣API的问题
        'Content-Type': 'appalication/json'
      },
      // 获取数据成功
      success: function (res) {
        // console.log(res);
        that.processPhotos(res);
      },
      // 获取数据失败
      fail: function () {
        console.log("failed");
      }
    })
  },
  processPhotos(res) {
    var data = res.data.results || [], totalPhotots;
    if (!this.data.photos) {
      totalPhotots = data;
    }
    totalPhotots = data.concat(this.data.photos);

    this.setData({
      photos: totalPhotots
    });
    console.log(totalPhotots);
  },
  getMorePhotos: function () {
    console.log("加载更多");
    //上滑加载更多，改变请求参数

    this.data.y++;
    if (this.data.y >= 49) {
      this.data.x++;
      this.data.y = 1;
    }
    if (this.data.x >= 10) {
      return alert("没有图片了");
    }
    var dataUrl = app.globalData.gankApi + '/' + this.data.x + '/' + this.data.y;
    console.log(dataUrl);
    this.getPhotosList(dataUrl);
    //显示加载loading
    wx.showNavigationBarLoading();
  }
})