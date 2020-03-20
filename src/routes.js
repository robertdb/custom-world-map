import React from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
import ScrollToTop from "./components/ScrollTop";
import Main from "./container/Main";
import World from "./container/World";

export default props => (
  <HashRouter>
    <ScrollToTop>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/map" component={World} />
      </Switch>
    </ScrollToTop>
  </HashRouter>
);
