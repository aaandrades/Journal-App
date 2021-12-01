export const dateOrdinal = (dom) => {
  if (dom === 31 || dom === 21 || dom === 1) return dom + "st";
  else if (dom === 22 || dom === 2) return dom + "nd";
  else if (dom === 23 || dom === 3) return dom + "rd";
  else return dom + "th";
};

export const formatDate = (date) => {
  return new Date(date).toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
  });
};
