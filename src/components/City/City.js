import React from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function City(props) {
  const cityData = useSelector((state) => state.cityData);
  const date = useSelector((state) => state.date);
  const time = useSelector((state) => state.time);

  let temperature = cityData.main.temp - 273.15;
  let min_temp = cityData.main.temp_min - 273.15;
  let max_temp = cityData.main.temp_max - 273.15;

  return (
    <>
      <div className="CityContainer">
        <div className="City">
          <div>
            <div className="City_Head">
              <p className="CityName">
                {cityData.name}, {cityData.sys.country}
              </p>
              <img
                className="Icon"
                src={`https://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`}
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
                {cityData.weather[0].main}
              </span>
              <span className="Description">
                {parseInt(max_temp)} °C / {parseInt(min_temp)} °C
              </span>
            </div>
          </div>
        </div>
      </div>

      <p
        className="MoreDetails"
        onClick={() =>
          props.history.push({
            pathname: "/city/" + cityData.name,
          })
        }
      >
        View More Details
      </p>
    </>
  );
}

export default withRouter(City);
