import Vue from 'vue'
import App from './App'
import store from './store'
Vue.config.productionTip = false

import uView from "uview-ui";
Vue.use(uView);

App.mpType = 'app'

const app = new Vue({
    ...App,
	 store
})

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js';
Vue.use(httpInterceptor, app);

import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

// 初始化通信公匙
store.dispatch('app/initPublicKey').then((res) => {
	app.$mount()
})
