const util = {}
util.copyObj = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}

// base64转blob对象
util.convertBase64UrlToBlob = (urlData) => {
  let bytes = window.atob(urlData.split(',')[1]) // 去掉url的头，并转换为byte
  // 处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length)
  let ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], {type: 'image/png'})
}

util.isJson = (obj) => {
  return (typeof obj === 'undefined' ? 'undefined' : typeof (obj)) === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length // true 是 false不是
}

util.isArray = (arr) => {
  return Object.prototype.toString.call(arr).toLowerCase() === '[object array]' // true 是 false不是
}
export default {
  install: function (Vue, options) {
    Vue.prototype.$util = (name, data) => util[name] (data)
  }
}