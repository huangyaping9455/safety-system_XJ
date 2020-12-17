import Vue from 'vue';
import Vuex from 'vuex';
import common from './modules/common';
import dataCenter from './modules/data-center';
import user from './modules/user';
import getters from './getters';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const persistedState = createPersistedState({
  key: 'safety-system',
  storage: window.localStorage
});

const modules = {
  user,
  common,
  dataCenter
};
const plugins = [persistedState];
const strict = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({ modules, getters, strict, plugins });
