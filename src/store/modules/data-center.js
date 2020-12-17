import { Message } from 'view-design';
const dataCenter = {
  namespaced: true,
  state: {
    navs: [{ text: '超速报警', view: 'overspeedList' }],
    view: 'overspeedList'
  },
  getters: {
    currentNav(state) {
      return state.navs.find((v) => v.view == state.view);
    }
  },
  mutations: {
    openNav(state, item) {
      if (!item.view) return;
      if (item.text === '超速报警') {
        state.view = item.view;
        return;
      }
      if (
        state.navs.find((v) => v == item) == undefined &&
        state.navs.length > 6
      ) {
        Message.warning({
          content: '打开模块过多',
          duration: 3
        });
        return;
      }
      state.view = item.view;
      if (state.navs.find((v) => v == item) == undefined) {
        state.navs.push(item);
      }
    },
    closeNav(state, index) {
      state.navs.splice(index, 1);
      state.view = state.navs[index - 1].view;
    },
    initNavs(state) {
      state.navs = [{ text: '超速报警', view: 'overspeedList' }];
      state.view = 'overspeedList';
    }
  }
};

export default dataCenter;
