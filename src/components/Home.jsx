import React, { useState, useEffect } from "react";
import Search from "./Search";
import MoviesList from "./MoviesList";

const App = () => {
  const [title, setTitle] = useState();
  const [year, setYear] = useState();
  const [type, setType] = useState();
  const [res, setRes] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const params = {
      page,
    };

    if (year) {
      params.y = year;
    }
    if (type) {
      params.type = type;
    }
    if (title) {
      params.s = title;
    }

    fetch("http://localhost:3001/search", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((response) => {
        setRes(response);
      })
      .catch((error) => console.log("FE-API ERROR", error));
  }, [year, type, title, page]);

  return (
    <div className="Home">
      <Search
        inputTitle={(data) => setTitle(data)}
        inputYear={(data) => setYear(data)}
        inputType={(data) => setType(data)}
        inputPage={(data) => setPage(data)}
      />
      {res && res.Response === "True" ? (
        <MoviesList res={res} page={page} inputPage={(data) => setPage(data)} />
      ) : (
        res && <p className="h4">{res.Error}</p>
      )}
    </div>
  );
};

export default App;
