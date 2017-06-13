import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatMoney', function (num) {
  if (!num) {
    return 0
  }
  return (num / 100 + '').replace('.00', '')
})
Vue.filter('formatTime', function (t) {
  return moment(t * 1000).format('MMMDo HH:mm')
})