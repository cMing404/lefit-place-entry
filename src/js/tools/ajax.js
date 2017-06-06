import superAgent from 'superagent'
import mockData from './mock'
let develop = false
function isJson (obj) {
  return (typeof obj === 'undefined' ? 'undefined' : typeof (obj)) === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length // true 是 false不是
}
function jumpNaviveLogin (url) {
  let bridge = window.LeFitWebViewJavascriptBridge;
  bridge && bridge.callHandler('nativeLogin', {
    nextPageUrl: url
  }, function (data) {
  })
}
export default (url, data, funOrObj, err, fail) => {
  let req = {
    url: url || '',
    data: data || null,
    succCode: 200,
    methods: 'POST',
    timeout: 60000
  }
  if (arguments.length > 2 && Object.prototype.toString.call(funOrObj) === '[object Object]') {
    req.succ = funOrObj.succ || null
    req.err = funOrObj.err || null
    req.fail = funOrObj.fail || null
    if (funOrObj.timeout) req.timeout = funOrObj.timeout
    if (funOrObj.methods) req.methods = funOrObj.methods
    if (funOrObj.succCode) req.succCode = funOrObj.succCode
  } else if (arguments.length > 2 && Object.prototype.toString.call(funOrObj) === '[object Function]') {
    req.succ = funOrObj || null
    req.err = err || null
    req.fail = fail || null
  }
  superAgent(req.methods, req.url)
    .set('X-Requested-With', 'XMLHttpRequest')
    .send(req.data)
    .timeout(req.timeout)
    .end((err, res) => {
      if (develop) {
        req.succ(mockData)
        return false
      }
      // 直接了当
      if (err && err.timeout) { // 如果发生网络或其他错误
        req.fail(err)
        console.log('请求错误' + new Date())
        console.dir(res.xhr)
        return
      }
      if (res.body && isJson(res.body)) { // 如果返回的body体是一个json  基本就说明返回成功了
        if (res.body.code === 200) {
          req.succ && req.succ(res.body.data, res.body)
        } else if (res.body.code === undefined) {
          req.succ(res.body)
        } else if (res.body.code === 5000) {
          req.fail(res.body)
        }else if (res.body.code === 10010 || res.body.code === 10001) {
          if (window.isLefitApp) {
            jumpNaviveLogin(window.location.href)
            return
          }
          if (process.env.NODE_ENV === 'development') {
            window.location.href = 'http://d.leoao.com/wap/wap_login?from=' + encodeURIComponent(window.location.href)
            return false
          }
          window.location.href = '/coach/login?params=' + encodeURIComponent(window.location.href )
          return
        } else {
          // 当后端返回的code码不是200 也不是401的时候输出 容易debug
          req.err && req.err(res.body)
          console.log(res.body)
        }
      } else {
        // 如果返回的bodynull或者 不是json 基本就说明发生错误了
        req.fail && req.fail(res)
        console.log('请求错误' + new Date())
        console.log(res.xhr)
      }
    })
}
