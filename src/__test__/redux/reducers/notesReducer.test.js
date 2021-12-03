import { notesReducer } from "../../../Redux/Reducers/notesReducer";
import { types } from "../../../Redux/Types/types";
import { NotesState } from "../../../states/InitialStates";

describe("notesReducer - Reducer", () => {
  test("should set selected note", () => {
    const selectedAction = {
      type: types.noteActive,
      payload: { selected: true },
    };
    const store = notesReducer(NotesState, selectedAction);
    expect(store).toEqual({ notes: [], active: { selected: true } });
  });

  test("should load notes", () => {
    const loadAction = { type: types.notesLoad, payload: ["mock"] };
    const store = notesReducer(NotesState, loadAction);
    expect(store).toEqual({ active: null, notes: ["mock"] });
  });

  test("should create notes", () => {
    const initialState = {
      active: null,
      notes: ["mock1", "mock2"],
    };
    const createAction = { type: types.noteCreated, payload: "mock3" };
    const store = notesReducer(initialState, createAction);
    expect(store).toEqual({ active: null, notes: ["mock1", "mock2", "mock3"] });
  });

  test("should update notes", () => {
    const initialState = {
      active: null,
      notes: ["mock1", "mock2"],
    };
    const updateAction = { type: types.notesUpdated, payload: true };
    const store = notesReducer(initialState, updateAction);
    expect(store).toEqual({ active: true, notes: ["mock1", "mock2"] });
  });

  test("should update state of notes", () => {
    const initialState = {
      active: null,
      notes: ["mock1", "mock2"],
    };
    const updateNotesAction = {
      type: types.notesUpdatedState,
      payload: { id: 1, note: "content" },
    };
    const store = notesReducer(initialState, updateNotesAction);
    expect(store).toEqual({ active: null, notes: ["mock1", "mock2"] });
  });

  test("should delete notes", () => {
    const initialState = {
      active: null,
      notes: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };
    const deleteNoteAction = { type: types.notesDelete, payload: 1 };
    const store = notesReducer(initialState, deleteNoteAction);
    expect(store).toEqual({ active: null, notes: [{ id: 2 }, { id: 3 }] });
  });

  test("should clean notes after logout", () => {
    const cleanNotesAction = { type: types.notesLogoutCleaning };
    const store = notesReducer(NotesState, cleanNotesAction);
    expect(store).toEqual(NotesState);
  });

  test("should return same state", () => {
    const emptyAction = {
      type: "empty",
    };
    const store = notesReducer(undefined, emptyAction);
    expect(store).toEqual(NotesState);
  });
});
