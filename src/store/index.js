import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listing: {},
    loading: false,
    limit: 80,
    type: "top",
    defaultSub: "pics",
    target: {}
  },
  mutations: {
    SET_LISTING(state, listing) {
      state.listing = listing;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_TARGET(state, target) {
      state.target = {};
      state.target = target;
    }
  },
  actions: {
    async getListing(state, l) {
      state.commit("SET_LOADING", true);
      let actualPath = `https://www.reddit.com/r/${l}/${state.state.type}.json?limit=${state.state.limit}`;
      const res = await axios.get(actualPath);
      state.commit("SET_LISTING", res.data.data);
      state.commit("SET_LOADING", false);
    }
  },
  modules: {}
});
