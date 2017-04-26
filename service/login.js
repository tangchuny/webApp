import {
	LOGIN,
	VerifySession
} from '../common/api';

/*校验:verifySession
 * params：map类型（对象）     
 * cb: callback
 */
export function verifySession(reciveParam, cb) {
		//调用应用实例的方法获取全局数据
		const params = {
			rd_session: reciveParam
		};
		wx.request({
			url: VerifySession,
			data: params,
			method: 'POST',
			success: function(res) {
				console.log('request verify received: ', res);
				//保存校验结果的状态
				//wx.setStorageSync('valid_session', res.data.status);
				if(res.data.errCode=="0000") {
					console.log("session有效，校验成功！");
					typeof cb == 'function' && cb(true);
				} else {
					typeof cb == 'function' && cb(false, res.data.resultMsg);
				}
			}
		});
}

/*登陆请求:
 * params：map类型（对象）     
 * cb: callback
 */
export function requestLogin(params, cb) {
	//调用应用实例的方法获取全局数据
	console.log("params", params);
	wx.request({
		url: LOGIN,
		data: params,
		method: 'POST',
		success: function(res) {
			console.log('request login received: ', res);
			wx.setStorageSync('sid', res.data.resultData.sid);
			if(res.data.errCode=="0000") {
				typeof cb == 'function' && cb(true);
			} else {
				typeof cb == 'function' && cb(false, res.data.resultMsg);
			}
		}
	});

}