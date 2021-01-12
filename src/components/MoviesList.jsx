import React from "react";
import PropTypes from "prop-types";

const MoviesList = ({ res }) => (
  <ul>
    {Array.isArray(res.Search) && "HI"}
    {res.Search.map((movie) => (
      <li>
        <div>
          <p>Title: {movie.Title}</p>
          <p>Year: {movie.Year}</p>
          <p>imdbID: {movie.imdbID}</p>
          <p>Type: {movie.Type}</p>
        </div>
        <div>
          {movie.Poster === "N/A" ? (
            "N/A"
          ) : (
            <img src={movie.Poster} alt="N/A" />
          )}
        </div>
      </li>
    ))}
  </ul>
);

MoviesList.propTypes = {
  // eslint-disable-next-line
  res: PropTypes.object,
};

export default MoviesList;
