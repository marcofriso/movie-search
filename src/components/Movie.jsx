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
    Object.keys(movie).filter((key) => key !== "Poster" && key !== "Ratings");

  return (
    <div>
      {movie && (
        <div>
          <div>
            {filteredProps.map((pr) => (
              <p key={pr}>
                {pr}: {movie[pr]}
              </p>
            ))}
          </div>
          {movie.Ratings && (
            <ul>
              {movie.Ratings.map((rating) => (
                <li key={rating.Source}>
                  Source: {rating.Source} <br />
                  Value: {rating.Value} <br />
                </li>
              ))}
            </ul>
          )}
          <div>
            {movie.Poster === "N/A" ? (
              "N/A"
            ) : (
              <img src={movie.Poster} alt="N/A" />
            )}
          </div>
        </div>
      )}
      <button
        type="submit"
        onClick={() => {
          history.goBack();
        }}
      >
        Go Back
      </button>
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
