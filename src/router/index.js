import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes.js';
import store from '@/store';
import {
  getToken
} from '@/util/auth';
import {
  Message
} from 'view-design';
Vue.use(Router);

const router = new Router({
  routes
});
router.beforeEach((to, from, next) => {
  let login =
    to.name == '登录页' || to.name == '登录页货运' || to.name == '登录页客运' || to.name == '欢迎页';
  let token = getToken();
  if (login && token && store.getters.userInfo.accessToken) {
    // next({ path: '/guide' });
    next({
      path: '/daily'
    })
  } else if (!login && !token) {
    if (store.getters.userInfo.accessToken !== token) {
      window.location.reload();
    }
    setTimeout(() => {
      Message.warning({
        content: '登录失效，请重新登录',
        duration: 3
      });
    }, 1000);
    store.dispatch('LogOut').then(() => {
      setTimeout(() => {
        next({
          path: '/login'
        });
      }, 800);
    });
    // next({ path: '/loginByDG' });
  } else {
    next();
  }
});
export default router;