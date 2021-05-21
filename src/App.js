// src/app.js

import React, { useContext, useEffect } from "react";
import "./App.less";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Events from "./Pages/Events/Events.js";

const App = () => {
  return (
    <div div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/events"></Redirect>
          </Route>
          <Route exact path="/events" component={Events}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
