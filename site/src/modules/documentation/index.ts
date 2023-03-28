import Root from "./views/Root.vue";
import Documentation from "./views/Documentation.vue";
import EditEndPointsGrar from "./views/EditEndPointsGrar.vue";
import EditEndPointsValidatiesGrar from "./views/EditEndPointsValidatiesGrar.vue";
import StatusFlowGrar from "./views/StatusFlowGrar.vue";
import ApiKey from "./views/ApiKey.vue";

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
        name: "editendpointsgrar",
      },
      {
        path: "editendpointsgrar/validaties",
        component: EditEndPointsValidatiesGrar,
        name: "validations"
      },
      {
        path: "statusflowgrar",
        component: StatusFlowGrar,
        name: "statusflowgrar"
      }
    ],
  },
];

export default DocumentationRoutes;
