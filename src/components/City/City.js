import React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToMyCities, removeFromMyCities } from "../../redux/actions";

function City(props) {
  const date = useSelector((state) => state.date);
  const time = useSelector((state) => state.time);
  const myCities = useSelector((state) => state.myCities);
  const dispatch = useDispatch();

  const addFav = (city) => {
    if (!myCities.includes(city)) {
      dispatch(addToMyCities(city));
    }
  };

  const removeFav = (city) => {
    if (myCities.includes(city)) {
      dispatch(removeFromMyCities(city));
    }
  };

  let temperature = props.cityData.main.temp - 273.15;
  let min_temp = props.cityData.main.temp_min - 273.15;
  let max_temp = props.cityData.main.temp_max - 273.15;

  return (
    <div className="cityWrapper">
      <div className="City">
        <div>
          <div className="City_Head">
            <p className="CityName">
              {props.cityData.name}, {props.cityData.sys.country}
            </p>
            <img
              className="Icon"
              src={`https://openweathermap.org/img/wn/${props.cityData.weather[0].icon}@2x.png`}
              alt="Icon"
            />
          </div>
          <p className="Date_Time">
            <span>{date}</span>
            <span>{time}</span>
          </p>
        </div>
        <div className="TempContainer">
          <p className="Temperature">{parseInt(temperature)} °C</p>
          <div className="WeatherDescription">
            <span className="WeatherCondition">
              {props.cityData.weather[0].main}
            </span>
            <span className="Description">
              {parseInt(max_temp)} °C / {parseInt(min_temp)} °C
            </span>
          </div>
        </div>
      </div>
      {!myCities.includes(props.cityData.name) ? (
        <p className="AddFav" onClick={() => addFav(props.cityData.name)}>
          Add to favourite
        </p>
      ) : (
        <p className="RemoveFav" onClick={() => removeFav(props.cityData.name)}>
          Remove from favourite
        </p>
      )}

      <p
        className="MoreDetails"
        onClick={() =>
          props.history.push({
            pathname: "/city/" + props.cityData.name,
            state: { cityData: props.cityData },
          })
        }
      >
        View More Details
      </p>
    </div>
  );
}

export default withRouter(City);
