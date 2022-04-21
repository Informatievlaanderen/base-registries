import Root from "./views/Root.vue";
import Motive from "./views/Motive.vue";

export const MotiveRoutes = [
    {
        path: "/aanleiding",
        component: Root,
        meta: {},
        children: [
            {
                path: "",
                component: Motive,
                name: "motive"
              },
        ],
    },
];

export default MotiveRoutes;
