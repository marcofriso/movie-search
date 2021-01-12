import React from "react";
import PropTypes from "prop-types";

const MoviesList = (props) => {
  const { res, page } = props;
  const setPage = (data) => props.inputPage(data);

  const maxPage = Math.ceil(res.totalResults / 10);
  const minusPageButtonDisable = page === 1;
  const plusPageButtonDisable = page === maxPage;

  return (
    <div>
      <ul>
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
      <div>
        PAGE:
        <button
          type="submit"
          disabled={minusPageButtonDisable}
          onClick={() => setPage(page - 1)}
        >
          -
        </button>
        {page}
        <button
          type="submit"
          disabled={plusPageButtonDisable}
          onClick={() => setPage(page + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

MoviesList.propTypes = {
  // eslint-disable-next-line
  res: PropTypes.object,
  page: PropTypes.number.isRequired,
  inputPage: PropTypes.func.isRequired,
};

export default MoviesList;
