import { createStore } from 'vuex'
import UniversalCookie from 'universal-cookie'

export default createStore({
  state: {
    popupContent: null,
    editedDemandId: null,
    editedOrderId: null,
    user: null,
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
    SET_USER(state, value) {
      state.user = value
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
    setUser({commit}, value) {
      commit('SET_USER', value)
      const {name, password} = value
      const cookies = new UniversalCookie()
      cookies.set('supply-login', name)
      cookies.set('supply-password', password)
    },
    logout({commit}) {
      commit('SET_USER', null)
      const cookies = new UniversalCookie()
      cookies.remove('supply-login')
      cookies.remove('supply-password')
    },
  },
  getters: {
    getPopupContent: state => state.popupContent,
    getEditedDemandId: state => state.editedDemandId,
    getEditedOrderId: state => state.editedOrderId,
    getUser() {
      const cookies = new UniversalCookie()
      const name = cookies.get('supply-login')
      const password = cookies.get('supply-password')
      return {
        name,
        password,
      }
    },
    isLoggedIn() {
      const cookies = new UniversalCookie()
      const name = cookies.get('supply-login')
      const password = cookies.get('supply-password')
      return [name, password].every(val => val)
    },
    supplyBases() {
      return process.env.VUE_APP_SUPPLY_BASES
    },
    supplyTeam() {
      return process.env.VUE_APP_SUPPLY_TEAM
    },
  }
})
