import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  const history = useHistory();
  const setUser = (data) => props.inputUser(data);

  const { user } = props;
  const handleClick = (event) => {
    setUser("");
    history.push("/login");
    event.preventDefault();
  };

  return (
    <div className="d-flex justify-content-start mt-3">
      <h1 className="display-3 itemcenter">Movie Search</h1>
      {user && (
        <div className="itemright">
          <p className="h2 mt-3 mr-4">
            <span role="img" aria-label="ciak">
              &#x1F3AC;
            </span>{" "}
            {user}
          </p>
          <a
            role="button"
            onClick={handleClick}
            onKeyPress={() => {}}
            tabIndex="0"
            className="h5 text-dark mt-2 mr-3 btn-logout"
          >
            <u>Log out</u>
          </a>
        </div>
      )}
    </div>
  );
};

Header.propTypes = {
  user: PropTypes.string.isRequired,
  inputUser: PropTypes.func.isRequired,
};

export default Header;
