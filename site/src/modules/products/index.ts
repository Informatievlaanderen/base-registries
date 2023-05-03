import Root from "./views/Root.vue";
import Products from "./views/Products.vue";

export const ProductsRoutes = [
  {
    path: "/producten",
    component: Root,
    meta: {},
    children: [
      {
        path: "",
        component: Products,
        name: "producten"
      }
    ],
  },
];

export default ProductsRoutes;
