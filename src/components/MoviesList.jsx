import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MoviesList = (props) => {
  const { res, page } = props;
  const setPage = (data) => props.inputPage(data);

  const maxPage = Math.ceil(res.totalResults / 10);
  const minusPageButtonDisable = page === 1;
  const plusPageButtonDisable = page === maxPage;

  return (
    <div>
      <div className="mb-3">
        {res.Search.map((movie) => (
          <div key={movie.imdbID}>
            <Link
              to={`/movie/${movie.imdbID}`}
              className="result-link d-flex flex-row justify-content-center align-items-center"
            >
              <div className="col mx-3 mt-2 lead text-dark">
                <p>Title: {movie.Title}</p>
                <p>Year: {movie.Year}</p>
                <p>imdbID: {movie.imdbID}</p>
                <p>Type: {movie.Type}</p>
              </div>
              <div className="mx-3 my-2">
                {movie.Poster === "N/A" ? (
                  <p className="alt-image lead text-dark">N/A</p>
                ) : (
                  <img
                    className="img-movies-list lead text-dark"
                    src={movie.Poster}
                    alt=""
                  />
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <nav>
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <p className="mb-3 px-3 py-2">PAGE</p>
          </li>
          <li className="page-item">
            <button
              className="page-link text-dark"
              type="submit"
              disabled={minusPageButtonDisable}
              onClick={() => setPage(page - 1)}
            >
              -
            </button>
          </li>
          <li className="page-item">
            <p className="page-link text-dark">
              {page}/{maxPage}
            </p>
          </li>
          <li className="page-item">
            <button
              className="page-link text-dark"
              type="submit"
              disabled={plusPageButtonDisable}
              onClick={() => setPage(page + 1)}
            >
              +
            </button>
          </li>
        </ul>
      </nav>
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
