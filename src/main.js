import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import vueSmoothScroll from 'vue2-smooth-scroll';

Vue.config.productionTip = false;


Vue.use(vueSmoothScroll)
// Vue.prototype.$log = console.log.bind(console)

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
