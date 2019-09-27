import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/informatie",
      name: "informatie",
      component: () =>
        import(/* webpackChunkName: "informatie" */ "./views/Informatie.vue")
    },
    {
      path: "/algemeen",
      name: "algemeen",
      component: () =>
        import(/* webpackChunkName: "algemeen" */ "./views/Algemeen.vue")
    },
    {
      path: "/aanleiding",
      name: "aanleiding",
      component: () =>
        import(/* webpackChunkName: "aanleiding" */ "./views/Aanleiding.vue")
    },
    {
      path: "/visie",
      name: "visie",
      component: () =>
        import(/* webpackChunkName: "visie" */ "./views/Visie.vue")
    },
    {
      path: "/release-notes",
      name: "release-notes",
      component: () =>
        import(/* webpackChunkName: "release-notes" */ "./views/ReleaseNotes.vue")
    },
    {
      path: "/veelgestelde-vragen",
      name: "veelgestelde-vragen",
      component: () =>
        import(/* webpackChunkName: "veelgestelde-vragen" */ "./views/Faq.vue")
    }
  ]
});
