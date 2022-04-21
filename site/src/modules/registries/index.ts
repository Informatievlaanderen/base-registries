import Root from "./views/Root.vue";
import Municipality from "./views/Municipality.vue";
import Address from "./views/Address.vue";
import Building from "./views/Building.vue";
import Streetname from "./views/Streetname.vue";
import Postal from "./views/Postal.vue";
import Parcel from "./views/Parcel.vue";
import Road from "./views/Road.vue";
import Organisation from "./views/Organisation.vue";
import PublicService from "./views/PublicService.vue";

export const RegistryRoutes = [
    {
        path: "/registers",
        component: Root,
        meta: {},
        children: [
            {
                path: "",
                redirect: { name: "information" }
            },
            {
                path: "adressen",
                component: Address,
                name: "address"
            },
            {
                path: "gemeenten",
                component: Municipality,
                name: "municipality"
            },
            {
                path: "gebouwen",
                component: Building,
                name: "building"
            },
            {
                path: "straatnamen",
                component: Streetname,
                name: "streetname"
            },
            {
                path: "postinfo",
                component: Postal,
                name: "postal"
            },
            {
                path: "percelen",
                component: Parcel,
                name: "parcel"
            },
            {
                path: "wegen",
                component: Road,
                name: "road"
            },
            {
                path: "organisaties",
                component: Organisation,
                name: "organisation"
            },
            {
                path: "dienstverleningen",
                component: PublicService,
                name: "publicservice"
            },
        ],
    },
];

export default RegistryRoutes;
