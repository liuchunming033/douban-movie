// 获取本地文件post_data中的数据
var postData = require("../../data/post_data.js")
Page({
  data: {

  },
  onLoad: function () {
    /*var post = [
      {
        post_author: "/images/avatar/cute.png",
        post_date: "Nov 25 2016",
        post_title: "正是蟹肥时",
        post_image: "/images/avatar/crab.png",
        post_content: "螃蟹过道，横冲直撞",
        post_like_text: "95",
        post_like_text2: "62",
      },
      {
        post_author: "/images/avatar/cute.png",
        post_date: "Nov 25 2016",
        post_title: "正是蟹肥时",
        post_image: "/images/avatar/crab.png",
        post_content: "螃蟹过道，横冲直撞",
        post_like_text: "95",
        post_like_text2: "62",
      }
    ]*/
    /* 将数据设置data中 ,等价于在data中设置，data:{post_key:postData.postList}*/
    this.setData({
      post_key: postData.postList
    });
  },
  onPostTap: function (event) {
    /*获取自定义的postId*/
    var postId = event.currentTarget.dataset.postId;
    wx.navigateTo({
      /* 将id传递到post_detail.js文件中*/
      url: 'post_detail/post_detail?id=' + postId
    })
  },
  onSwiperTap: function (event) {
    /*获取自定义的postId*/
    //target才能获取image上的自定义属性
    var postId = event.target.dataset.postId;
    console.log(event);
    wx.navigateTo({
      /* 点击轮播图的图片，跳转到详情页*/
      url: 'post_detail/post_detail?id=' + postId
    })
  }
  //将下面的事件添加到swiper下面每个image中，就可以实现与上面事件相同的效果
  // onSwiperItemTap:function(event){
  //   var postId = event.currentTarget.dataset.postId;
  //   wx.navigateTo({
  //     /* 点击轮播图的图片，跳转到详情页*/
  //     url: 'post_detail/post_detail?id=' + postId
  //   })
  // }
})
