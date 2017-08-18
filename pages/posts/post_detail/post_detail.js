//获取post_data.js数据
var postData = require("../../../data/post_data.js");
//获取全局js
var app = getApp();
Page({
  data: {
    // 音乐是否在播放
    isMusicPlaying: false
  },
  // 载入
  onLoad: function (event) {
    /*接收post.js传递过来的id*/
    // console.log(app);
    var postId = event.id;
    // console.log(postId);
    // 在onCollectTap事件中使用id值
    this.data.currentId = postId;
    // console.log(postData.postList[postId]);
    this.setData({
      postData: postData.postList[postId]
    });
    //获取缓存，缓存可以一直保存，即使关闭开发者工具，打开后仍然存在
    var postsCollected = wx.getStorageSync('posts_collected');
    // console.log(postsCollected);
    // 判断是否存在缓存，
    if (postsCollected) {
      // 有缓存，读取是否收藏的值
      var postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      })
    }
    else {
      //若没有缓存，创建一个
      var postsCollected = {};
      //将获取对应页面的是否收藏赋值给判断值
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }

    //判断页面之前的播放状态，globalData
    if (app.globalData.g_isMusicPlaying && app.globalData.g_MusicPostId == postId) {
      // 若之前在播放，继续播放
      this.setData({
        isMusicPlaying: true
      });
    }
    this.setMonitor();
    // 否则什么都不做 
  },
  setMonitor: function () {
    var that = this;
    // 设置音乐监听
    // 监听音乐的播放，主按钮能控制每个分页里的音乐播放
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isMusicPlaying: true
      });
      app.globalData.g_isMusicPlaying = true;
      app.globalData.g_MusicPostId = that.data.currentId;
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isMusicPlaying: false
      });
      app.globalData.g_isMusicPlaying = false;
      app.globalData.g_MusicPostId = null;
    });
    //音乐播放结束后，播放图标变成停止图标
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isMusicPlaying: false
      });
      app.globalData.g_isMusicPlaying = false;
      app.globalData.g_MusicPostId = null;
    });
  },
  // 收藏
  onCollectTap: function () {
    // 获取缓存
    var postsCollected = wx.getStorageSync('posts_collected');
    // console.log(postsCollected);
    var click = postsCollected[this.data.currentId];
    click = !click;
    // 赋值取反后的值
    postsCollected[this.data.currentId] = click;
    // 更新缓存
    wx.setStorageSync('posts_collected', postsCollected);
    // 更新值
    this.setData({
      collected: click
    })
    // 点击后显示消息提示框
    wx.showToast({
      title: click ? "收藏成功" : "取消成功",
      duration: 1000,
      // icon有效值是success,loading,,,默认success,loading显示动态的圈圈
      icon: 'success'
    })
  },
  // 分享
  onShareTap: function () {
    var items = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
      // 操作菜单条目
      itemList: items,
      // 设置颜色
      itemColor: "#0094ff",
      // 成功的回调函数
      success: function (res) {
        console.log(res.tapIndex);
        wx.showModal({
          // 提示标题
          title: '用户' + items[res.tapIndex],
          //  提示内容
          content: "用户是否取消?" + res.cancel + "暂时无法使用分享功能"
        })
      }
    });
  },

  onMusicTap: function () {
    // 点击的事那个页面
    var index = this.data.currentId;
    // console.log(index);
    // 音乐数据
    var music = postData.postList[index].music;
    // console.log(music);
    var isMusicPlaying = this.data.isMusicPlaying;
    // 判断音乐是否在播放
    if (isMusicPlaying) {
      // 正在播放，停止播放
      wx.pauseBackgroundAudio();
      // 更新播放状态
      this.setData({
        isMusicPlaying: false
      });
    }
    else {
      // 没有播放，播放音乐
      wx.playBackgroundAudio({
        // 设置音乐路径，标题，封面
        dataUrl: music.url,
        title: music.title,
        coverImgUrl: music.coverImg
      })
      // 更新播放状态
      this.setData({
        isMusicPlaying: true
      });
    }
  }
})

