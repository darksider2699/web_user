import React from "react";
import { Route, Switch } from "react-router-dom";
import CheckInQuestion from "../pages/CheckInQuestion/CheckInQuestion";
import CovidTest from "../pages/CovidTest/CovidTest";
import Overview from "../pages/Overview/Overview";
import SituationsList from "../pages/SituationsList/SituationList";
const Routes = () => {
  return (
    <div>
      <Switch>
        <Route path="/checkin_status" component={Overview} />
        <Route path="/covid_test" component={CovidTest} />
        <Route path="/questions" component={CheckInQuestion} />
        <Route path="/situations_list" component={SituationsList} />
      </Switch>
    </div>
  );
};

export default Routes;
