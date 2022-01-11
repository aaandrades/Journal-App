import swal from "sweetalert";
import { db } from "../../firebase/firebase-config";
import { loadNotes } from "../../helpers/loadNotes";
import { uploadFile } from "../../helpers/uploadFile";
import { types } from "../Types/types";

export const createNoteAction = () => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().auth;
      const newNote = { title: "", body: "", date: new Date().getTime() };
      const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

      dispatch(activeNoteAction(doc.id, newNote));
      dispatch(setNoteAction({ id: doc.id, ...newNote }));
    } catch (error) {
      console.error(error);
      swal("Error creating note", error, "error");
    }
  };
};

export const activeNoteAction = (id, note) => ({
  type: types.noteActive,
  payload: { ...note, id },
});

export const updateNoteAction = (note) => ({
  type: types.notesUpdated,
  payload: note,
});

export const fetchNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotesAction(notes));
  };
};

export const setNotesAction = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const setNoteAction = (note) => ({
  type: types.noteCreated,
  payload: note,
});

export const startSaveNoteAction = (note) => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().auth;
      const buildNote = { ...note };
      delete buildNote.id;
      await db.doc(`/${uid}/journal/notes/${note.id}`).update(buildNote);
      dispatch(refreshNotes(note.id, buildNote));
      swal("Saved", note.title, "success");
    } catch (error) {
      console.error(error);
      swal("Error saving :(", error, "error");
    }
  };
};

export const refreshNotes = (id, note) => ({
  type: types.notesUpdatedState,
  payload: {
    id,
    note: { id, ...note },
  },
});

export const closeNoteAction = () => ({
  type: types.emptyNote,
});

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;
    swal({
      title: "Uploading...",
      text: "We're uploading your image, hold on tight",
      icon: "info",
      closeOnClickOutside: false,
      buttons: false,
    });

    const url = await uploadFile(file);
    activeNote.url = url;
    dispatch(startSaveNoteAction(activeNote));
    swal.close();
  };
};

export const startDeletingAction = (id) => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().auth;
      swal({
        title: "Deleting...",
        text: "We're deleting your note, hold on tight",
        icon: "info",
        closeOnClickOutside: false,
        buttons: false,
      });
      await db.doc(`${uid}/journal/notes/${id}`).delete();
      dispatch(deleteNoteAction(id));
      swal.close();
    } catch (error) {
      console.error("Error: ", error);
      swal("Error saving :(", error, "error");
    }
  };
};

export const deleteNoteAction = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const cleanNotesAction = () => ({
  type: types.notesLogoutCleaning,
});
