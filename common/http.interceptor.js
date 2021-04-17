// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token
// 同时，我们也可以在此使用getApp().globalData，如果你把token放在getApp().globalData的话，也是可以使用的
import {
	aesEncrypt,
	aesDecrypt
} from '@/js_sdk/encryption/utils';
const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'http://127.0.0.1:9999/',
		// 如果将此值设置为true，拦截回调中将会返回服务端返回的所有数据response，而不是response.data
		// 设置为true后，就需要在this.$u.http.interceptor.response进行多一次的判断，请打印查看具体值
		// originalData: true, 
		// 设置自定义头部content-type
		// header: {
		// 	'content-type': 'application/x-www-form-urlencoded'
		// }
	});
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {

		if (vm.$store.getters.aesEncryptKey) {
			// 将AES密匙（RSA加密后）放入请求头中
			config.header.Token = vm.$store.getters.aesEncryptKey;
			if (!config.data) {
				config.data = {};
			}
			// 将时间戳放入请求内容里面
			config.data.timetoken = new Date().getTime();
			// // 将请求内容字符串化，进行AES加密
			let data = aesEncrypt(JSON.stringify(config.data), vm.$store.getters.aesKey);
			// 将请求内容替换成加密后的字符串，如果你的请求内容是键值对类型，这里会出错的
			config.data = data;
		}
		return config;


	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		// 如果把originalData设置为了true，这里得到将会是服务器返回的所有的原始数据
		// 判断可能变成了res.statueCode，或者res.data.code之类的，请打印查看结果
		if (res.code == "200") {
			//这个说明是第一次获取加密参数的时候
			return res.data;
		} else {
			// AES解密
			let content = aesDecrypt(res,vm.$store.getters.aesKey);
			console.log(content)
			return JSON.parse(content)

		};
	}
}

export default {
	install
}
