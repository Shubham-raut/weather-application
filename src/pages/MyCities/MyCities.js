import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { citiesErrorShow, fetchMyCities } from "../../redux/actions";
import { Alert, Spinner } from "react-bootstrap";
import City from "../../components/City/City";
import { getDateTime } from "../../utils/dateTime";

const MyCities = () => {
  const myCities = useSelector((state) => state.myCities);
  const citiesData = useSelector((state) => state.citiesData);
  const cityFetchError = useSelector((state) => state.cityFetchError);
  const showCityFetchError = useSelector((state) => state.showCityFetchError);
  const isCitiesFetching = useSelector((state) => state.isCitiesFetching);

  const dispatch = useDispatch();

  useEffect(() => {
    if (myCities.length) {
      dispatch(fetchMyCities(myCities));

      dispatch({
        type: "SET_DATE_TIME",
        payload: getDateTime(),
      });
    }
  }, [myCities]);

  return (
    <>
      <div className="MyCityContainer">
        <div className="myCities">My Cities</div>

        {showCityFetchError ? (
          <Alert
            className="error_msg"
            variant="dark"
            // variant="danger"
            onClose={() => dispatch(citiesErrorShow())}
            dismissible
          >
            <Alert.Heading>Opps!</Alert.Heading>
            <p>{cityFetchError.message}</p>
          </Alert>
        ) : null}

        {isCitiesFetching ? (
          <Spinner className="spinner" animation="grow" />
        ) : null}

        {citiesData && myCities.length ? (
          <div className="citiesContainer">
            {Object.keys(citiesData).map((city) => (
              <City key={city} cityData={citiesData[city]} />
            ))}
          </div>
        ) : (
          <h2 className="empty">Your list is empty!</h2>
        )}
      </div>
    </>
  );
};

export default MyCities;
