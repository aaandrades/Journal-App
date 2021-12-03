/**
 * @jest-environment node
 */
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createNoteAction } from "../../../Redux/Actions/notesActions";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
  auth: { uid: "Testing" },
});

describe("notes - Actions", () => {
  test("should dispatch createNoteAction and create new note", async () => {
    await store.dispatch(createNoteAction());
  });
});
