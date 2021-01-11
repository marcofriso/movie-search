import React, { useState, useEffect } from "react";
import Search from "./Search";
import "./App.css";

const App = () => {
  const [title, setTitle] = useState();
  const [year, setYear] = useState();
  const [type, setType] = useState();
  const [res, setRes] = useState();

  useEffect(() => {
    let params = {
      apikey: process.env.REACT_APP_API_KEY,
    };

    if (year) {
      params.year = year;
    }
    if (type) {
      params.type = type;
    }
    if (title) {
      params.t = title + "*";
    }

    fetch("https://www.omdbapi.com/?" + new URLSearchParams(params))
      .then((response) => response.json())
      .then((response) => {
        setRes(response);
      })
      .catch((error) => console.log(error));
  }, [year, type, title]);

  return (
    <div className="App">
      <h1>Movies Search</h1>
      <Search
        inputTitle={(data) => setTitle(data)}
        inputYear={(data) => setYear(data)}
        inputType={(data) => setType(data)}
      />
      <p>{JSON.stringify(res)}</p>
    </div>
  );
};

export default App;
