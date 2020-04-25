// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/reset.scss'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import http from "./../https"
import moment from "moment"
import {BASE_URL} from "./global/util";

import FastClick from 'fastclick'
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

// Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(http);

Vue.filter('formatTime',(v)=>{

  return moment(v).format("YYYY-MM-DD hh:mm:ss")
})

Vue.filter('formatTimeNoClock',(v)=>{
    return moment(v).format("YYYY-MM-DD")
})
Vue.prototype.haveNotAuth = function () {
    alert('你没有该权限哦')
    return;
}
Vue.prototype.imgUrlFormat = function(url){
    return `${BASE_URL}/${url}`
}
const errors = []
const getTimestamp = () => {
    return new Date()
}
window.addEventListener('error', (event) => {
    console.log(event);
    errors.push({time: getTimestamp(), content: event.target,path:event.path})
},true)
Vue.config.errorHandler = error => {
    console.log(error);
    errors.push({time: getTimestamp(), content: error.stack})
}

window.onerror = (message, source, lineno, colno, error) => {
    errors.push({time: getTimestamp(), content: error.stack})
    return true
}



setInterval(()=>{
    // if(errors.length > 0){
    //     console.log(errors);
    // }
},3000)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
