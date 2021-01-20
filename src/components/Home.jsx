import React, { useState, useEffect } from "react";
import { useStoreContext } from "../utils/Store";
import Search from "./Search";
import MoviesList from "./MoviesList";

const App = () => {
  const { params } = useStoreContext();
  const [res, setRes] = useState();

  useEffect(() => {
    if (!params.s) return <p className="h4">Please enter a title</p>;

    const apiParams = {
      page: params.page,
      s: params.s,
    };

    if (params.y) {
      apiParams.y = params.y;
    }
    if (params.type) {
      apiParams.type = params.type;
    }

    return fetch("http://localhost:3001/search", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiParams),
    })
      .then((response) => response.json())
      .then((response) => {
        setRes(response);
      })
      .catch((error) => console.log("FE-API ERROR", error));
  }, [params]);

  return (
    <div className="Home">
      <Search />
      {!params.s ? (
        <p className="h4">Please enter a title</p>
      ) : res && res.Response === "True" ? (
        <MoviesList res={res} />
      ) : (
        res && <p className="h4">{res.Error}</p>
      )}
    </div>
  );
};

export default App;
