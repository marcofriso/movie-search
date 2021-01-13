import React from "react";
import PropTypes from "prop-types";

function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const Search = (props) => {
  const setTitle = (data) => {
    props.inputTitle(data);
    props.inputPage(1);
  };
  const setYear = (data) => {
    props.inputYear(data);
    props.inputPage(1);
  };
  const setType = (data) => {
    props.inputType(data);
    props.inputPage(1);
  };

  return (
    <form>
      <p>Insert title</p>
      <input
        type="text"
        required
        onChange={debounce((event) => setTitle(event.target.value), 300)}
      />
      <p>Year</p>
      <input
        type="number"
        min="1900"
        max="2100"
        onChange={(event) => setYear(event.target.value)}
      />
      <p>Type</p>
      <div onChange={(event) => setType(event.target.value)}>
        <input
          className="form-check-input"
          type="radio"
          id="type1"
          name="type"
          value=""
          defaultChecked
        />
        Any
        <input
          className="form-check-input"
          type="radio"
          id="type2"
          name="type"
          value="movie"
        />
        Movie
        <input
          className="form-check-input"
          type="radio"
          id="type3"
          name="type"
          value="series"
        />
        Series
        <input
          className="form-check-input"
          type="radio"
          id="type4"
          name="type"
          value="episode"
        />
        Episode
        <input
          className="form-check-input"
          type="radio"
          id="type4"
          name="type"
          value="game"
        />
        Game
      </div>
    </form>
  );
};

Search.propTypes = {
  inputTitle: PropTypes.func.isRequired,
  inputYear: PropTypes.func.isRequired,
  inputType: PropTypes.func.isRequired,
  inputPage: PropTypes.func.isRequired,
};

export default Search;
