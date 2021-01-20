/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import "./App.css";
import { useStoreContext } from "./utils/Store";
import Home from "./components/Home";
import Movie from "./components/Movie";
import Header from "./components/Header";
import Signup from "./components/Signup";
import Login from "./components/Login";

// routes
const PublicRoute = ({ path, component, user }) => {
  if (user) {
    return <Redirect to="/" />;
  }
  return <Route path={path} component={component} />;
};

PublicRoute.propTypes = {
  path: PropTypes.string.isRequired,
  user: PropTypes.string,
  component: PropTypes.func.isRequired,
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

// components
const NotFoundPage = () => (
  <div className="h5 text-dark">
    404! -{" "}
    <Link to="/">
      <u className="text-dark">Go home</u>
    </Link>
  </div>
);

const App = () => {
  const { user, setUser } = useStoreContext();

  return (
    <BrowserRouter>
      <div className="App px-3">
        <Header user={user} inputUser={(data) => setUser(data)} />
        <Switch>
          <PublicRoute path="/signup" user={user} component={Signup} />
          <PublicRoute path="/login" user={user} component={Login} />
          <PrivateRoute user={user} path="/" component={Home} exact />
          <PrivateRoute user={user} path="/movie/:id" component={Movie} exact />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
