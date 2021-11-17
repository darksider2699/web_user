import React from "react";
import { Route, Switch } from "react-router-dom";
import CheckInQuestion from "../pages/CheckInQuestion/CheckInQuestion";
import CovidTest from "../pages/CovidTest/CovidTest";
import Customers from "../pages/Overview/Overview";
const Routes = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Customers} />
        <Route path="/overview" component={Customers} />
        <Route path="/covid_test" component={CovidTest} />
        <Route path="/questions" component={CheckInQuestion} />
      </Switch>
    </div>
  );
};

export default Routes;
