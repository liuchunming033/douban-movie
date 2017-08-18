var app = getApp();
var tools = require('../../tools/tools.js');
Page({
  data: {
    hotMovies: {},
    comingMovies: {},
    topMovies: {},
    searchContainer: false,
    movieDetail: true,
    searchResult:{}
  },
  onLoad: function (event) {
    // 正在热映
    var hotURL = '/v2/movie/in_theaters' + "?start=0&count=3";
    // 即将上映
    var comingURL = '/v2/movie/coming_soon' + "?start=0&count=3";
    // top250
    var topURL = '/v2/movie/top250' + "?start=0&count=3";
    //函数传入第二个参数，分辨每一行对应的是什么电影
    this.getMoviesList(hotURL, 'hotMovies', '正在热映');
    this.getMoviesList(comingURL, 'comingMovies', '即将上映');
    this.getMoviesList(topURL, 'topMovies', 'Top250');
  },
  onBindConfirm:function(e){
   
    var text = e.detail.value;
    console.log(typeof e.detail.value);
    // /v2/movie/search?q=张艺谋
    var url =  '/v2/movie/search?q=' + text;
    this.getMoviesList(url,"searchResult","搜索");
  },
  onBindFocus:function(e){
    console.log('focus');
    this.setData({
      searchContainer:true,
      movieDetail:false
    });
  },
  onCancelSearch:function(e){
    console.log('cancel');
    this.setData({
      searchContainer: false,
      movieDetail:true
    });
  },
  getMoviesList: function (url, flag, catogeryTitle) {
    var that = this;
    wx.request({
      url: app.globalData.doubanAPI + url,
      method: 'GET',
      header: {
        // 填写appalication/json会报错，为空或为其它的不报错，豆瓣API的问题
        'Content-Type': 'appalication/xml'
      },
      // 获取数据成功
      success: function (res) {
        // console.log(res);
        that.processDoubanMovies(res.data.subjects, flag, catogeryTitle);
      },
      // 获取数据失败
      fail: function () {
        console.log("failed");
      }
    })
  },
  processDoubanMovies: function (data, flag, catogeryTitle) {
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
    // console.log(movies);
    //使用对象的动态特性
    var ready = {};
    ready[flag] = {
      catogeryTitle: catogeryTitle,
      movies: movies
    }
    this.setData(ready);
  },
  onMoreTap:function(event){
    //跳转到电影分类详情页面
    var category = event.currentTarget.dataset.category;
    // console.log(category);
    wx.navigateTo({
      //传递标题，从而根据正在热映、即将上映和top250分别加载不同的详情页
      url: 'moreMovies/moreMovies?category=' + category
    })
  },
  onMovieTap:function(event){
    //跳转到每个电影详情页面
    var movieId = event.currentTarget.dataset.movieId;
    // console.log(category);
    wx.navigateTo({
      //传递电影 Id
      url: 'movie-detail/movie-detail?id=' +movieId
    })
  }
})