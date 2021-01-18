/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import "./App.css";
import Home from "./components/Home";
import Movie from "./components/Movie";
import Header from "./components/Header";
import Signup from "./components/Signup";
import Login from "./components/Login";

const PublicRoute = ({ path, render, user }) => {
  if (user) {
    return <Redirect to="/" />;
  }
  return <Route path={path} render={render} />;
};

PublicRoute.propTypes = {
  path: PropTypes.string.isRequired,
  user: PropTypes.string,
  render: PropTypes.func.isRequired,
};

PublicRoute.defaultProps = {
  user: "",
};

const PrivateRoute = ({ path, component, exact, user }) => {
  if (user) {
    return <Route component={component} path={path} exact={exact} />;
  }
  return <Redirect to="/login" />;
};

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func,
  exact: PropTypes.bool,
  user: PropTypes.string.isRequired,
};

PrivateRoute.defaultProps = {
  component: undefined,
  exact: false,
};

const NotFoundPage = () => (
  <div className="h5 text-dark">
    404! -{" "}
    <Link to="/">
      <u className="text-dark">Go home</u>
    </Link>
  </div>
);

const App = () => {
  const [user, setUser] = useState("");

  return (
    <BrowserRouter>
      <div className="App px-3">
        <Header user={user} inputUser={(data) => setUser(data)} />
        <Switch>
          <PublicRoute
            path="/signup"
            user={user}
            render={(props) => (
              <Signup {...props} inputUser={(data) => setUser(data)} />
            )}
          />
          <PublicRoute
            path="/login"
            user={user}
            render={(props) => (
              <Login {...props} inputUser={(data) => setUser(data)} />
            )}
          />
          <PrivateRoute user={user} path="/" component={Home} exact />
          <PrivateRoute user={user} path="/movie/:id" component={Movie} exact />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
