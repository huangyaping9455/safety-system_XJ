export default {
  userInfo: (state) => state.user.userInfo,
  userPost: (state) => state.user.userPost,
  menu: (state) => state.user.menu,
  style: (state) => state.user.style,
  permission: (state) => state.user.permission,
  topHeadMenu: (state) => state.common.topHeadMenu,
  currentMenu: (state) => state.common.currentMenu,
  pageParams: (state) => state.common.pageParams,
  postId: (state, getters) => getters.userInfo.postId,
  deptId: (state, getters) => getters.userInfo.deptId,
  deptName: (state, getters) => getters.userInfo.deptName
};