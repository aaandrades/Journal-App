import React from "react";
import { dateOrdinal } from "../../helpers/helpers";

export const JournalEntry = ({
  id,
  title,
  body,
  date,
  url,
  handleClick,
  hideSidebar,
}) => {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("en-US", { month: "long" });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const formattedDate = `${month} ${dateOrdinal(day)}, ${year}`;

  console.log("body: ", body);
  return (
    <div
      className="journal__entry pointer"
      onClick={() => {
        hideSidebar(true);
        handleClick(id, { title, body, date, id, url });
      }}
    >
      <h2 className="journal__entry-header">
        <span className="journal__entry-title">{title || "(No title)"}</span>
        <span className="journal__entry-date">{formattedDate}</span>
      </h2>
      <div className="journal__container">
        <div className="journal__entry-body">{body}</div>
        {url && (
          <div className="journal__attach">
            <i className="fa-solid fa-paperclip "></i>
            <span className="journal__attach__text">Attachments</span>
          </div>
        )}
      </div>
    </div>
  );
};
