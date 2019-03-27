import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import vueSmoothScroll from 'vue2-smooth-scroll';

import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

// set default config for Vue-Cookies
VueCookies.config('7d')
VueCookies.set('theme','default')
VueCookies.set('hover-time','1s')



import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;


Vue.use(vueSmoothScroll)
// Vue.prototype.$log = console.log.bind(console)

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
