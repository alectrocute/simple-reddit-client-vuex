import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import VueProgressBar from "vue-progressbar";

Vue.use(VueProgressBar, {
  color: "#BE3CD3",
  failedColor: "red",
  height: "5px"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
