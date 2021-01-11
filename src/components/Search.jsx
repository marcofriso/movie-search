import React from "react";
import PropTypes from "prop-types";

const Search = (props) => {
  const setTitle = (data) => props.inputTitle(data);
  const setYear = (data) => props.inputYear(data);
  const setType = (data) => props.inputType(data);

  return (
    <div>
      <p>Insert title</p>
      <input type="text" onChange={(event) => setTitle(event.target.value)} />
      <p>Year</p>
      <input type="text" onChange={(event) => setYear(event.target.value)} />
      <p>Type</p>
      <input type="text" onChange={(event) => setType(event.target.value)} />
    </div>
  );
};

Search.propTypes = {
  inputTitle: PropTypes.func.isRequired,
  inputYear: PropTypes.func.isRequired,
  inputType: PropTypes.func.isRequired,
};

export default Search;
