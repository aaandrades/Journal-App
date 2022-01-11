import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../Hooks/useForm";
import { updateNoteAction } from "../../Redux/Actions/notesActions";
import { FabButtons } from "./fab-buttons/FabButtons";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const [values, handleInputChange] = useForm(note);
  const { body, title } = values;

  useEffect(() => {
    dispatch(updateNoteAction(values));
  }, [values, dispatch]);

  return (
    <div className="notes__main-content animate__animated animate__fadeIn">
      <NotesAppBar note={values} />
      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          value={title}
          name="title"
          onChange={handleInputChange}
        />
        <textarea
          placeholder="What happend today?"
          className="notes__textarea"
          value={body}
          name="body"
          onChange={handleInputChange}
        />
        {note.url && (
          <div className="notes__image">
            <img src={note.url} alt="attach-img" height="150" />
          </div>
        )}
      </div>
      <FabButtons note={note} />
    </div>
  );
};
