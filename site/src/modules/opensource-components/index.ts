import Root from "./views/Root.vue";
import OpensourceComponents from "./views/OpensourceComponents.vue";

export const OpensourceComponentsRoutes = [
    {
        path: "/opensource-componenten",
        component: Root,
        meta: {},
        children: [
            {
                path: "",
                component: OpensourceComponents,
                name: "opensource-components"
              },
        ],
    },
];

export default OpensourceComponentsRoutes;
