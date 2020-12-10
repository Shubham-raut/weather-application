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
} from "./CONSTANTS";

const fetchRequest = () => {
  return {
    type: SET_FETCHING,
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

const citiesFetchRequest = () => {
  return {
    type: SET_CITIESFETCHING,
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

export const errorShow = () => {
  return {
    type: SET_SHOWERROR,
  };
};

export const fetchData = (cityInput) => {
  return (dispatch) => {
    dispatch(fetchRequest());
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          cityInput +
          "&APPID=60dfad51347e098c9a6b000ced44c353"
      )
      .then((response) => {
        dispatch(fetchSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchFailure(error));
      });
  };
};

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

export const fetchMyCities = (myCities) => {
  return (dispatch) => {
    dispatch(citiesFetchRequest());
    let values = {},
      promises = [];
    for (let city of myCities) {
      let url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&APPID=60dfad51347e098c9a6b000ced44c353";
      promises.push(axios.get(url));
    }
    axios
      .all(promises)
      .then((results) => {
        results.forEach((result) => {
          values[result.data.name] = result.data;
        });
        dispatch(citiesFetchSuccess(values));
      })
      .catch((error) => {
        dispatch(citiesFetchFailure(error));
      });
  };
};

export const citiesErrorShow = () => {
  return {
    type: SET_CITIESSHOWERROR,
  };
};
