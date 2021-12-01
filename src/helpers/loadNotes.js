import { db } from "../Firebase/firebase-config";

export const loadNotes = async (uid) => {
  const notesSnap = await db.collection(`${uid}/journal/notes`).get();
  let notes = [];
  notesSnap.forEach((snap) => {
    notes.push({ id: snap.id, ...snap.data() });
  });
  return notes;
};
