import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import {
  VlHeroNavigation,
  VlHeroNavigationItem
} from "@vl/vl-ui-hero-navigation/src/vue";

Vue.component("vl-hero-navigation", VlHeroNavigation);
Vue.component("vl-hero-navigation-item", VlHeroNavigationItem);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
