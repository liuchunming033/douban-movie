// pages/photos/photo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photos: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取图片url
    //http://gank.io/api/data/%E7%A6%8F%E5%88%A9/y/x?imageView2/0/w/100  x = 1 ~ 54 y = 1~10 ?imageView2/0/w/200
    var x = parseInt(Math.random() * 10) || 1;
    var y = parseInt(Math.random() * 54) || 1;
    var url = app.globalData.gankApi + '/' + x + '/' + y + '?imageView2/0/w/200';
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
    console.log(res.data.results);
    var photos = res.data.results;
    this.data.photos = this.data.photos.concat(photos);

    // this.setData({
    //   photos: res.data.results
    // })
    // console.log(this.data.photos[1].url)
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