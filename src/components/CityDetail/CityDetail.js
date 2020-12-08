import React, { useState } from "react";
import { useStateValue } from "../../context/StateProvider";
const CityDetail = (props) => {
  const [{ cityData, date, time }] = useStateValue();
  const [tempTypes] = useState(["°C", "K", "°F"]);
  const [selectedTempType, setSelectedTempType] = useState("°C");
  if (!cityData) {
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

  let classNames = ["CityDetail"];
  let sunrise = null;
  let sunset = null;
  if (new Date().getHours() > 19 || new Date().getHours() < 7) {
    classNames.push("Dark");
  } else {
    classNames.push("Sunny");
  }

  let temperatures =
    Object.keys(cityData).length > 0 && getTemperatures(cityData);

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
  if (Object.keys(cityData).length > 0) {
    let sunriseData = new Date(cityData.sys.sunrise * 1000);
    sunrise =
      sunriseData.getHours() +
      ":" +
      (sunriseData.getMinutes() < 10
        ? "0" + sunriseData.getMinutes()
        : sunriseData.getMinutes());
    let sunsetData = new Date(cityData.sys.sunset * 1000);
    sunset =
      sunsetData.getHours() +
      ":" +
      (sunsetData.getMinutes() < 10
        ? "0" + sunsetData.getMinutes()
        : sunsetData.getMinutes());
  }

  return (
    <div className="CityDetailContainer">
      <div className={classNames.join(" ")}>
        <div className="CityHeader">
          <p className="CityName">
            {cityData.name}, {cityData.sys.country}
          </p>
          <p className="Date_Time">
            <span className="Date">{date}</span>
            <span className="Time">{time}</span>
          </p>
        </div>
        {Object.keys(cityData).length > 0 && (
          <>
            <div className="TempContainer">
              <p className="Temperature">
                {parseInt(temperatures.temp)} {selectedTempType}
              </p>
              <div className="WeatherDescription">
                <span className="Description">{cityData.weather[0].main}</span>
                <span>
                  {parseInt(temperatures.temp_max)} {selectedTempType} /{" "}
                  {parseInt(temperatures.temp_min)} {selectedTempType}
                </span>
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
                <p className="Values">{cityData.visibility / 1000} KM</p>
              </div>
              <div className="DescDetails">
                <label className="Labels">Wind Speed</label>
                <p className="Values">{cityData.wind.speed} km/h</p>
              </div>
              <div className="DescDetails">
                <label className="Labels">Pressure</label>
                <p className="Values">{cityData.main.pressure} hPa</p>
              </div>
              <div className="DescDetails">
                <label className="Labels">Humidity</label>
                <p className="Values">{cityData.main.humidity} %</p>
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
