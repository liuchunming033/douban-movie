// 注册一个小程序
App({
  //保存全局数据
  globalData:{
    //设置全局音乐播放状态
    g_isMusicPlaying:false,
    g_MusicPostId:null,
    // 设置豆瓣API前缀
    doubanAPI:"https://api.douban.com",
    //http://gank.io/api/data/%E7%A6%8F%E5%88%A9/y/x?imageView2/0/w/100  x = 1 ~ 54 y = 1~10
    gankApi:'http://gank.io/api/data/%E7%A6%8F%E5%88%A9'
  }
})

