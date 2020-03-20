import {
  BOARDROOMS
} from '../../../utils/data.js';

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    meetingRooms: BOARDROOMS
  },
  onLoad() {
    this.setData({
      search: this.search.bind(this)
    })
  },
  search: function(value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([])
      }, 200)
    })
  },
  selectResult: function(e) {
    console.log('select result', e.detail)
  },
  viewDetail: (a) => {
    let chooseData = a.target && a.target.dataset
    let nowDay = new Date
    wx.request({
      url: 'http://127.0.0.1:8888',
      method: 'POST',
      dataType: 'json',
      data: {
        roomId: chooseData.id,
        date: nowDay.toLocaleDateString()
      },
      success: rsp => {
        this.setData({
          showLoading: false
        })
        console.log(res.data)
      }
    })
    console.log(chooseData)
  },
  goReserve: (a) => {
    let chooseData = a.target && a.target.dataset
    wx.navigateTo({
      url: '../meetingDetails/details',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', 
        { 
          roomId : chooseData.id,
          roomName: chooseData.name
        }
        )
      }
    })
  }
});