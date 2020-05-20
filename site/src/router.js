import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/informatie',
      name: 'informatie',
      meta: {
        title: 'Informatie',
      },
      component: () =>
        import(/* webpackChunkName: "informatie" */ './views/Informatie.vue'),
    },
    {
      path: '/algemeen',
      name: 'algemeen',
      meta: {
        title: 'Algemeen',
      },
      component: () =>
        import(/* webpackChunkName: "algemeen" */ './views/Algemeen.vue'),
    },
    {
      path: '/aanleiding',
      name: 'aanleiding',
      meta: {
        title: 'Aanleiding',
      },
      component: () =>
        import(/* webpackChunkName: "aanleiding" */ './views/Aanleiding.vue'),
    },
    {
      path: '/visie',
      name: 'visie',
      meta: {
        title: 'Visie',
      },
      component: () =>
        import(/* webpackChunkName: "visie" */ './views/Visie.vue'),
    },
    {
      path: '/versies',
      name: 'versies',
      meta: {
        title: 'Versies',
      },
      component: () =>
        import(/* webpackChunkName: "versies" */ './views/Versions/Versions.vue'),
    },
    {
      path: '/implementatiemodel',
      name: 'implementatiemodel',
      meta: {
        title: 'Implementatiemodel',
      },
      component: () =>
        import(/* webpackChunkName: "implementatiemodel" */ './views/ImplementationModel.vue'),
    },
    {
      path: '/implementatiemodel/adressenregister',
      name: 'adressenregister',
      meta: {
        title: 'Implementatiemodel - Adressenregister',
      },
      component: () =>
        import(/* webpackChunkName: "implementatiemodel-adressenregister" */ './views/ImplementationModels/Address.vue'),
    },
    {
      path: '/implementatiemodel/gebouwenregister',
      name: 'gebouwenregister',
      meta: {
        title: 'Implementatiemodel - Gebouwenregister',
      },
      component: () =>
        import(/* webpackChunkName: "implementatiemodel-gebouwenregister" */ './views/ImplementationModels/Building.vue'),
    },
    {
      path: '/release-notes',
      name: 'release-notes',
      meta: {
        title: 'Release Notes',
      },
      component: () =>
        import(/* webpackChunkName: "release-notes" */ './views/ReleaseNotes/ReleaseNotes.vue'),
    },
    {
      path: '/release-notes/:note',
      name: 'release-note',
      meta: {
        title: 'Release Notes',
      },
      component: () =>
        import(/* webpackChunkName: "release-note" */ './views/ReleaseNotes/ReleaseNote.vue'),
    },
    {
      path: '/veelgestelde-vragen',
      name: 'veelgestelde-vragen',
      meta: {
        title: 'Veelgestelde Vragen',
      },
      component: () =>
        import(/* webpackChunkName: "veelgestelde-vragen" */ './views/Faq.vue'),
    },
    {
      path: '/registers/gemeenten',
      name: 'municipality-registry',
      meta: {
        title: 'Gegevensbronnen - Gemeentenregister',
      },
      component: () =>
        import(/* webpackChunkName: "registers-municipality-registry" */ './views/BaseRegistries/Municipality.vue'),
    },
    {
      path: '/registers/postinformatie',
      name: 'postal-registry',
      meta: {
        title: 'Gegevensbronnen - Postinformatieregister',
      },
      component: () =>
        import(/* webpackChunkName: "registers-postal-registry" */ './views/BaseRegistries/PostalInformation.vue'),
    },
    {
      path: '/registers/straatnamen',
      name: 'streetname-registry',
      meta: {
        title: 'Gegevensbronnen - Straatnamenregister',
      },
      component: () =>
        import(/* webpackChunkName: "registers-streetname-registry" */ './views/BaseRegistries/StreetName.vue'),
    },
    {
      path: '/registers/adressen',
      name: 'address-registry',
      meta: {
        title: 'Gegevensbronnen - Adressenregister',
      },
      component: () =>
        import(/* webpackChunkName: "registers-address-registry" */ './views/BaseRegistries/Address.vue'),
    },
    {
      path: '/registers/gebouwen',
      name: 'building-registry',
      meta: {
        title: 'Gegevensbronnen - Gebouwenregister',
      },
      component: () =>
        import(/* webpackChunkName: "registers-building-registry" */ './views/BaseRegistries/Building.vue'),
    },
    {
      path: '/registers/percelen',
      name: 'parcel-registry',
      meta: {
        title: 'Gegevensbronnen - Percelenregister',
      },
      component: () =>
        import(/* webpackChunkName: "registers-parcel-registry" */ './views/BaseRegistries/Parcel.vue'),
    },
    {
      path: '/registers/wegen',
      name: 'road-registry',
      meta: {
        title: 'Gegevensbronnen - Wegenregister',
      },
      component: () =>
        import(/* webpackChunkName: "registers-road-registry" */ './views/BaseRegistries/Road.vue'),
    },
    {
      path: '/registers/organisaties',
      name: 'organisation-registry',
      meta: {
        title: 'Gegevensbronnen - Organisatieregister',
      },
      component: () =>
        import(/* webpackChunkName: "registers-organisation-registry" */ './views/BaseRegistries/Organisation.vue'),
    },
    {
      path: '/registers/dienstverleningen',
      name: 'publicservice-registry',
      meta: {
        title: 'Gegevensbronnen - Dienstverleningsregister',
      },
      component: () =>
        import(/* webpackChunkName: "registers-publicservice-registry" */ './views/BaseRegistries/PublicService.vue'),
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
