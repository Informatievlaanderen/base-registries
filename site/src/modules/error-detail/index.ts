import Root from "./views/Root.vue";
import ErrorDetail from "./views/ErrorDetail.vue";
import Error from "./views/Error.vue";

export const ErrorDetailRoutes = [
    {
        path: "/foutmeldingen",
        component: Root,
        meta: {},
        children: [
            {
                path: "/foutmeldingen",
                component: Error,
                props:false
            },{
                path: "/foutmeldingen/:id",
                component: ErrorDetail,
                props:true
            },
        ],
    },
];

export default ErrorDetailRoutes;
