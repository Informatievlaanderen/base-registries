import Vue from "vue";
import VueI18n from "vue-i18n";
import router from "./router";
import store from "./store";

import VlCore, { i18n } from "@vl/vl-ui-core/src/vue";
import VlUtil from "@vl/vl-ui-util/src/vue";

import { VlTitle } from "@vl/vl-ui-titles/src/vue";
import { VlSpotlight } from "@vl/vl-ui-spotlight/src/vue";

import {
  VlHeroNavigation,
  VlHeroNavigationItem
} from "@vl/vl-ui-hero-navigation/src/vue";

import App from "./App.vue";

Vue.component("vl-title", VlTitle);
Vue.component("vl-spotlight", VlSpotlight);
Vue.component("vl-hero-navigation", VlHeroNavigation);
Vue.component("vl-hero-navigation-item", VlHeroNavigationItem);

Vue.use(VlCore);
Vue.use(VlUtil);
Vue.use(VueI18n);

const messages = i18n;
const vlI18n = new VueI18n({
  locale: "nl-BE",
  messages
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vlI18n,
  render: h => h(App)
}).$mount("#app");
