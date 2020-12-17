const common = {
  state: {
    topHeadMenu: {},
    currentMenu: {},
    pageParams: {},
  },
  mutations: {
    SET_CURRENT_MENU(state, menu) {
      state.currentMenu = menu;
    },
    SET_PAGE_PARAMS(state, params) {
      state.pageParams = params;
    },
    SET_TOPHEAD_MENU(state, menu) {
      state.topHeadMenu = menu;
    },
  }
};

export default common;