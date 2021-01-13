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
    <form className="form-group">
      <div className="d-flex flex-row justify-content-center">
        <div className="form-group col">
          <p className="font-weight-bold">Insert title</p>
          <input
            className="form-control text-center"
            type="text"
            required
            onChange={debounce((event) => setTitle(event.target.value), 300)}
          />
        </div>
        <div className="form-group col">
          <p className="font-weight-bold">Year</p>
          <input
            className="form-control text-center"
            type="number"
            min="1900"
            max="2100"
            onChange={(event) => setYear(event.target.value)}
          />
        </div>
        <div className="">
          <p className="font-weight-bold">Type</p>
          <div onChange={(event) => setType(event.target.value)}>
            <div className="form-check-inline mt-2">
              <input
                className="form-check-input"
                type="radio"
                id="type1"
                name="type"
                value=""
                defaultChecked
              />
              <label htmlFor="type1" className="form-check-label">
                Any
              </label>
            </div>
            <div className="form-check-inline mt-2">
              <input
                className="form-check-input"
                type="radio"
                id="type2"
                name="type"
                value="movie"
              />
              <label htmlFor="type2" className="form-check-label">
                Movie
              </label>
            </div>
            <div className="form-check-inline mt-2">
              <input
                className="form-check-input"
                type="radio"
                id="type3"
                name="type"
                value="series"
              />
              <label htmlFor="type3" className="form-check-label">
                Series
              </label>
            </div>
            <div className="form-check-inline mt-2">
              <input
                className="form-check-input"
                type="radio"
                id="type4"
                name="type"
                value="episode"
              />
              <label htmlFor="type4" className="form-check-label">
                Episode
              </label>
            </div>
            <div className="form-check-inline mt-2">
              <input
                className="form-check-input"
                type="radio"
                id="type5"
                name="type"
                value="game"
              />
              <label htmlFor="type5" className="form-check-label">
                Game
              </label>
            </div>
          </div>
        </div>
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
