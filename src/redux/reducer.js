import {
  SET_FETCHING,
  SET_FETCH_ERROR,
  SET_FETCH_SUCCESS,
  SET_DATE_TIME,
  SET_SHOWERROR,
} from "./CONSTANTS";

export const initialState = {
  isFetching: false,
  cityData: null,
  error: null,
  date: null,
  time: null,
  showError: false,
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case SET_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: null,
        showError: false,
      };

    case SET_FETCH_SUCCESS:
      return {
        ...state,
        cityData: action.payload,
        isFetching: false,
        error: null,
      };

    case SET_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
        showError: true,
      };

    case SET_DATE_TIME:
      return {
        ...state,
        date: action.payload.date,
        time: action.payload.time,
      };

    case SET_SHOWERROR:
      return {
        ...state,
        showError: false,
      };

    default:
      return state;
  }
};

export default reducer;
