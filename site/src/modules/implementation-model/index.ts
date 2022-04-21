import Root from "./views/Root.vue";
import ImplementationModel from "./views/ImplementationModel.vue";
import AddressRegistry from "./views/AddressRegistry.vue";
import BuildingRegistry from "./views/BuildingRegistry.vue";

export const ImplementationModelRoutes = [
    {
        path: "/implementatiemodel",
        component: Root,
        meta: {},
        children: [
            {
                path: "",
                component: ImplementationModel,
                name: "implementatiemodel"
            },
            {
                path: "adressenregister",
                component: AddressRegistry,
                name: "addressregistry"
            },
            {
                path: "gebouwenregister",
                component: BuildingRegistry,
                name: "buildingregistry"
            },
        ],
    },
];

export default ImplementationModelRoutes;
