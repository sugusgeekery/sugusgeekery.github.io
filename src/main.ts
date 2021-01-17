import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// import "lib-flexible";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import "./stylus/common.styl";

Vue.config.productionTip = false;

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
