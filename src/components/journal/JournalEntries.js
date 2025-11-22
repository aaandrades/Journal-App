import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeNoteAction } from "../../Redux/Actions/notesActions";
import { JournalEntry } from "./JournalEntry";

export const JournalEntries = ({ hideSidebar = () => {} }) => {
  const { notes } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const handleClick = (id, note) => {
    dispatch(activeNoteAction(id, note));
  };

  return (
    <div className="journal__entries">
      <h3 className="journal__entries__text">
        Existing notes ({notes.length})
      </h3>
      {notes.map((note) => (
        <JournalEntry
          key={note.id}
          handleClick={handleClick}
          hideSidebar={hideSidebar}
          {...note}
        />
      ))}
    </div>
  );
};
