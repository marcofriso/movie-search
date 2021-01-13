import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Movie from "./components/Movie";

const App = () => (
  <BrowserRouter>
    <div className="App">
      <h1>Movies Search</h1>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/movie/:id" component={Movie} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
