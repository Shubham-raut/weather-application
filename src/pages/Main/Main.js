import React, { useState } from "react";
import { Form, Alert, Spinner, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { errorShow, fetchData } from "../../redux/actions";
import City from "../../components/City/City";

function Main() {
  const cityData = useSelector((state) => state.cityData);
  const error = useSelector((state) => state.error);
  const showError = useSelector((state) => state.showError);
  const isFetching = useSelector((state) => state.isFetching);
  const dispatch = useDispatch();

  const [cityInput, setCityInput] = useState("");

  const citySearchHandlor = (event) => {
    event.preventDefault();
    if (cityInput) {
      dispatch(fetchData(cityInput));
      // dispatch(setDateTime(getDateTime()));
    }
  };

  return (
    <main className="container">
      <h1 className="title">Weather Application</h1>
      <Form onSubmit={citySearchHandlor}>
        <Form.Control
          placeholder="Search for City..."
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <Button type="submit" variant="secondary">
          Search
        </Button>
      </Form>

      {showError && error ? (
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
      ) : !isFetching && !cityData ? (
        <h2 className="title-tag">Search for your City</h2>
      ) : null}

      {isFetching ? <Spinner className="spinner" animation="grow" /> : null}
      {cityData ? (
        <div className="CityContainer">
          <City cityData={cityData} />
        </div>
      ) : null}
    </main>
  );
}

export default Main;
