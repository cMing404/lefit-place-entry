import superAgent from 'superagent'
import tools from './tools'
import mockData from './mock'
let develop = true
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
      if (res.body && tools.isJson(res.body)) { // 如果返回的body体是一个json  基本就说明返回成功了
        if (res.body.code === 200) {
          req.succ(res.body.data)
        } else if (res.body.code === undefined) {
          req.succ(res.body)
        } else if (res.body.code === 401) {
          let selfUrl = encodeURIComponent(window.location.href)
          let userAgent = navigator.userAgent
          if (userAgent.search(/LEFIT/) !== -1) { // 如果在乐刻app执行登陆
            var bridge = window.LeFitWebViewJavascriptBridge
            bridge.callHandler('nativeLogin', {
              nextPageUrl: selfUrl
            }, function (res) {
              console.log('goods')
            })
            return
          }
          document.body.style.visibility = 'hidden'
          if (!tools.redirect) {
            tools.redirect = '/common/front/platform?from=' + selfUrl
            setTimeout(() => {
              window.location.href = tools.redirect
            }, 0)
          }
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
