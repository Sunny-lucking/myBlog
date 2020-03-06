import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authList:[],
    tagsList:[],
    LatestList:[]
  },
  mutations: {
      setAuthList(state,authList){
          state.authList = authList
      },
      setTagList(state,tagsList){
          state.tagsList = tagsList
      },
      setLatestList(state,LatestList){
          state.LatestList = LatestList
      }
  },
  actions: {
  },
  modules: {
  }
})
