import Vue from "vue";

import Header from "./components/header/Header.vue";
import ContentHeader from "./components/header/ContentHeader.vue";
import Footer from "./components/footer/Footer.vue";
import Markdown from "./components/markdown/Markdown.vue";
import Tooltip from "./components/tooltip/Tooltip.vue";
import "./mixins/LocaleMixin";

const VlUiVueComponents = require("@govflanders/vl-ui-vue-components");
const { VlModalToggle } = require("@govflanders/vl-ui-vue-components");

// configuration of the built-in validator
const validatorConfig = {
    inject: true,
    locale: "nl",
  };

// install the component library with config
Vue.use(VlUiVueComponents, {
    validation: validatorConfig,
  });
  
// Vue.use(VueMarkDown);
Vue.component("y-markdown", Markdown);

Vue.directive("vl-modal-toggle", VlModalToggle);

Vue.component("vl-header", Header);
Vue.component("vl-my-content-header", ContentHeader);
Vue.component("vl-footer", Footer);
Vue.component("vl-tooltip", Tooltip)