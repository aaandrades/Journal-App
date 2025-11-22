import React from "react";
import { useDispatch } from "react-redux";
import { formatDate } from "../../helpers/helpers";
import { closeNoteAction } from "../../Redux/Actions/notesActions";
import close from "../../assets/images/close.png";

export const NotesAppBar = ({ note }) => {
  const dispatch = useDispatch();

  const returnMain = () => {
    dispatch(closeNoteAction());
  };

  return (
    <div className="notes__appbar">
      <span>{formatDate(note.date)}</span>
      <button className="notes__appBar-close" title="Close note">
        <img
          src={close}
          alt="close"
          width={30}
          onClick={() => returnMain()}
          className="pointer"
        />
      </button>
    </div>
  );
};
