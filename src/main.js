import Vue from 'vue' // ES6 导入方式
import App from './App.vue' // 导入根组件App
import hah from './hah.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

new Vue({
  router, // this.$router === router
  store,
  render: h => h(App) // vue支持的新写法
}).$mount('#app')

// var obj = {
//   name: 'kerwin',
//   age: 100
// }
// console.log(obj)
