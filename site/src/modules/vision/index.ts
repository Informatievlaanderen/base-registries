import Root from "./views/Root.vue";
import Vision from "./views/Vision.vue";

export const VisionRoutes = [
    {
        path: "/visie",
        component: Root,
        meta: {},
        children: [
            {
                path: "",
                component: Vision,
                name: "vision"
              },
        ],
    },
];

export default VisionRoutes;
