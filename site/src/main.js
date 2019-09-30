import Vue from "vue";
import VueI18n from "vue-i18n";
import router from "./router";
import store from "./store";

import VlCore, { i18n } from "@vl/vl-ui-core/src/vue";
import VlUtil from "@vl/vl-ui-util/src/vue";

import { VlContactData } from "@vl/vl-ui-contact-data/src/vue";
import { VlIntroduction } from "@vl/vl-ui-introduction/src/vue";
import { VlLink } from "@vl/vl-ui-link/src/vue";
import { VlSpotlight } from "@vl/vl-ui-spotlight/src/vue";
import { VlTitle } from "@vl/vl-ui-titles/src/vue";
import { VlTypography } from "@vl/vl-ui-typography/src/vue";

import {
  VlHeroNavigation,
  VlHeroNavigationItem
} from "@vl/vl-ui-hero-navigation/src/vue";

import { VlLinkList, VlLinkListItem } from "@vl/vl-ui-link-list/src/vue";

import {
  VlProperties,
  VlPropertiesList,
  VlPropertiesLabel,
  VlPropertiesData
} from "@vl/vl-ui-properties/src/vue";

import {
  VlSideNavigation,
  VlSideNavigationList,
  VlSideNavigationItem
} from "@vl/vl-ui-side-navigation/src/vue";

import Header from "@/components/partials/header/Header.vue";
import Footer from "@/components/partials/footer/Footer.vue";

import App from "./App.vue";

Vue.component("vl-contact-data", VlContactData);
Vue.component("vl-introduction", VlIntroduction);
Vue.component("vl-link", VlLink);
Vue.component("vl-spotlight", VlSpotlight);
Vue.component("vl-title", VlTitle);
Vue.component("vl-typography", VlTypography);

Vue.component("vl-hero-navigation", VlHeroNavigation);
Vue.component("vl-hero-navigation-item", VlHeroNavigationItem);

Vue.component("vl-link-list", VlLinkList);
Vue.component("vl-link-list-item", VlLinkListItem);

Vue.component("vl-properties", VlProperties);
Vue.component("vl-properties-list", VlPropertiesList);
Vue.component("vl-properties-label", VlPropertiesLabel);
Vue.component("vl-properties-data", VlPropertiesData);

Vue.component("vl-side-navigation", VlSideNavigation);
Vue.component("vl-side-navigation-list", VlSideNavigationList);
Vue.component("vl-side-navigation-item", VlSideNavigationItem);

Vue.component("vl-header", Header);
Vue.component("vl-footer", Footer);

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
