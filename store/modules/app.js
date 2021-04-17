import { initAesKey, rsaEncrypt } from '@/js_sdk/encryption/utils';
const state = {
publicKey: null, // RSA加密公匙
aesKey: null, // AES加密密匙
aesEncryptKey: null, // AES加密密匙的RSA加密字符串
}
const mutations = {
SET_PUBLICKEY: (state, publicKey) => {
    state.publicKey = publicKey
},
SET_AESKEY: (state, aesKey) => {
    state.aesKey = aesKey
},
SET_AESENCRYPTKEY: (state, aesEncryptKey) => {
    state.aesEncryptKey = aesEncryptKey
},
}
const actions = {
// 初始化请求，获取RSA公匙
async initPublicKey({
    commit
}) {
    // 这里的AppApi是我事先封装好的网络请求，用来向服务器获取公匙的，你要替换成你的网络请求
	let res= await this._vm.$u.api.getpublicKey()
        // 存下RSA公匙
        commit('SET_PUBLICKEY', res)
        // 随机生成AES密匙，并存下来
        commit('SET_AESKEY', initAesKey())
        // 将AES密匙进行RSA加密，并存下来
        commit('SET_AESENCRYPTKEY', rsaEncrypt(state.aesKey, state.publicKey))
  
    return res;
}
}
export default {
namespaced: true,
state,
mutations,
actions
}