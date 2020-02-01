// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import infiniteScroll from 'vue-infinite-scroll'

Vue.config.productionTip = false
// Vue.use(axios)
Vue.use(ViewUI)
Vue.use(MintUI)
Vue.use(infiniteScroll)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
