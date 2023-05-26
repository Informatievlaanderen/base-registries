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
                name: "integratie-documentatie"
            },
            {
                path: "grar",
                component: IntegrationDocumentationGrar,
                name: "integratie-documentatie-grar"
            },
            {
                path: "wr",
                component: IntegrationDocumentationWr,
                name: "integratie-documentatie-wr"
            },
        ],
    },
];

export default IntegrationDocumentationRoutes;
