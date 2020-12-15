import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  SET_FETCHING,
  SET_FETCH_ERROR,
  SET_FETCH_SUCCESS,
  SET_DATE_TIME,
  SET_SHOWERROR,
  ADDTO_MYCITIES,
  REMOVEFROM_MYCITIES,
  SET_CITIESFETCHING,
  SET_CITIESFETCH_SUCCESS,
  SET_CITIESFETCH_ERROR,
  SET_CITIESSHOWERROR,
  SET_REFETCH_ERROR,
  SET_RECITIESFETCH_ERROR,
  SET_RECITIESFETCHING,
  SET_REFETCHING
} from "./CONSTANTS";

const initialState = {
  isFetching: false,
  cityData: null,
  error: null,
  date: null,
  time: null,
  showError: false,
  isCitiesFetching: false,
  myCities: [],
  citiesData: null,
  cityFetchError: null,
  showCityFetchError: false,
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cityData', 'myCities']
}

const reducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case SET_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: null,
        showError: false,
      };

    case SET_REFETCHING:
      return {
        ...state,
        isFetching: true,
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

    case SET_REFETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
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

    case ADDTO_MYCITIES:
      return {
        ...state,
        myCities: [...state.myCities, action.payload],
      };

    case REMOVEFROM_MYCITIES:
      state.myCities.splice(state.myCities.indexOf(action.payload), 1);
      return {
        ...state,
        myCities: [...state.myCities],
      };

    case SET_CITIESFETCHING:
      return {
        ...state,
        isCitiesFetching: true,
        cityFetchError: null,
        showCityFetchError: false,
      };

    case SET_RECITIESFETCHING:
      return {
        ...state,
        isCitiesFetching: true,
      };

    case SET_CITIESFETCH_SUCCESS:
      return {
        ...state,
        citiesData: action.payload,
        isCitiesFetching: false,
        cityFetchError: null,
      };

    case SET_CITIESFETCH_ERROR:
      return {
        ...state,
        cityFetchError: action.payload,
        isCitiesFetching: false,
        showCityFetchError: true,
      };

    case SET_RECITIESFETCH_ERROR:
      return {
        ...state,
        cityFetchError: action.payload,
        isCitiesFetching: false,
      };

    case SET_CITIESSHOWERROR:
      return {
        ...state,
        showCityFetchError: false,
      };

    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducer);
