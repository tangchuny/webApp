//index.js
var app = getApp()

Page({
    data:{
    	//地图的宽高
    mapHeight: '100%',
    mapWidth: '100%',
    mapTop: '0',
    //用户当前位置
    point: {
      latitude: 0,
      longitude: 0
    },
    //单车标注物
    markers: [{
    	latitude: 22.844021,
        longitude: 108.331041,
        iconPath: "../../images/location.png",
        id: 0,
        width: 40*wx.getStorageSync("kScreenW"),
        height: 40*wx.getStorageSync("kScreenW")
    },{
    	longitude: 108.331077,
        latitude: 22.846969,
        iconPath: "../../images/location.png",
        id: 1,
        width: 40*wx.getStorageSync("kScreenW"),
        height: 40*wx.getStorageSync("kScreenW")
    },{
    	longitude: 108.327537,
        latitude:  22.84527,
        iconPath: "../../images/location.png",
        id: 2,
        width: 40*wx.getStorageSync("kScreenW"),
        height: 40*wx.getStorageSync("kScreenW")
    },{
    	longitude: 108.326963,
        latitude:  22.844188,
        iconPath: "../../images/location.png",
        id: 3,
        width: 40*wx.getStorageSync("kScreenW"),
        height: 40*wx.getStorageSync("kScreenW")
    },{
    	longitude: 108.329981,
        latitude:  22.846852,
        iconPath: "../../images/location.png",
        id: 4,
        width: 40*wx.getStorageSync("kScreenW"),
        height: 40*wx.getStorageSync("kScreenW")
    }],
    //当前地图的缩放级别
    mapScale: 16,
    //地图上不可移动的控件
    controls:[{
            id: 11,
            position: {
              left:10*wx.getStorageSync("kScreenW"),
              top:523*wx.getStorageSync("kScreenH"),
              width:40*wx.getStorageSync("kScreenW"),
              height:40*wx.getStorageSync("kScreenW")
            },
            iconPath: '../../images/control-ico.png',
            clickable: true,
         },{
            id: 12,
            position: {
              left:10*wx.getStorageSync("kScreenW"),
              top:480*wx.getStorageSync("kScreenH"),
              width:40*wx.getStorageSync("kScreenW"),
              height:40*wx.getStorageSync("kScreenW")
            },
            iconPath: '../../images/success.png',
            clickable: true,
         },{
            id: 13,
            position: {
              left:10*wx.getStorageSync("kScreenW"),
              top:450*wx.getStorageSync("kScreenH"),
              width:40*wx.getStorageSync("kScreenW"),
              height:40*wx.getStorageSync("kScreenW")
            },
            iconPath: '../../images/success.png',
            clickable: true,
         }]
    },
    onReady: function (e) {
      //通过id获取map,然后创建上下文
      this.mapCtx = wx.createMapContext("myMap");
    },
    //定位到用户当前位置
	getUserCurrentLocation: function () {
	    this.mapCtx.moveToLocation();
	    this.setData({
	      'mapScale': 16
	    })
	},
	    //控件的点击事件
    controltap: function (e) {
	    console.log(e);
	    var that = this;
	    var id = e.controlId;
	    if (id == 11) {
	      //定位当前位置
	      that.getUserCurrentLocation()
	    }
	},
	  regionchange(e) {
	   console.log(e);
	  },
	  markertap(e) {
	     console.log(e.markerId);
	      //使用说明
	      wx.navigateTo({
	      	url: '../logs/logs'
	      })
	  },
  
	  //页面加载的函数
	onLoad: function () {
  		console.log('onLoad')
	    var that = this
	    //获取用户的当前位置位置
	    wx.getLocation({
	      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用wx.openLocation 的坐标
	      success: function(res){
	        // success
	        var latitude = res.latitude
	        var longitude = res.longitude
	        var point= {
	          latitude: latitude,
	          longitude: longitude
	        };
	        that.setData({
	          'point': point
	         })
	      }
	    })
	},
  	onReady: function (e) {
      //通过id获取map,然后创建上下文
      this.mapCtx = wx.createMapContext("myMap");
    },
    //页面展示
	onShow:function(){
		
	},
  	onHide:function(){
      // 生命周期函数--监听页面隐藏
      console.log('onHide')
    },
    onUnload:function(){
      // 生命周期函数--监听页面卸载
      console.log('onUnload')
    },
    onPullDownRefresh: function() {
      // 页面相关事件处理函数--监听用户下拉动作
      console.log('onPullDownRefresh')
    },
    onReachBottom: function() {
      // 页面上拉触底事件的处理函数
      console.log('onReachBottom')
    },
    onShareAppMessage: function() {
      // 用户点击右上角分享
      console.log('onShareAppMessage')
      return {
        desc: '分享给大家看看吧', // 分享描述
        path: '/map/map' // 分享路径
      }
    }
})