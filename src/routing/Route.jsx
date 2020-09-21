import React from "react";
import { Route, Switch } from "react-router-dom";
import Homepage from "../components/Homepage";
import Portfolio from "../components/Portfolio";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Homepage}></Route>
        <Route exact path="/:id" component={Portfolio}></Route>
        <Route component={Homepage} />
      </Switch>
    </>
  );
};

export default Routes;
