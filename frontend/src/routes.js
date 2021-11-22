import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Logon from "./pages/InitialPage";
import secondPage from "./pages/SecondPage";
import Register from "./pages/registerPage";
export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/secondpage" exact component={secondPage} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </BrowserRouter>
  );
}
