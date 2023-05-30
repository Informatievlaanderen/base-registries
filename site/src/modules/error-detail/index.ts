import Root from "./views/Root.vue";
import ErrorDetail from "./views/ErrorDetail.vue";

export const ErrorDetailRoutes = [
    {
        path: "/foutmeldingen",
        component: Root,
        meta: {},
        children: [
            {
                path: "/foutmeldingen",
                component: ErrorDetail,
                props:false
            }
        ],
    },
];

export default ErrorDetailRoutes;
