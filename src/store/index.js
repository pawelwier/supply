import { createStore } from 'vuex'

export default createStore({
  state: {
    popupContent: null,
  },
  mutations: {
    SET_POPUP_CONTENT(state, value) {
      state.popupContent = value
    },
  },
  actions: {
    setPopupContent({commit}, value) {
      commit('SET_POPUP_CONTENT', value)
    },
  },
  getters: {
    getPopupContent: state => state.popupContent,
  }
})
