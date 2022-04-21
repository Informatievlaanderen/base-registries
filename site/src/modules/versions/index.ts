import Root from "./views/Root.vue";
import Versions from "./views/Versions.vue";

export const VersionRoutes = [
    {
        path: "/versies",
        component: Root,
        meta: {},
        children: [
            {
                path: "",
                component: Versions,
                name: "versions"
              },
        ],
    },
];

export default VersionRoutes;
