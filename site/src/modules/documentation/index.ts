import Root from "./views/Root.vue";
import Documentation from "./views/Documentation.vue";
import EditEndPointsGrar from "./views/EditEndPointsGrar.vue";
import EditEndPointsValidatiesGrar from "./views/EditEndPointsValidatiesGrar.vue";
import StatusFlowGrar from "./views/StatusFlowGrar.vue";
import EditEndPointsWr from "./views/EditEndPointsWr.vue";
import EditEndPointsValidatiesWr from "./views/EditEndPointsValidatiesWr.vue";
import StatusFlowWr from "./views/StatusFlowWr.vue";
import NotificationsBaseRegistries from "./views/NotificationsBaseRegisties.vue";
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
      },
      {
        path: "editendpointswr",
        component: EditEndPointsWr,
        name: "editendpointswr",
      },
      {
        path: "editendpointswr/validaties",
        component: EditEndPointsValidatiesWr,
        name: "validations"
      },
      {
        path: "statusflowwr",
        component: StatusFlowWr,
        name: "statusflowwr"
      },
      {
        path: "meldingenbasisregisters",
        component: NotificationsBaseRegistries,
        name: "notificationsbasisregisters"
      }
    ],
  },
];

export default DocumentationRoutes;
