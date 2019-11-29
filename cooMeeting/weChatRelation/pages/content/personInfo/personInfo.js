//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'cooMeeting',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    submitTipShow: false,
    buttons: [{ text: '确定' }, { text: '取消' }],
    postData: {},
    tips: '请稍后',
    showLoading: false,
    animated: true
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log('userInfo', this.data.userInfo)

    this.setData({
      submitTipShow: true,
      postData: {
        name: e.detail.value.name,
        sex: e.detail.value.sex,
        groupName: e.detail.value.groupName,
        wxId: this.data.userInfo.nickName
      }
    })
    
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  redirectHome: function () {
    wx.navigateTo({
      url: '../content/homePage.html'
    })
  },
  tapDialogButton(e) {

    this.setData({
      submitTipShow: false,
      showLoading: true
    })

    if (e.detail.index === 0 ){
      wx.request({
        url: 'http://127.0.0.1:8888',
        method: 'POST',
        dataType: 'json',
        data: this.data.postData,
        success: rsp => {
          this.setData({
            showLoading: false
          })
          console.log(res.data)
        }
      })
    }
    else{
      this.setData({
        showLoading: false
      })
    }
  }
})
