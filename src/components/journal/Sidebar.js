import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../Redux/Actions/authActions";
import { createNoteAction } from "../../Redux/Actions/notesActions";
import { JournalEntries } from "./JournalEntries";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleCreate = () => {
    dispatch(createNoteAction());
  };

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3>Welcome, {name}!</h3>
      </div>

      <div className="journal__new-entry">
        <div className="journal__new-entry__add" onClick={() => handleCreate()}>
          <i className="far fa-calendar-plus fa-5x mt-5 pointer"></i>
          <p className="pointer">New entry</p>
        </div>
      </div>
      <JournalEntries />
      <button className="logout-btn btn pointer" onClick={() => handleLogout()}>
        Log out
      </button>
    </aside>
  );
};
