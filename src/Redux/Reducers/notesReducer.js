import { NotesState } from "../../states/InitialStates";
import { types } from "../Types/types";

export const notesReducer = (state = NotesState, action) => {
  switch (action.type) {
    case types.noteActive:
      return {
        ...state,
        active: { ...action.payload },
      };
    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload],
      };
    case types.noteCreated:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case types.notesUpdated:
      return {
        ...state,
        active: action.payload,
      };
    case types.notesDelete:
      const id = action.payload;
      const currentNotes = state.notes;
      const newNotes = currentNotes.filter((note) => note.id !== id);
      return {
        ...state,
        notes: newNotes,
        active: null,
      };
    case types.notesUpdatedState:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload.note : note
        ),
      };
    case types.notesLogoutCleaning:
      return NotesState;
    default:
      return NotesState;
  }
};
