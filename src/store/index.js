import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listing: {},
    loading: false,
    limit: 100,
    type: "hot",
    defaultSub: "pics",
    favoriteSubs: ["pics", "EarthPorn", "wallpapers", "HighQualityGifs"],

    target: {},
    targetId: 0
  },
  mutations: {
    SET_LISTING(state, listing) {
      state.listing = listing;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_TARGET(state, p) {
      state.target = {};
      state.target = p;
    },
    SET_TYPE(state, t) {
      state.type = t;
    },
    SET_TARGET_ID(state, id) {
      state.targetId = id;
    },
    ADD_FAVORITE(state, f) {
      state.favoriteSubs.unshift(f);
    }
  },
  actions: {
    async bumpTargetIndex(state, factor = 1) {
      try {
        const obj =
          state.state.listing.children[state.state.targetId + factor].data;
        state.commit("SET_TARGET", obj);
        state.commit("SET_TARGET_ID", state.state.targetId + factor);
        return true;
      } catch (e) {
        state.commit("SET_TARGET", {});
        state.commit("SET_TARGET_ID", 0);
        return false;
      }
    },
    async getListing(state, l) {
      state.commit("SET_LOADING", true);
      if (state.state.favoriteSubs.indexOf(l) === -1)
        state.commit("ADD_FAVORITE", l);

      let actualPath = `https://www.reddit.com/r/${l}/${state.state.type}.json?limit=${state.state.limit}`;
      const res = await axios.get(actualPath);

      state.commit("SET_LISTING", res.data.data);
      state.commit("SET_LOADING", false);
      return true;
    }
  },
  modules: {}
});
