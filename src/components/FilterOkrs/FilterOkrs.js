import React from 'react';
import PropTypes from 'prop-types';
import './filterOkrs.scss';

/*
  The component is used for filtering data 
*/
const FilterOkrs = ({ selectedfilter, onChange, label, filters }) => {
  return (
    <div className="filter">
      <label> {label} </label>
      <select value={selectedfilter} onChange={onChange}>
        {filters.map((filter) => {
          return (
            <option value={filter.category} key={filter.id}>
              {filter.category}
            </option>
          );
        })}
      </select>
    </div>
  );
};

FilterOkrs.propTypes = {
  selectedfilter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  filters: PropTypes.array.isRequired,
};

export default FilterOkrs;
