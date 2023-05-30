import Root from "./views/Root.vue";
import Glossary from "./views/Glossary.vue";

export const GlossaryRoutes = [
    {
        path: "/verklarende-woordenlijst",
        component: Root,
        meta: {},
        children: [
            {
              path: "",
              component: Glossary,
              name: "glossary"
            }
        ]
    },
];

export default GlossaryRoutes;