import React, { useEffect, useRef } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/style.css";
import Main from "./pages/Main/Main";
import Header from "./components/Header/Header";
import CityDetail from "./components/CityDetail/CityDetail";
import MyCities from "./pages/MyCities/MyCities";
import { fetchData, fetchMyCities, setDateTime } from "./redux/actions";
import { getDateTime } from "./utils/dateTime";

function App() {
  const myCities = useSelector((state) => state.myCities);
  const cityData = useSelector((state) => state.cityData);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  //for storing setinterval function
  const reFetchCity = useRef(false);
  const refetchMyCities = useRef(false);

  useEffect(() => {
    if (myCities.length) {
      dispatch(fetchMyCities(myCities));
      dispatch(setDateTime(getDateTime()));
    }
  }, [myCities]);

  useEffect(() => {
    dispatch(setDateTime(getDateTime()));
    if (cityData?.name) {
      dispatch(fetchData(cityData.name));
    }
  }, []);

  useEffect(() => {
    clearInterval(reFetchCity.current);
    reFetchCity.current = setInterval(() => {
      if (cityData?.name && !error) {
        // console.log('city')
        dispatch(fetchData(cityData.name));
        dispatch(setDateTime(getDateTime()));
      }
    }, 100000);
  }, [cityData]);

  useEffect(() => {
    clearInterval(refetchMyCities.current);
    refetchMyCities.current = setInterval(() => {
      if (myCities.length && !error) {
        // console.log('myCities');
        dispatch(fetchMyCities(myCities));
        dispatch(setDateTime(getDateTime()));
      }
    }, 100000);
  }, [myCities]);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/city/:city" component={CityDetail} />
        <Route exact path="/" component={() => <Main />} />
        <Route path="/mycities" component={() => <MyCities />} />
        <Route path="*" component={() => <Main />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
