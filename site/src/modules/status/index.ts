import Root from "./views/Root.vue";
import Status from "./views/Status.vue";

export const StatusRoutes = [
    {
        path: "/status",
        component: Root,
        meta: {},
        children: [
            {
                path: "",
                component: Status,
                name: "status"
              },
        ],
    },
];

export default StatusRoutes;
