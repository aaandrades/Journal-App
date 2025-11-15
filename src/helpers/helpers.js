export const dateOrdinal = (dom) => {
  if (dom === 31 || dom === 21 || dom === 1) return dom + "st";
  else if (dom === 22 || dom === 2) return dom + "nd";
  else if (dom === 23 || dom === 3) return dom + "rd";
  else return dom + "th";
};

export const formatDate = (date) => {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("en-US", { month: "long" });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const time = dateObj.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).toLowerCase();

  return `${month} ${dateOrdinal(day)}, ${year} at ${time}`;
};
