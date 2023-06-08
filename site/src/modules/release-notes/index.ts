import Root from "./views/Root.vue";
import ReleaseNotes from "./views/ReleaseNotes.vue";
import ReleaseNotesTechnicalGrar from "./views/ReleaseNotesTechnicalGrar.vue";

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
                  path: "technischgrar",
                  component: ReleaseNotesTechnicalGrar,
                  name: "release-notes-technisch-grar"
              }
        ],
    },
];

export default ReleaseNotesRoutes;
