import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStoreContext } from "../utils/Store";

const Signup = () => {
  const history = useHistory();
  const { setUser } = useStoreContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onChange = (e) => {
    const { value, id } = e.target;
    if (id === "name") setName(value);
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
    if (id === "repeatedPassword") setRepeatedPassword(value);

    setErrorMessage("");
  };

  const handleSubmit = (event) => {
    if (!name) setErrorMessage("Please insert a name");
    if (!email) setErrorMessage("Please insert an email");
    if (!password) setErrorMessage("Please insert a password");
    if (password !== repeatedPassword)
      setErrorMessage("Please repeat the same password");

    if (name && email && password && password === repeatedPassword) {
      fetch("http://localhost:3001/signup", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
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
            setErrorMessage("Email already in the database");
          }
        })
        .catch((err) => {
          console.log("FE - SIGNUP API ERROR", err);
        });
    }

    event.preventDefault();
  };

  return (
    <div className="container">
      <div className="col">
        <div className="row justify-content-center">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h3 className="h3 mt-3">Sign up</h3>
            <div className="form-group mt-3">
              <label className="lead" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter name"
                onChange={onChange}
              />
            </div>
            <div className="form-group mt-3">
              <label className="lead" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter email"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label className="lead" htmlFor="passwoerd">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter password"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label className="lead" htmlFor="repeatedPassword">
                Repeat Password
              </label>
              <input
                type="password"
                id="repeatedPassword"
                className="form-control"
                placeholder="Enter password"
                onChange={onChange}
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
          <Link to="/login" className="h5 text-dark mt-4">
            <u>Log in</u>
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

export default Signup;
