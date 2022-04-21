import Root from "./views/Root.vue";
import ReleaseNotes from "./views/ReleaseNotes.vue";

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
        ],
    },
];

export default ReleaseNotesRoutes;
