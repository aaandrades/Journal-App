import React from "react";
import { dateOrdinal } from "../../helpers/helpers";

export const JournalEntry = ({ id, title, body, date, url, handleClick }) => {
  const getMonth = new Date(date).toLocaleString("en-US", {
    weekday: "long",
  });

  const getDay = new Date(date).getDay();

  return (
    <div
      className="journal__entry pointer animate__animated animate__backInLeft animate__faster"
      onClick={() => handleClick(id, { title, body, date, id, url })}
    >
      <div className="journal__entry-date">
        <span>{getMonth}</span>
        <h4>{dateOrdinal(getDay)}</h4>
      </div>
      <div className="journal__container">
        <div className="journal__entry-body">
          <p className="journal__entry-title">{title || "(No title)"}</p>
        </div>
        <div></div>
        {url && (
          <span className="journal__attach">
            <i className="fa-solid fa-paperclip "></i>
            <span className="journal__attach__text">Attached Image</span>
          </span>
        )}
      </div>
    </div>
  );
};
