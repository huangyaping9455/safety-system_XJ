import {
  getGuidePage,
  getPermission,
  loginByUsername,
  getUserInfo,
  logout,
  getMenuAB
} from '@/api/user';
import {
  checkPost
} from '@/api/system';
import {
  setToken,
  removeToken
}
from '@/util/auth';
import {
  config
} from '@/const/config';

const recursionSort = (arr) => {
  arr.sort((a, b) => a.sort - b.sort);
  arr.forEach((item) => {
    // 运维端页面 -- 内嵌 iframe
    if (item.routerType == 1) {
      item.iframePath = item.path;
      item.path = '/daily/iframe/' + item.path.split('/').pop();
    }
    let children = item.children;
    if (children && children.length > 0) {
      recursionSort(children);
    }
  });
};

const user = {
  state: {
    userInfo: {},
    userPost: [],
    account: {},
    permission: {},
    token: '',
    menu: []
  },
  mutations: {
    SET_TOKEN(state, token) {
      setToken(token);
      state.token = token;
    },
    SET_USERPOST(state, userPost) {
      state.userPost = userPost;
    },
    SET_PERMISSION(state, permission) {
      state.permission = permission;
    },
    SET_ACCOUNT(state, account) {
      state.account = account;
    },
    SET_USERIFNO(state, userInfo) {
      state.userInfo = userInfo;
    },
    SET_MENU(state, menu) {
      recursionSort(menu);
      state.menu = menu;
    }
  },
  actions: {
    LogOut({
      commit
    }) {
      commit('SET_TOKEN', '');
      commit('SET_MENU', []);
      commit('SET_USERPOST', []);
      commit('SET_USERIFNO', {});
      commit('SET_ACCOUNT', {});
      commit('SET_PERMISSION', {});
      removeToken();
      logout();
    },
    LoginByUsername({
      commit,
      dispatch
    }, userInfo) {
      return new Promise((resolve, reject) => {
        // 解码 地址栏参数 若 无参数账密为登录页填写值config.aesEncrypt(userInfo.username), config.aesEncrypt(userInfo.password), config.aesEncrypt(userInfo.vercode), config.aesEncrypt(0)
        let usName = ""
        let psd = ""
        if (window.location.search == "") {
          usName = config.aesEncrypt(userInfo.username);
          psd = config.aesEncrypt(userInfo.password);
        } else {
          usName = userInfo.username;
          psd = userInfo.password;
        }
        loginByUsername(usName, psd, config.aesEncrypt(userInfo.vercode), config.aesEncrypt(userInfo.type))
          .then((res) => {
            const data = res.data.data;
            commit('SET_ACCOUNT', userInfo);
            commit('SET_TOKEN', data.accessToken);
            commit('SET_USERIFNO', data);
            dispatch('GetUserPermission', data.postId);
            dispatch('GetUserPost', data.postId);
            dispatch('GetMenu', data.postId);
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    GetUserPermission({
      state,
      commit,
      id
    }) {
      return new Promise((resolve, reject) => {
        let postId = id || state.userInfo.postId;
        getPermission(postId)
          .then((res) => {
            const data = res.data.data;
            commit('SET_PERMISSION', data);
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    GetUserInfo({
      commit,
      dispatch
    }, id) {
      return new Promise((resolve, reject) => {
        getUserInfo(id)
          .then((res) => {
            const data = res.data.data;
            commit('SET_USERIFNO', data);
            dispatch('GetMenu', data.postId);
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    GetUserPost({
      state,
      commit,
      dispatch
    }, postId) {
      return new Promise((resolve) => {
        const id = postId || state.userInfo.postId;
        checkPost(id).then((res) => {
          const data = res.data.data;

          commit('SET_USERPOST', data);
          dispatch('GetMenu', id);
          resolve();
        });
      });
    },
    GetMenu({
      state,
      commit
    }, id) {
      return new Promise((resolve) => {
        let postId = id || state.userInfo.postId;
        getMenuAB(postId).then((res) => {
          const data = res.data.data;
          commit('SET_MENU', data);
          resolve(data);
        });
      });
    },
    getGuidePage({
      commit
    }) {
      getGuidePage().then((res) => {
        commit('SET_GUIDEPAGE', {
          login: res.data.login,
          idea: res.data.home,
          intor: res.data.profile
        });
      });
    }
  }
};

export default user;