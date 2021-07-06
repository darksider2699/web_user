import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Customer from "../pages/Customer";
const Routes = () => {
  return (
    <div>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/customer" component={Customer} />
      </Switch>
    </div>
  );
};

export default Routes;
