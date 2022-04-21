import Root from "./views/Root.vue";
import OpensourceApplications from "./views/OpensourceApplications.vue";

export const OpensourceApplicationsRoutes = [
    {
        path: "/opensource-applicaties",
        component: Root,
        meta: {},
        children: [
            {
                path: "",
                component: OpensourceApplications,
                name: "opensource-applications"
              },
        ],
    },
];

export default OpensourceApplicationsRoutes;
