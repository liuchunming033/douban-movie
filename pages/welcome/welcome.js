Page({
  onTap:function(){
    /*点击后，切换至post.wxml页面
    wx.redirectTo()重新导向主页面，没有返回按钮
    */
    wx.redirectTo({
      url: '../posts/post',
    })
  }
})