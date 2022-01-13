import React from "react";
import { useDispatch } from "react-redux";
import {
  startDeletingAction,
  startSaveNoteAction,
  startUploading,
} from "../../../Redux/Actions/notesActions";
import SaveIcon from "../../../assets/images/diskette.png";
import DeleteIcon from "../../../assets/images/delete.png";
import UploadIcon from "../../../assets/images/upload.png";

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
    <div className="fab-button">
      <div className="fab-container">
        <button className="fab-button__btn" onClick={() => handleSubmit()}>
          <img src={SaveIcon} alt="Save" width={30} height={30} />
        </button>
        <span className="fab-button__text">Save</span>
      </div>
      <div className="fab-container">
        <button className="fab-button__btn" onClick={() => enableUpload()}>
          <img src={UploadIcon} alt="Save" width={35} />
        </button>
        <span className="fab-button__text">Upload</span>
      </div>
      <div className="fab-container">
        <button
          className="fab-button__btn delete-btn"
          onClick={() => handleDelete()}
        >
          <img src={DeleteIcon} alt="Save" width={50} />
        </button>
        <span className="fab-button__text">Delete</span>
      </div>
      <input
        type="file"
        onChange={(e) => handleUpload(e)}
        id="fileSelector"
        name="file"
        className="file-upload"
      />
    </div>
  );
};
