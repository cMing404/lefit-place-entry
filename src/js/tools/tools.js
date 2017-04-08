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
export default Tools