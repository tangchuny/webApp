//index.js
import {
	requestLogin,
	verifySession
} from '../../service/login';
//获取应用实例
var app = getApp()
Page({
	data: {
		
		userInfo: {}
	},
	onLoad: function() {
		const that = this;
		//调用应用实例的方法获取全局数据
		app.getUserInfo(function(userInfo) {
			//页面加载时候获取rd_session，校验接口判断rd_session是否有效
			try {
				let get_sid = wx.getStorageSync('sid') || '';
				if(get_sid) {
					//传get_rd_session到检验接口，成功则回调
					verifySession(get_sid, (data) => {
						if(data) {
							console.log('session有效！')
							//session有效，跳转都主页
							wx.navigateTo({
							  url: '../detail/detail',
							  success: function(res){
								// success
							  },
							  fail: function(res) {
								// fail
							  },
							  complete: function(res) {
								// complete
							  }
							})
						} else {
							console.log("session 无效！重新登陆！")
							that.LoginIndex(userInfo);
						}
					})
				} else {
					//rd_session不存在则需要重新登录
					that.LoginIndex(userInfo);
				}
			} catch(e) {
				console.log("get rd_session fail!");
			}

			//更新数据
			that.setData({
				userInfo: userInfo.userInfo
			})
		})

	},
	
	//登陆方法
	LoginIndex: function(userInfo) {
		let that = this;
		//构造参数
		let params = {
			code: userInfo.code,
			user_raw: userInfo.rawData,
			signature: userInfo.signature || 'signature_string',
		};
		requestLogin(params, (resl) => {
			if(resl){
				console.log("登陆成功！")
				//登陆成功
				wx.navigateTo({
				  url: '../detail/detail',
				  success: function(res){
					// success
				  },
				  fail: function(res) {
					// fail
				  },
				  complete: function(res) {
					// complete
				  }
				})
			}else{
				//更新数据
				console.log("登陆失败！");
			}
			
		});
	},
	//事件处理函数
	bindViewTap: function() {
		let nickName = this.data.userInfo.nickName;
		wx.navigateTo({
			url: '../logs/logs?nickName=' + nickName
		})
	}

})