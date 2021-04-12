import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./stylus/common.styl";
// import "lib-flexible";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import Contextmenu from "vue-contextmenujs";
Vue.use(Contextmenu);

import Directives from "@/directives";
Vue.use(Directives);

Vue.config.productionTip = false;

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
