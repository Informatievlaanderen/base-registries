import Root from "./views/Root.vue";
import ApiKey from "./views/ApiKey.vue";

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
    ],
  },
];

export default ApiKeyRoutes;
