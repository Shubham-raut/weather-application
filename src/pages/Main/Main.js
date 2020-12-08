import React, { useState, useEffect } from "react";
import axios from "axios";
import City from "../../components/City/City";
import { Form } from "react-bootstrap";
import { useStateValue } from "../../context/StateProvider.js";

function Main() {
  const [{ city, cityData }, dispatch] = useStateValue();
  const [cityInput, setCityInput] = useState("");
  const [week] = useState([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Satuday",
  ]);

  const [months] = useState([
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
  ]);

  const citySearchHandlor = (event) => {
    console.log(city);
    console.log(cityData);
    event.preventDefault();
    if (cityInput) {
      console.log(cityInput);
      axios
        .get(
          "http://api.openweathermap.org/data/2.5/weather?q=" +
            cityInput +
            "&APPID=60dfad51347e098c9a6b000ced44c353"
        )
        .then((response) => {
          console.log(response.data);
          dispatch({
            type: "SET_CITYDATA",
            payload: response.data,
          });
          dispatch({
            type: "SET_CITY",
            payload: cityInput,
          });

          dispatch({
            type: "SET_DATE",
            payload:
              week[new Date().getDay()] +
              ", " +
              new Date().getDate() +
              " " +
              months[new Date().getMonth() - 1] +
              " " +
              new Date().getFullYear(),
          });

          dispatch({
            type: "SET_TIME",
            payload: new Date().getHours() + ":" + new Date().getMinutes(),
          });
        })
        .catch((error) => {
          dispatch({
            type: "SET_ERROR",
            payload: error,
          });
          console.log(error);
          alert("Opps\n", error.message);
        });
    }
  };

  return (
    <main className="container">
      <h1 className="title">Weather Application</h1>
      <Form onSubmit={citySearchHandlor}>
        <Form.Control
          placeholder="Search"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
      </Form>
      {city ? <City /> : <h2 className="title-tag">Search for your City</h2>}
    </main>
  );
}

export default Main;
