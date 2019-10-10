import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home/Home.vue";

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
      path: "/versies",
      name: "versies",
      component: () =>
        import(/* webpackChunkName: "versies" */ "./views/Versions/Versions.vue")
    },
    {
      path: "/implementatiemodel",
      name: "implementatiemodel",
      component: () =>
        import(/* webpackChunkName: "implementatiemodel" */ "./views/ImplementationModel.vue")
    },
    {
      path: "/implementatiemodel/adressenregister",
      name: "adressenregister",
      component: () =>
        import(/* webpackChunkName: "implementatiemodel-adressenregister" */ "./views/ImplementationModels/Address.vue")
    },
    {
      path: "/implementatiemodel/gebouwenregister",
      name: "gebouwenregister",
      component: () =>
        import(/* webpackChunkName: "implementatiemodel-gebouwenregister" */ "./views/ImplementationModels/Building.vue")
    },
    {
      path: "/release-notes",
      name: "release-notes",
      component: () =>
        import(/* webpackChunkName: "release-notes" */ "./views/ReleaseNotes/ReleaseNotes.vue")
    },
    {
      path: "/release-notes/:note",
      name: "release-note",
      component: () =>
        import(/* webpackChunkName: "release-note" */ "./views/ReleaseNotes/ReleaseNote.vue")
    },
    {
      path: "/veelgestelde-vragen",
      name: "veelgestelde-vragen",
      component: () =>
        import(/* webpackChunkName: "veelgestelde-vragen" */ "./views/Faq.vue")
    },
    {
      path: "/registers/gemeenten",
      name: "municipality-registry",
      component: () =>
        import(/* webpackChunkName: "registers-municipality-registry" */ "./views/BaseRegistries/Municipality.vue")
    },
    {
      path: "/registers/postinformatie",
      name: "postal-registry",
      component: () =>
        import(/* webpackChunkName: "registers-postal-registry" */ "./views/BaseRegistries/PostalInformation.vue")
    },
    {
      path: "/registers/straatnamen",
      name: "streetname-registry",
      component: () =>
        import(/* webpackChunkName: "registers-streetname-registry" */ "./views/BaseRegistries/StreetName.vue")
    },
    {
      path: "/registers/adressen",
      name: "address-registry",
      component: () =>
        import(/* webpackChunkName: "registers-address-registry" */ "./views/BaseRegistries/Address.vue")
    },
    {
      path: "/registers/gebouwen",
      name: "building-registry",
      component: () =>
        import(/* webpackChunkName: "registers-building-registry" */ "./views/BaseRegistries/Building.vue")
    },
    {
      path: "/registers/percelen",
      name: "parcel-registry",
      component: () =>
        import(/* webpackChunkName: "registers-parcel-registry" */ "./views/BaseRegistries/Parcel.vue")
    },
    {
      path: "/registers/wegen",
      name: "road-registry",
      component: () =>
        import(/* webpackChunkName: "registers-road-registry" */ "./views/BaseRegistries/Road.vue")
    },
    {
      path: "/registers/organisaties",
      name: "organisation-registry",
      component: () =>
        import(/* webpackChunkName: "registers-organisation-registry" */ "./views/BaseRegistries/Organisation.vue")
    },
    {
      path: "/registers/dienstverleningen",
      name: "publicservice-registry",
      component: () =>
        import(/* webpackChunkName: "registers-publicservice-registry" */ "./views/BaseRegistries/PublicService.vue")
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
