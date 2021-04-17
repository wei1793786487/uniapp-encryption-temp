const getters = {
  publicKey: state => state.app.publicKey,
  aesKey: state => state.app.aesKey,
  aesEncryptKey: state => state.app.aesEncryptKey,
}
export default getters