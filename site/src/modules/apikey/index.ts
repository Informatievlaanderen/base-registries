import Root from "./views/Root.vue";
import ApiKey from "./views/ApiKey.vue";
import ApiKeyLimits from "./views/Limits.vue";

export const ApiKeyRoutes = [
  {
    path: "/apikey",
    component: Root,
    meta: {},
    children: [
      {
        path: "",
        component: ApiKey,
        name: "apikey"
      },
      {
        path: "limieten",
        component: ApiKeyLimits,
        name: "apikeylimits"
      }
    ],
  },
];

export default ApiKeyRoutes;
