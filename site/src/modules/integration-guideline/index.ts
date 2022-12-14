import Root from "./views/Root.vue";
import IntegrationGuideline from "./views/IntegrationGuideline.vue";

export const IntegrationGuidelineRoutes = [
    {
        path: "/integratie-handleiding",
        component: Root,
        meta: {},
        children: [
            {
                path: "",
                component: IntegrationGuideline,
                name: "integration-guidelines"
              },
        ],
    },
];

export default IntegrationGuidelineRoutes;
