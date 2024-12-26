export const formatDateMMDDYYY = (value) => {
  const formattedDate = value ? value.split("T")[0] : value;
  const [year, month, day] = formattedDate.split("-");
  return `${month}/${day}/${year}`;
};

export const capitalizeFirstLetter = (val) => {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};
