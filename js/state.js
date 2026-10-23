/* Shared app state: values more than one module changes. Every module reads and writes them as S.name. */
export const S = {
  DATA: null,   // content-loader
  activeTA: null,   // editor
  advOpenNow: false,   // editor
  advTab: "preview",   // editor
  blkGroup: "All",   // editor
  blkSavedSel: null,   // editor
  curStep: 1,   // nav
  discardArmed: 0,   // editor
  docTemplate: null,   // nav
  draftPending: null,   // editor
  editIdx: 1,   // store
  editStart: "",   // store
  editing: false,   // app
  recentIds: [5, 4, 3, 2, 1],   // content-loader
  stepCount: 0,   // markdown
  RESPONSES: {},
  HOME: false,   // app: the Course Home page is open in the main area
  REF: false,   // app: the Reference page is open in the main area   // store: learner answers to ::: response boxes, key "L{lecture}-{id}"
};
