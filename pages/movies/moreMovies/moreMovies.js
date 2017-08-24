// pages/movies/moreMovies/moreMovies.js
var app = getApp();
var tools = require('../../../tools/tools.js');
Page({
  data: {
    movies: {},
    requestDataUrl: '',
    //记录加载的数据数量
    totalCount: 0,
    isEmpty: true
  },
  onLoad: function (options) {
    var category = options.category;
    // console.log(category);
    //设置导航条标题
    wx.setNavigationBarTitle({
      title: category
    });
    var dataURL;
    switch (category) {
      case '正在热映': dataURL = app.globalData.doubanAPI + '/v2/movie/in_theaters'; break;
      case '即将上映': dataURL = app.globalData.doubanAPI + '/v2/movie/coming_soon'; break;
      case 'Top250': dataURL = app.globalData.doubanAPI + '/v2/movie/top250'; break;
    }
    this.data.requestDataUrl = dataURL;
    // console.log(dataURL);
    this.getMoviesList(dataURL);
  },
  onScollToLower: function () {
    // console.log("加载更多");
    //上滑加载更多，改变请求参数
    var dataUrl = this.data.requestDataUrl + '?start=' + this.data.totalCount + '&count=20';
    this.getMoviesList(dataUrl);
    //显示加载loading
    wx.showNavigationBarLoading();
  },
  //下拉刷新自带ＡＰＩ
  onPullDownRefresh:function(){
    var refreshUrl = this.data.requestDataUrl + '?start=0&count=20';
    //清空data
    this.data.totalCount = 0;
    this.data.movies = {};
    this.data.isEmpty = true;
    //显示加载loading
    wx.showNavigationBarLoading();
    this.getMoviesList(refreshUrl); 
  },
  getMoviesList: function (url) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        // 填写appalication/json会报错，为空或为其它的不报错，豆瓣API的问题
        'Content-Type': 'appalication/xml'
      },
      // 获取数据成功
      success: function (res) {
        // console.log(res);
        that.processDoubanMovies(res.data.subjects);
      },
      // 获取数据失败
      fail: function () {
        console.log("failed");
      }
    })
  },
  processDoubanMovies: function (data) {
    var movies = [];
    for (var k in data) {
      var title = data[k].title;
      //电影名字太长要截取
      if (title.length > 6) {
        title = title.substring(0, 5) + "...";
      };
      var temp = {
        title: title,
        movieId: data[k].id,
        average: data[k].rating.average,
        coverImgUrl: data[k].images.small,
        stars: tools.convertStarsToArray(data[k].rating.stars)
      };
      movies.push(temp);
    }
    var totalMovies = [];
    //加载更多时，合并请求数据
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies);
    } else {
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    
    this.setData({
      movies: totalMovies
    });
    this.data.totalCount += 20;
    // console.log(this.data);
    //取消加载loading
    wx.hideNavigationBarLoading();
    //取消下拉刷新状态
    wx.stopPullDownRefresh();
  },
  onMovieTap: function (event) {
    //跳转到每个电影详情页面
    var movieId = event.currentTarget.dataset.movieId;
    // console.log(category);
    wx.navigateTo({
      //传递电影 Id
      url: '../movie-detail/movie-detail?id=' + movieId
    })
  }
})