import React, { useEffect, useRef } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/style.css";
import Main from "./pages/Main/Main";
import Header from "./components/Header/Header";
import CityDetail from "./components/CityDetail/CityDetail";
import MyCities from "./pages/MyCities/MyCities";
import { fetchData, fetchMyCities, refetchData, reFetchMyCities } from "./redux/actions";

function App() {
  const myCities = useSelector((state) => state.myCities);
  const cityData = useSelector((state) => state.cityData);
  const isFetching = useSelector((state) => state.isFetching);

  const isCitiesFetching = useSelector((state) => state.isCitiesFetching);
  const dispatch = useDispatch();
  //for storing setinterval function
  const reFetchCityRef = useRef(false);
  const refetchMyCitiesRef = useRef(false);

  useEffect(() => {
    if (myCities.length) {
      dispatch(fetchMyCities(myCities));
    }
  }, [myCities]);

  useEffect(() => {
    if (cityData?.name) {
      dispatch(fetchData(cityData.name));
    }
  }, []);

  //refetch after 10 min
  useEffect(() => {
    clearInterval(reFetchCityRef.current);
    reFetchCityRef.current = setInterval(() => {
      if (cityData?.name && !isFetching) {
        // console.log('city');
        dispatch(refetchData(cityData.name));
      }
    }, 600000);
  }, [cityData, isFetching]);

  useEffect(() => {
    clearInterval(refetchMyCitiesRef.current);
    refetchMyCitiesRef.current = setInterval(() => {
      if (myCities.length && !isCitiesFetching) {
        // console.log('myCities');
        dispatch(reFetchMyCities(myCities));
      }
    }, 600000);
  }, [myCities, isCitiesFetching]);

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
