import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { PropTypes } from "prop-types";

const Movie = (props) => {
  const history = useHistory();
  const [movie, setMovie] = useState();

  // eslint-disable-next-line react/destructuring-assignment
  const { id } = props.match.params;

  useEffect(() => {
    const params = {
      apikey: process.env.REACT_APP_API_KEY,
      i: id,
    };

    console.log(`https://www.omdbapi.com/?${new URLSearchParams(params)}`);

    fetch(`https://www.omdbapi.com/?${new URLSearchParams(params)}`)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const filteredProps =
    movie &&
    Object.keys(movie).filter(
      (key) => key !== "Poster" && key !== "Ratings" && key !== "Title"
    );

  return (
    <div>
      {movie && (
        <div className="mb-4">
          <p className="display-4">{movie.Title}</p>
          <div className="d-flex flex-row justify-content-center align-items-center">
            <div className="col mx-3 mt-2">
              {filteredProps.map((pr) => (
                <p key={pr}>
                  <strong>{pr}: </strong>
                  {movie[pr]}
                </p>
              ))}
              {movie.Ratings && (
                <div>
                  <strong>Ratings:</strong> <br />
                  {movie.Ratings.map((rating) => (
                    <div key={rating.Source}>
                      Source: {rating.Source} <br />
                      Value: {rating.Value} <br />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mx-3 my-2">
              {movie.Poster === "N/A" ? (
                <p className="alt-image lead text-dark">N/A</p>
              ) : (
                <img
                  className="img-movie lead text-dark"
                  src={movie.Poster}
                  onError="this.style.display='none'"
                  alt="N/A"
                />
              )}
            </div>
          </div>
        </div>
      )}
      <nav className="pagination justify-content-center mb-4">
        <button
          className="page-link text-dark"
          type="submit"
          onClick={() => {
            history.goBack();
          }}
        >
          GO BACK
        </button>
      </nav>
    </div>
  );
};

Movie.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
};

Movie.defaultProps = {
  match: {},
};

export default Movie;
