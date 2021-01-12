import React, { useState, useEffect } from "react";
import Search from "./Search";
import MoviesList from "./MoviesList";
import "./Home.css";

const App = () => {
  const [title, setTitle] = useState();
  const [year, setYear] = useState();
  const [type, setType] = useState();
  const [res, setRes] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const params = {
      apikey: process.env.REACT_APP_API_KEY,
    };

    params.page = page;

    if (year) {
      params.year = year;
    }
    if (type) {
      params.type = type;
    }
    if (title) {
      params.s = title;
    }

    console.log(`https://www.omdbapi.com/?${new URLSearchParams(params)}`);

    fetch(`https://www.omdbapi.com/?${new URLSearchParams(params)}`)
      .then((response) => response.json())
      .then((response) => {
        setRes(response);
      })
      .catch((error) => console.log(error));
  }, [year, type, title, page]);

  return (
    <div className="Home">
      <Search
        inputTitle={(data) => setTitle(data)}
        inputYear={(data) => setYear(data)}
        inputType={(data) => setType(data)}
      />
      {res && res.Response === "True" ? (
        <MoviesList res={res} page={page} inputPage={(data) => setPage(data)} />
      ) : (
        <p>{res && res.Error}</p>
      )}
    </div>
  );
};

export default App;
