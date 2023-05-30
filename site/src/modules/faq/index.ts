import Root from "./views/Root.vue";
import Faq from "./views/Faq.vue"

export const FaqRoutes = [
    {
        path: "/veelgestelde-vragen",
        component: Root,
        meta: {},
        children: [
            {
              path: "",
              component: Faq,
              name: "faq"
            },
        ]
    },
];

export default FaqRoutes;