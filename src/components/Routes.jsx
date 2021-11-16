import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Overview";
const Routes = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Customers} />
        <Route path="/overview" component={Customers} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
};

export default Routes;
