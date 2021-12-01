import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeNoteAction } from "../../Redux/Actions/notesActions";
import { JournalEntry } from "./JournalEntry";

export const JournalEntries = () => {
  const { notes } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const handleClick = (id, note) => {
    dispatch(activeNoteAction(id, note));
  };

  return (
    <div className="journal__entries">
      {notes.map((note) => (
        <JournalEntry key={note.id} {...note} handleClick={handleClick} />
      ))}
    </div>
  );
};
