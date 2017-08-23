Page({
  onLoad: function () {
    /*点击后，切换至post.wxml页面
    wx.redirectTo()重新导向主页面，没有返回按钮
    */
    setTimeout(function(){
      wx.switchTab({
        url: '/pages/posts/post',
      })
    },2000);
    // redirectTo不能跳转 bug
    // wx.redirectTo({
    //   url: '../posts/post',
    // });
    // console.log(12);
  }
})