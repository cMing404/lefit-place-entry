let Tools = {}
Tools.isJson = (obj) => {
  return (typeof obj === 'undefined' ? 'undefined' : typeof (obj)) === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length // true 是 false不是
}
  /**
   * 验证对象是否是数组
   *
   * @param {Array} arr
   * @returns
   */
Tools.isArray = (arr) => {
  return Object.prototype.toString.call(arr).toLowerCase() === '[object array]' // true 是 false不是
}
Tools.b64EncodeUnicode = (str) => {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1)
  }))
}
Tools.convertBase64UrlToBlob = (urlData) => {
  let bytes = window.atob(urlData.split(',')[1]) // 去掉url的头，并转换为byte
  // 处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length)
  let ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], {type: 'image/png'})
}
export default Tools