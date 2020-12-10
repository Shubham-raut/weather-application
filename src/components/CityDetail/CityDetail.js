import React, { useState } from "react";
import { useSelector } from "react-redux";

const CityDetail = (props) => {
  const date = useSelector((state) => state.date);
  const time = useSelector((state) => state.time);

  const [tempTypes] = useState(["°C", "K", "°F"]);
  const [selectedTempType, setSelectedTempType] = useState("°C");
  if (!props.history?.location?.state?.cityData) {
    window.location.replace("/");
  }

  const getTemperatures = (data) => {
    let obj = {};
    let temp = data.main.temp;
    let temp_min = data.main.temp_min;
    let temp_max = data.main.temp_max;
    let tempType = selectedTempType;
    if (tempType === "°C") {
      temp = data.main.temp - 273.15;
      temp_min = data.main.temp_min - 273.15;
      temp_max = data.main.temp_max - 273.15;
    } else if (tempType === "K") {
      temp = data.main.temp;
      temp_min = data.main.temp_min;
      temp_max = data.main.temp_max;
    } else if (tempType === "°F") {
      temp = (data.main.temp - 273.15) * 1.8 + 32;
      temp_min = (data.main.temp_min - 273.15) * 1.8 + 32;
      temp_max = (data.main.temp_max - 273.15) * 1.8 + 32;
    }
    obj.temp = temp.toFixed(1);
    obj.temp_min = temp_min.toFixed(1);
    obj.temp_max = temp_max.toFixed(1);
    return obj;
  };

  const selectTempTypeHandler = (event) => {
    setSelectedTempType(event.target.innerHTML);
  };

  let sunrise = null;
  let sunset = null;

  let temperatures =
    Object.keys(props.history.location.state.cityData).length > 0 &&
    getTemperatures(props.history.location.state.cityData);

  let tempCategories = tempTypes.map((type) => {
    let buttonClasses = ["Button"];
    if (selectedTempType === type) {
      buttonClasses.push("Active");
    } else {
      buttonClasses = ["Button"];
    }
    return (
      <button
        key={type}
        className={buttonClasses.join(" ")}
        onClick={selectTempTypeHandler}
      >
        {type}
      </button>
    );
  });
  if (Object.keys(props.history.location.state.cityData).length > 0) {
    let sunriseData = new Date(
      props.history.location.state.cityData.sys.sunrise * 1000
    );
    sunrise =
      sunriseData.getHours() +
      ":" +
      (sunriseData.getMinutes() < 10
        ? "0" + sunriseData.getMinutes()
        : sunriseData.getMinutes());
    let sunsetData = new Date(
      props.history.location.state.cityData.sys.sunset * 1000
    );
    sunset =
      sunsetData.getHours() +
      ":" +
      (sunsetData.getMinutes() < 10
        ? "0" + sunsetData.getMinutes()
        : sunsetData.getMinutes());
  }

  return (
    <div className="CityDetailContainer">
      <div className="CityDetail">
        <div className="CityHeader">
          <div className="City_Head">
            <p className="CityName">
              {props.history.location.state.cityData.name},{" "}
              {props.history.location.state.cityData.sys.country}
            </p>
            <img
              className="Icon"
              src={`https://openweathermap.org/img/wn/${props.history.location.state.cityData.weather[0].icon}@2x.png`}
              alt="Icon"
            />
          </div>
          <p className="Date_Time">
            <span>{date}</span>
            <span>{time}</span>
          </p>
        </div>
        {Object.keys(props.history.location.state.cityData).length > 0 && (
          <>
            <div className="TempContainer">
              <p className="Temperature">
                {parseInt(temperatures.temp)} {selectedTempType}
              </p>
              <div className="WeatherDescription">
                <p className="WeatherCondition">
                  {props.history.location.state.cityData.weather[0].main}
                </p>

                <p className="Description">
                  <span>
                    {
                      props.history.location.state.cityData.weather[0]
                        .description
                    }
                  </span>
                  <br />
                  <span>
                    {parseInt(temperatures.temp_max)} {selectedTempType} /{" "}
                    {parseInt(temperatures.temp_min)} {selectedTempType}
                  </span>
                </p>
              </div>
            </div>
            <div className="TempCategories">
              Tempature Type:
              {tempCategories}
            </div>
            <hr />
            <div className="MoreDesc">
              <div className="DescDetails">
                <label className="Labels">Visibility</label>
                <p className="Values">
                  {props.history.location.state.cityData.visibility / 1000} KM
                </p>
              </div>
              <div className="DescDetails">
                <label className="Labels">Wind Speed</label>
                <p className="Values">
                  {props.history.location.state.cityData.wind.speed} km/h
                </p>
              </div>
              <div className="DescDetails">
                <label className="Labels">Pressure</label>
                <p className="Values">
                  {props.history.location.state.cityData.main.pressure} hPa
                </p>
              </div>
              <div className="DescDetails">
                <label className="Labels">Humidity</label>
                <p className="Values">
                  {props.history.location.state.cityData.main.humidity} %
                </p>
              </div>
              <div className="DescDetails">
                <label className="Labels">Sunrise</label>
                <p className="Values">{sunrise}</p>
              </div>
              <div className="DescDetails">
                <label className="Labels">Sunset</label>
                <p className="Values">{sunset}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CityDetail;
