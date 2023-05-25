import Root from "./views/Root.vue";
import Products from "./views/Products.vue";
import Grar from "./views/Grar.vue";
import Wr from "./views/Wr.vue";

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
      },
      {
        path: "grar",
        component: Grar,
        name: "productsgrar"
      },
      {
        path: "wr",
        component: Wr,
        name: "productswr"
      }
    ],
  },
];

export default ProductsRoutes;
