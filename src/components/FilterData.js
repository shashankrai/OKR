import React from "react";
import map from "lodash/map";
import uuid from "react-uuid";
import PropTypes from "prop-types";
import "../components/components.scss";

 /*
  The component is used for filtering data 
*/
const FilterComponets = ({ selectedfilter, onChange, label, filters }) => {
  return (
    <div className="filter">
      <label> {label} </label>
      <select value={selectedfilter} onChange={onChange}>
        {map(filters, (item) => {
          return (
            <option name={item} value={item} key={uuid()}>
              {" "}
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

FilterComponets.propTypes = {
  selectedfilter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  filters: PropTypes.array.isRequired,
};

export default FilterComponets;