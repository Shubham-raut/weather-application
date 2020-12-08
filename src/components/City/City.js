import React from "react";
import { useStateValue } from "../../context/StateProvider";
import { withRouter } from "react-router-dom";

function City(props) {
  const [{ cityData, date, time }] = useStateValue();

  let temperature = cityData.main.temp - 273.15;
  let min_temp = cityData.main.temp_min - 273.15;
  let max_temp = cityData.main.temp_max - 273.15;

  let cityStyles = ["City"];
  if (new Date().getHours() > 19 || new Date().getHours() < 7) {
    cityStyles.push("Dark");
  } else {
    cityStyles.push("Sunny");
  }

  return (
    <>
      <div className="CityContainer">
        <div className={cityStyles.join(" ")}>
          <div>
            <p className="CityName">
              {cityData.name}, {cityData.sys.country}
            </p>
            <p className="Date_Time">
              <span>{date}</span>
              <span>{time}</span>
            </p>
          </div>
          <div className="TempContainer">
            <p className="Temperature">{parseInt(temperature)} °C</p>
            <div className="WeatherDescription">
              <span className="Description">{cityData.weather[0].main}</span>
              <span>
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
