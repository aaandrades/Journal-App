import React from "react";
import { useDispatch } from "react-redux";
import { formatDate } from "../../helpers/helpers";
import {
  startSaveNoteAction,
  startUploading,
} from "../../Redux/Actions/notesActions";

export const NotesAppBar = ({ note }) => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(startSaveNoteAction(note));
  };

  const enableUpload = () => {
    document.querySelector("#fileSelector").click();
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
  };

  return (
    <div className="notes__appbar">
      <span>{formatDate(note.date)}</span>
      <input
        type="file"
        onChange={(e) => handleUpload(e)}
        id="fileSelector"
        name="file"
      />
      <div>
        <button className="btn" onClick={() => enableUpload()}>
          Picture
        </button>
        <button className="btn" onClick={() => handleSubmit()}>
          Save
        </button>
      </div>
    </div>
  );
};
