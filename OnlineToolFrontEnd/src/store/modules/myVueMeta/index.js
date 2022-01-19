export default ({
  namespaced: true,
  state: {
    metaInfo: {
      title: "",
      keywords: "",
      description: ""
    }
  },
  mutations: {
    CHANGE_META_INFO(state, metaInfo) {
      state.metaInfo = metaInfo;
    }
  },
  actions: {},
  modules: {}
})
