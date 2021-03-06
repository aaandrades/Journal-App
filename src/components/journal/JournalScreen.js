import React from "react";
import { useSelector } from "react-redux";
import { NoteScreen } from "../notes/NoteScreen";
import { EmptySelected } from "./EmptySelected";
import { Sidebar } from "./Sidebar";

export const JournalScreen = () => {
  const { active } = useSelector((state) => state.notes);

  return (
    <div className="journal__main-content animate__animated animate__fadeIn animate__faster">
      <Sidebar />
      <main className="notes__main">{active ? <NoteScreen /> : <EmptySelected />}</main>
    </div>
  );
};
