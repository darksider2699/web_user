import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Overview from "../pages/Overview/Overview";
import Checkout from "../pages/Checkout/Checkout"
import VaccineListInformation from "../pages/VaccineListInformation/VaccineListInformation";
import CovidInformation from "../pages/CovidInformation/CovidInformation";
import SituationList from "../pages/SituationsList/SituationList"
import AccountInformation from "../pages/AccountInformation/AccountInformation";
const Routes = () => {
   function isLoggedIn() {
    return !!localStorage.getItem('token')
    return true
  }
  return (
    <div>
      <Switch>
        <Route path="/checkin" component={Overview} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/vaccine" component={VaccineListInformation} />
        <Route path="/information" component={CovidInformation} />
        <Route path="/covid_case" component={SituationList} />
        <Route path="/account" component={AccountInformation} />
        <Route
                exact
                path="/"
                render={() => {
                    return (
                      isLoggedIn() ?
                      <Redirect to="/checkin" /> :
                      <Redirect to="/login" /> 
                    )
                }}
              />
      </Switch> 
    </div>
  );
};

export default Routes;
