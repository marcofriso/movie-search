import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Movie from "./components/Movie";
import Header from "./components/Header";

const App = () => (
  <BrowserRouter>
    <div className="App px-3">
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/movie/:id" component={Movie} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
