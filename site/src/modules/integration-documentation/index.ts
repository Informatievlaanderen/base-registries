import Root from "./views/Root.vue";
import IntegrationDocumentation from "./views/IntegrationDocumentation.vue";
import IntegrationDocumentationGrar from "./views/IntegrationDocumentationGrar.vue";
import IntegrationDocumentationWr from "./views/IntegrationDocumentationWr.vue";

export const IntegrationDocumentationRoutes = [
    {
        path: "/integratie-documentatie",
        component: Root,
        meta: {},
        children: [
            {
                path: "",
                component: IntegrationDocumentation,
                name: "integration-documentatie"
            },
            {
                path: "grar",
                component: IntegrationDocumentationGrar,
                name: "integration-documentatie-grar"
            },
            {
                path: "wr",
                component: IntegrationDocumentationWr,
                name: "integration-documentatie-wr"
            },
        ],
    },
];

export default IntegrationDocumentationRoutes;
