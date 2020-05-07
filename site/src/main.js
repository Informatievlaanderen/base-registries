import Vue from "vue";
import VueI18n from "vue-i18n";
import VueScrollTo from "vue-scrollto";
import VueMarkdown from "vue-markdown";

import router from "./router";
import store from "./store";

import VlCore, { i18n } from "@vl/vl-ui-core/src/vue";
import VlUtil from "@vl/vl-ui-util/src/vue";

import { VlAgendaItem } from "@vl/vl-ui-agenda-item/src/vue";
import { VlAlert } from "@vl/vl-ui-alert/src/vue";
import { VlContactData } from "@vl/vl-ui-contact-data/src/vue";
import { VlDataTable } from "@vl/vl-ui-data-table/src/vue";
import { VlDoormat } from "@vl/vl-ui-doormat/src/vue";
import { VlIcon } from "@vl/vl-ui-icon/src/vue";
import { VlIntroduction } from "@vl/vl-ui-introduction/src/vue";
import { VlLink } from "@vl/vl-ui-link/src/vue";
import { VlLoader } from "@vl/vl-ui-loader/src/vue";
import { VlSpotlight } from "@vl/vl-ui-spotlight/src/vue";
import { VlTitle } from "@vl/vl-ui-titles/src/vue";
import { VlTooltip } from "@vl/vl-ui-tooltip/src/vue";
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

Vue.component("vl-agenda-item", VlAgendaItem);
Vue.component("vl-alert", VlAlert);
Vue.component("vl-data-table", VlDataTable);
Vue.component("vl-contact-data", VlContactData);
Vue.component("vl-doormat", VlDoormat);
Vue.component("vl-icon", VlIcon);
Vue.component("vl-introduction", VlIntroduction);
Vue.component("vl-link", VlLink);
Vue.component("vl-loader", VlLoader);
Vue.component("vl-spotlight", VlSpotlight);
Vue.component("vl-title", VlTitle);
Vue.directive("vl-tooltip", VlTooltip);
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
Vue.use(VueScrollTo);

Vue.component("vue-markdown", VueMarkdown);

const messages = i18n;
const vlI18n = new VueI18n({
  locale: "nl-BE",
  messages
});

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    document.title = `Basisregisters Vlaanderen - ${nearestWithTitle.meta.title}`;
  } else {
    document.title = "Basisregisters Vlaanderen";
  }

  next();
});

new Vue({
  router,
  store,
  vlI18n,
  render: h => h(App)
}).$mount("#app");
