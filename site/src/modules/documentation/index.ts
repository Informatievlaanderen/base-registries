import Root from "./views/Root.vue";
import Documentation from "./views/Documentation.vue";
import EditEndPointsGrar from "./views/EditEndPointsGrar.vue";

export const DocumentationRoutes = [
  {
    path: "/documentatie",
    component: Root,
    meta: {},
    children: [
      {
        path: "",
        component: Documentation,
        name: "documentation"
      },
      {
        path: "editendpointsgrar",
        component: EditEndPointsGrar,
        name: "editendpointsgrar"
      },
    ],
  },
];

export default DocumentationRoutes;
