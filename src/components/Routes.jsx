import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Overview from "../pages/Overview/Overview";
const Routes = () => {
   function isLoggedIn() {
    return !!localStorage.getItem('token')
    return true
  }
  return (
    <div>
      <Switch>
        <Route path="/checkin" component={Overview} />
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
