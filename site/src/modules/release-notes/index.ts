import Root from "./views/Root.vue";
import ReleaseNotes from "./views/ReleaseNotes.vue";
import FunctionalGrar from "./views/FunctionalGrar.vue";
import FunctionalWr from "./views/FunctionalWr.vue";

export const ReleaseNotesRoutes = [
    {
        path: "/release-notes",
        component: Root,
        meta: {},
        children: [
            {
                path: "",
                component: ReleaseNotes,
                name: "release-notes"
              },
              {
                path: "functioneelgrar",
                component: FunctionalGrar,
                name: "functionalgrar"
              },
              {
                path: "functioneelwr",
                component: FunctionalWr,
                name: "functionalwr"
              },
        ],
    },
];

export default ReleaseNotesRoutes;
