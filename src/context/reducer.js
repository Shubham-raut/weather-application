export const initialState = {
  city: null,
  cityData: null,
  error: null,
  savedCities: [],
  date: null,
  time: null,
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_CITY":
      state.city = action.payload;
      return;

    case "SET_CITYDATA":
      state.cityData = action.payload;
      return;

    case "SET_ERROR":
      state.error = action.payload;
      return;

    case "SET_DATE":
      state.date = action.payload;
      return;

    case "SET_TIME":
      state.time = action.payload;
      return;

    default:
      return;
  }
};

export default reducer;
