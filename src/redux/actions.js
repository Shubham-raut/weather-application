import axios from "axios";
import {
  SET_FETCH_SUCCESS,
  SET_FETCHING,
  SET_FETCH_ERROR,
  SET_SHOWERROR,
  ADDTO_MYCITIES,
  REMOVEFROM_MYCITIES,
  SET_CITIESFETCHING,
  SET_CITIESFETCH_SUCCESS,
  SET_CITIESFETCH_ERROR,
  SET_CITIESSHOWERROR,
  SET_DATE_TIME,
  SET_REFETCH_ERROR,
  SET_RECITIESFETCH_ERROR,
  SET_RECITIESFETCHING,
  SET_REFETCHING,
} from "./CONSTANTS";


const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Satuday",
];

const months = [
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
];

const getDateTime = () => {
  return {
    date:
      week[new Date().getDay()] +
      ", " +
      new Date().getDate() +
      " " +
      months[new Date().getMonth()] +
      " " +
      new Date().getFullYear(),
    time: new Date().getHours() + ":" + new Date().getMinutes(),
  };
};


const fetchRequest = () => {
  return {
    type: SET_FETCHING,
  };
};

const reFetchRequest = () => {
  return {
    type: SET_REFETCHING,
  };
};

const fetchSuccess = (data) => {
  return {
    type: SET_FETCH_SUCCESS,
    payload: data,
  };
};

const fetchFailure = (error) => {
  return {
    type: SET_FETCH_ERROR,
    payload: error,
  };
};

const reFetchFailure = (error) => {
  return {
    type: SET_REFETCH_ERROR,
    payload: error,
  };
};

const citiesFetchRequest = () => {
  return {
    type: SET_CITIESFETCHING,
  };
};

const reCitiesFetchRequest = () => {
  return {
    type: SET_RECITIESFETCHING,
  };
};

const citiesFetchSuccess = (data) => {
  return {
    type: SET_CITIESFETCH_SUCCESS,
    payload: data,
  };
};

const citiesFetchFailure = (error) => {
  return {
    type: SET_CITIESFETCH_ERROR,
    payload: error,
  };
};

const reCitiesFetchFailure = (error) => {
  return {
    type: SET_RECITIESFETCH_ERROR,
    payload: error,
  };
};

const setDateTime = (input) => {
  return {
    type: SET_DATE_TIME,
    payload: input,
  }
}

export const addToMyCities = (city) => {
  return {
    type: ADDTO_MYCITIES,
    payload: city,
  };
};

export const removeFromMyCities = (city) => {
  return {
    type: REMOVEFROM_MYCITIES,
    payload: city,
  };
};

export const errorShow = () => {
  return {
    type: SET_SHOWERROR,
  };
};

export const citiesErrorShow = () => {
  return {
    type: SET_CITIESSHOWERROR,
  };
};

export const fetchData = (cityInput) => {
  return (dispatch) => {
    dispatch(fetchRequest());
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityInput +
        "&APPID=e6c7e5812e674faf9192dfaddeb4438a"
      )
      .then((response) => {
        dispatch(fetchSuccess(response.data));
        dispatch(setDateTime(getDateTime()));
      })
      .catch((error) => {
        dispatch(fetchFailure(error));
      });
  };
};

export const refetchData = (cityInput) => {
  return (dispatch) => {
    dispatch(reFetchRequest());
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityInput +
        "&APPID=e6c7e5812e674faf9192dfaddeb4438a"
      )
      .then((response) => {
        dispatch(fetchSuccess(response.data));
        dispatch(setDateTime(getDateTime()));
      })
      .catch((error) => {
        dispatch(reFetchFailure(error));
      });
  };
};

export const fetchMyCities = (myCities) => {
  return (dispatch) => {
    dispatch(citiesFetchRequest());
    let values = {},
      promises = [];
    for (let city of myCities) {
      let url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&APPID=e6c7e5812e674faf9192dfaddeb4438a";
      promises.push(axios.get(url));
    }
    axios
      .all(promises)
      .then((results) => {
        results.forEach((result) => {
          values[result.data.name] = result.data;
        });
        dispatch(citiesFetchSuccess(values));
        dispatch(setDateTime(getDateTime()));
      })
      .catch((error) => {
        dispatch(citiesFetchFailure(error));
      });
  };
};


export const reFetchMyCities = (myCities) => {
  return (dispatch) => {
    dispatch(reCitiesFetchRequest());
    let values = {},
      promises = [];
    for (let city of myCities) {
      let url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&APPID=e6c7e5812e674faf9192dfaddeb4438a";
      promises.push(axios.get(url));
    }
    axios
      .all(promises)
      .then((results) => {
        results.forEach((result) => {
          values[result.data.name] = result.data;
        });
        dispatch(citiesFetchSuccess(values));
        dispatch(setDateTime(getDateTime()));
      })
      .catch((error) => {
        dispatch(reCitiesFetchFailure(error));
      });
  };
};
