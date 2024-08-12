import Root from "./views/Root.vue";
import ReleaseNotes from "./views/ReleaseNotes.vue";
import ReleaseNotesTechnicalGrar from "./views/ReleaseNotesTechnicalGrar.vue";
import ReleaseNotesTechnicalWr from "./views/ReleaseNotesTechnicalWr.vue";
import ReleaseNotesBusinessGrar from "./views/ReleaseNotesBusinessGrar.vue";
import ReleaseNotesBusinessWr from "./views/ReleaseNotesBusinessWr.vue";

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
              },
              {
                  path: "technischwr",
                  component: ReleaseNotesTechnicalWr,
                  name: "release-notes-technisch-wr"
              },
              {
                  path: "functioneelgrar",
                  component: ReleaseNotesBusinessGrar,
                  name: "release-notes-business-grar"
              },
              {
                  path: "functioneelwr",
                  component: ReleaseNotesBusinessWr,
                  name: "release-notes-business-wr"
              }
        ],
    },
];

export default ReleaseNotesRoutes;
