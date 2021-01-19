import React, { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const StoreContext = createContext(null);
export const useStoreContext = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [params, setParams] = useState({
    page: 1,
    s: "",
    y: "",
    type: "",
  });
  // const [user, setUser] = useState("");

  const store = {
    params,
    // user,
    setParams,
    // setUser,
  };

  StoreProvider.propTypes = {
    children: PropTypes.symbol.isRequired,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
