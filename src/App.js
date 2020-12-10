import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/style.css";
import Main from "./pages/Main/Main";
import Header from "./components/Header/Header";
import CityDetail from "./components/CityDetail/CityDetail";
import MyCities from "./pages/MyCities/MyCities";

function App() {
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
