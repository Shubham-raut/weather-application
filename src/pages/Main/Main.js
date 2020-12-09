import React, { useState } from "react";
import City from "../../components/City/City";
import { Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { errorShow, fetchData } from "../../redux/actions";

function Main() {
  const cityData = useSelector((state) => state.cityData);
  const error = useSelector((state) => state.error);
  const showError = useSelector((state) => state.showError);
  const dispatch = useDispatch();

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
    console.log(cityData);
    event.preventDefault();
    if (cityInput) {
      dispatch(fetchData(cityInput));

      dispatch({
        type: "SET_DATE_TIME",
        payload: {
          date:
            week[new Date().getDay()] +
            ", " +
            new Date().getDate() +
            " " +
            months[new Date().getMonth() - 1] +
            " " +
            new Date().getFullYear(),
          time: new Date().getHours() + ":" + new Date().getMinutes(),
        },
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

      {showError ? (
        <Alert
          className="error_msg"
          variant="dark"
          // variant="danger"
          onClose={() => dispatch(errorShow())}
          dismissible
        >
          <Alert.Heading>Opps!</Alert.Heading>
          <p>{error.message}</p>
        </Alert>
      ) : null}

      {cityData ? (
        <City />
      ) : (
        <h2 className="title-tag">Search for your City</h2>
      )}
    </main>
  );
}

export default Main;
