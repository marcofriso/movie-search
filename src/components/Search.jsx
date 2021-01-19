import React from "react";
import { useStoreContext } from "../utils/Store";

// see if it is possible to reintroduce "debounce" functionality

const Search = () => {
  const { params, setParams } = useStoreContext();

  const onChange = (e) => {
    const { value, name } = e.target;
    const searchParams = { ...params };
    searchParams[name] = value;

    setParams(searchParams);
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
            value={params.s}
            name="s"
            onChange={onChange}
          />
        </div>
        <div className="form-group col">
          <p className="font-weight-bold">Year</p>
          <input
            className="form-control text-center"
            type="number"
            min="1880"
            max="2100"
            value={params.y}
            name="y"
            onChange={onChange}
          />
        </div>
        <div>
          <p className="font-weight-bold">Type</p>
          <div name="type">
            <div className="form-check-inline mt-2">
              <input
                className="form-check-input"
                type="radio"
                id="type1"
                name="type"
                value=""
                checked={params.type === ""}
                onChange={onChange}
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
                checked={params.type === "movie"}
                onChange={onChange}
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
                checked={params.type === "series"}
                onChange={onChange}
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
                checked={params.type === "episode"}
                onChange={onChange}
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
                checked={params.type === "game"}
                onChange={onChange}
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

export default Search;
