var app = getApp();
var tools = require('../../../tools/tools.js');
Page({

  data: {
    movie:{}
  },
  onLoad: function (options) {
    var movieId = options.id;
    var url = "/v2/movie/subject/" + movieId;
    this.getMoviesList(url,'movieDetail','电影详情');
  },
  getMoviesList: function (url, flag, catogeryTitle) {
    var that = this;
    wx.request({
      url: app.globalData.doubanAPI + url,
      method: 'GET',
      header: {
        // 填写appalication/json会报错，为空或为其它的不报错，豆瓣API的问题
        'Content-Type': 'json'
      },
      // 获取数据成功
      success: function (res) {
        console.log(res);
        that.processDouban(res.data, flag, catogeryTitle);
      },
      // 获取数据失败
      fail: function () {
        console.log("failed");
      }
    })
  },
  processDouban: function (data, flag, catogeryTitle){
    console.log(data);
    if(!data){
        return ;
    }
    var director = {
        id:'',
        name:'',
        avatars:{},
        alt:''
    };
    if(data.directors){
        if(data.directors[0].avatars){
              director.avatars = data.directors[0].avatars;
        }
        director.id = data.directors[0].id;
        director.name = data.directors[0].name;
        director.alt = data.directors[0].alt;
    }
    var movie = {
        director:director,
        country:data.countries,
        genre:data.genres.join('、'),
        rating:tools.convertStarsToArray(data.rating.stars),
        image:data.images.large,
        comment:data.comments_count,
        collect:data.collect_count
    };
    this.setData({
      movie:movie
    });
  }
})