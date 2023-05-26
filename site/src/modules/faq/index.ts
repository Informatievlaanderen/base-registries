import Root from "./views/Root.vue";
import Faq from "./views/Faq.vue";

export const FaqRoutes = [
    {
        path: "/veelgestelde-vragen",
        component: Root,
        meta: {},
        children: [
            {
                path: "/veelgestelde-vragen/:topic",
                component: Faq,
                props: true

            },
            {
                path: "/veelgestelde-vragen/:topic/:question",
                component: Faq,
                props: true
            }
        ],
    },
];

export default FaqRoutes;