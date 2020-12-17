import { getGuidePage } from '@/api/user';

const login = require('@/assets/guide/login-bg.png');
const idea = require('@/assets/guide/idea-bg.png');
const intor = require('@/assets/guide/intor-bg.png');

const user = {
  state: {
    guidePage: {
      login,
      idea,
      intor
    }
  },
  getters: {},
  mutations: {
    SET_GUIDEPAGE(state, page) {
      state.guidePage.login = Object.assign(state.guidePage.login, page);
    }
  },
  actions: {
    getGuidePage({ commit }) {
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
