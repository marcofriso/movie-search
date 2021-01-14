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

    fetch("http://localhost:3001/search", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((response) => {
        setMovie(JSON.parse(response));
      })
      .catch((error) => console.log("FE-API2 ERROR", error));
  }, [id]);

  const filteredProps =
    movie &&
    Object.keys(movie).filter(
      (key) => key !== "Poster" && key !== "Ratings" && key !== "Title"
    );

  return (
    <div>
      {movie ? (
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
                      {rating.Source}: {rating.Value}
                      <br />
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
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="h4">Loading...</div>
      )}
      <nav className="pagination justify-content-center fixed-bottom bg-white pt-2 pb-4">
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
