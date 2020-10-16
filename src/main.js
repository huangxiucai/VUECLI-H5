import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import { Button,Icon,Toast,Dialog} from 'vant';
Vue.use(Button).use(Icon).use(Toast).use(Dialog)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
