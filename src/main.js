// import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import './util/install-component';
// 图片预览
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)
Viewer.setDefaults({})

Vue.use(ElementUI);
Vue.use(router);
Vue.config.productionTip = false;
document.title = '安全标准化管理平台';

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');