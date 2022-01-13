/**
 * @jest-environment node
 */
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { db } from "../../../firebase/firebase-config";
import {
  createNoteAction,
  fetchNotes,
  startSaveNoteAction,
} from "../../../Redux/Actions/notesActions";
import { types } from "../../../Redux/Types/types";

// export mocked function as default module
jest.mock("sweetalert2", () => ({
  default: jest.fn(),
  fire: jest.fn(),
  swal: jest.fn(),
  close: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialStore = { auth: { uid: "Testing" } };
const payload = {
  title: expect.any(String),
  body: expect.any(String),
  date: expect.any(Number),
  id: expect.any(String),
};

let store = mockStore(initialStore);

describe("notes - Actions", () => {
  beforeEach(() => {
    store = mockStore(initialStore);
  });

  test("should dispatch createNoteAction and create new note", async () => {
    // fake a promise because Jest version
    await store.dispatch(createNoteAction()).then(() => {});
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.noteActive,
      payload,
    });

    expect(actions[1]).toEqual({
      type: types.noteCreated,
      payload,
    });

    const [action] = actions;
    const { id } = action.payload;
    await db.doc(`Testing/journal/notes/${id}`).delete();
  });

  test("should load notes, dispatch fetchNotes", async () => {
    await store.dispatch(fetchNotes("Testing")).then(() => {});
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: [payload, payload, payload],
    });
  });

  test("should update notes, dispatch updateNoteAction", async () => {
    const note = {
      id: "0p1uAKRhG2cshJx8euTR",
      title: "titulo",
      body: "body",
    };
    await store.dispatch(startSaveNoteAction(note)).then(() => {});
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesUpdatedState,
      payload: { id: note.id, note },
    });

    expect(actions[0].payload.note.title).toEqual("titulo");
  });
});
