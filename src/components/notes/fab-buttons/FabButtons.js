import React from "react";
import { useDispatch } from "react-redux";
import {
  startDeletingAction,
  startSaveNoteAction,
  startUploading,
} from "../../../Redux/Actions/notesActions";

export const FabButtons = ({ note }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(startDeletingAction(note.id));
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

  const handleSubmit = () => {
    dispatch(startSaveNoteAction(note));
  };

  return (
    <div>
      <button className="btn" onClick={() => handleSubmit()}>
        Save
      </button>
      <input
        type="file"
        onChange={(e) => handleUpload(e)}
        id="fileSelector"
        name="file"
      />
      <button className="btn btn-danger" onClick={() => handleDelete()}>
        Delete
      </button>
      <button className="btn " onClick={() => enableUpload()}>
        Upload
      </button>
    </div>
  );
};
