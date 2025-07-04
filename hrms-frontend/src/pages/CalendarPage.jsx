import React from "react";
import Calendar from "../components/Calendar";

const CalendarPage = () => {
  const token = localStorage.getItem("token"); // Or however you store your token

  return <Calendar token={token} />;
};

export default CalendarPage;
