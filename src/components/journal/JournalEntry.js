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
      {url && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${url})`,
          }}
        ></div>
      )}
      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>
      <div className="journal__entry-date">
        <span>{getMonth}</span>
        <h4>{dateOrdinal(getDay)}</h4>
      </div>
    </div>
  );
};
