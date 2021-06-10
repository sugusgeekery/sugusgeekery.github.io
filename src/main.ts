import { createApp } from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';
import ElementPlus from 'element-plus';
import zhLocale from 'element-plus/lib/locale/lang/zh-cn';
import 'element-plus/lib/theme-chalk/index.css';

import Directives from "@/directives";


createApp(App).use(router).use(store).use(ElementPlus, { locale :zhLocale }).use(Directives).mount('#app');


// import Vue from "vue";
// import App from "./App.vue";
// import router from "./router";
// import store from "./store";

// import "./stylus/common.styl";
// // import "lib-flexible";

// import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
// Vue.use(ElementUI);

// import Contextmenu from "vue-contextmenujs";
// Vue.use(Contextmenu);

// import Directives from "@/directives";
// Vue.use(Directives);

// import preview from "vue-photo-preview";
// import "vue-photo-preview/dist/skin.css"
// var option = {
//   maxSpreadZoom: 1, // 控制预览图最大的倍数，默认是2倍，我这里改成了原图
//   fullscreenEl: false, //控制是否显示右上角全屏按钮
//   closeEl: false, //控制是否显示右上角关闭按钮
//   tapToClose: true, //点击滑动区域应关闭图库
//   shareEl: false, //控制是否显示分享按钮
//   zoomEl: false, //控制是否显示放大缩小按钮
//   counterEl: false, //控制是否显示左上角图片数量按钮
//   arrowEl: true,  //控制如图的左右箭头（pc浏览器模拟手机时）
//   tapToToggleControls: true, //点击应切换控件的可见性
//   clickToCloseNonZoomable: true //点击图片应关闭图库，仅当图像小于视口的大小时
// };
// Vue.use(preview, option);

// import animate from "animate.css";
// Vue.use(animate);

// Vue.config.productionTip = false;

// export default new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount("#app");