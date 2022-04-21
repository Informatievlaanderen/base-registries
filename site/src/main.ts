import Vue from "vue"
import App from "./App.vue"
import router from "./router";
import "./services"
import "./core";
import i18n from "./services/i18n";

Vue.config.productionTip = false
const initialize = async () => {
  await i18n.init();
  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app');
}
initialize();