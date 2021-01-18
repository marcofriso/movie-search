import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const Login = (props) => {
  const history = useHistory();
  const setUser = (data) => props.inputUser(data);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    fetch("http://localhost:3001/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          setUser(user.name);
          history.push("/");
        } else {
          setErrorMessage("Incorrect login data");
          console.log("FE - USER NOT FOUND");
        }
      })
      .catch((err) => {
        console.log("FE - LOGIN API ERROR", err);
      });

    event.preventDefault();
  };

  return (
    <div className="container">
      <div className="col">
        <div className="row justify-content-center">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h3 className="h3 mt-3">Login</h3>
            <div className="form-group mt-3">
              <label className="lead" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(event) => {
                  setEmail(event.target.value);
                  setErrorMessage("");
                }}
              />
            </div>
            <div className="form-group">
              <label className="lead" htmlFor="passwoerd">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(event) => {
                  setPassword(event.target.value);
                  setErrorMessage("");
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-lg btn-outline-dark btn-block mt-5"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="row justify-content-center">
          <Link to="/signup" className="h5 text-dark mt-4">
            <u>Sign up</u>
          </Link>
        </div>
        {errorMessage && (
          <div className="row justify-content-center">
            <div className="alert alert-danger signup-error-message mt-3">
              <b>{errorMessage}</b>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Login.propTypes = {
  inputUser: PropTypes.func.isRequired,
};

export default Login;
