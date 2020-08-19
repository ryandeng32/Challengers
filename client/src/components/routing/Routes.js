import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Alert from "../layout/Alert";
import PrivateRoute from "../routing/PrivateRoute";
import Dashboard from "../dashboard/Dashboard";
import Groups from "../groups/Groups";
import Group from "../group/Group";
import NotFound from "../layout/NotFound";
import CreateGroup from "../groups-forms/CreateGroup";
import EditGroup from "../groups-forms/EditGroup";

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/groups" component={Groups} />
        <Route exact path="/groups/:id" component={Group} />

        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-group" component={CreateGroup} />
        <PrivateRoute exact path="/edit-group" component={EditGroup} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
