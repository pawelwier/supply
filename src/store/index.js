import { createStore } from 'vuex'

export default createStore({
  state: {
    popupContent: null,
    editedDemandId: null,
    editedOrderId: null,
  },
  mutations: {
    SET_POPUP_CONTENT(state, value) {
      state.popupContent = value
    },
    SET_EDITED_DEMAND_ID(state, value) {
      state.editedDemandId = value
    },
    SET_EDITED_ORDER_ID(state, value) {
      state.editedOrderId = value
    },
  },
  actions: {
    setPopupContent({commit}, value) {
      commit('SET_POPUP_CONTENT', value)
    },
    setEditedDemandId({commit}, value) {
      commit('SET_EDITED_DEMAND_ID', value)
    },
    setEditedOrderId({commit}, value) {
      commit('SET_EDITED_ORDER_ID', value)
    },
  },
  getters: {
    getPopupContent: state => state.popupContent,
    getEditedDemandId: state => state.editedDemandId,
    getEditedOrderId: state => state.editedOrderId,
  }
})
