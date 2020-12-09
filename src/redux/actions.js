import axios from "axios";
import {
  SET_FETCH_SUCCESS,
  SET_FETCHING,
  SET_FETCH_ERROR,
  SET_SHOWERROR,
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
        "http://api.openweathermap.org/data/2.5/weather?q=" +
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
