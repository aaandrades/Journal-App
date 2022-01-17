import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../Redux/Actions/authActions";
import { createNoteAction } from "../../Redux/Actions/notesActions";
import { JournalEntries } from "./JournalEntries";
import leftChevron from "../../assets/icons/left-chevron.png";
import rightChevron from "../../assets/icons/chevron.png";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);
  const [displayBar, setDisplayBar] = useState(false);
  const query = window.matchMedia("(max-width: 650px)");

  useEffect(() => {
    setDisplayBar(query.matches);
  }, [query.matches]);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleCreate = () => {
    dispatch(createNoteAction());
  };

  return (
    <>
      <aside className={`journal__sidebar ${displayBar ? "no-sidebar" : ""}`}>
        <div className="journal__sidebar-navbar">
          <h3>Welcome, {name}!</h3>
        </div>

        <div className="journal__new-entry">
          <div
            className="journal__new-entry__add"
            onClick={() => handleCreate()}
          >
            <i className="far fa-calendar-plus fa-5x mt-5 pointer"></i>
            <p className="pointer">New entry</p>
          </div>
        </div>
        <JournalEntries
          hideSidebar={query.matches ? setDisplayBar : undefined}
        />
        <button
          className="logout-btn btn pointer"
          onClick={() => handleLogout()}
        >
          Log out
        </button>
        {query.matches && (
          <div
            className={`closebar-opener close`}
            onClick={() => setDisplayBar(!displayBar)}
          >
            <img src={leftChevron} alt="close-icon" width={15} />
          </div>
        )}
      </aside>
      {query.matches && (
        <div
          className={`closebar-opener`}
          onClick={() => setDisplayBar(!displayBar)}
        >
          <img src={rightChevron} alt="open-icon" width={15} />
        </div>
      )}
    </>
  );
};
