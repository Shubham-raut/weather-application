const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Satuday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getDateTime = () => {
  return {
    date:
      week[new Date().getDay()] +
      ", " +
      new Date().getDate() +
      " " +
      months[new Date().getMonth() - 1] +
      " " +
      new Date().getFullYear(),
    time: new Date().getHours() + ":" + new Date().getMinutes(),
  };
};
