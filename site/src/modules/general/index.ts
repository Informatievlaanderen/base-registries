import Root from "./views/Root.vue";
import General from "./views/General.vue";

export const GeneralRoutes = [
    {
        path: "/algemeen",
        component: Root,
        meta: {},
        children: [
            {
                path: "",
                component: General,
                name: "general"
              },
        ],
    },
];

export default GeneralRoutes;
