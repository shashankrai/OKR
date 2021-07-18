import React, { useState, useEffect, useCallback } from 'react';
import TreeView from '../TreeView/TreeView';
import FilterOkrs from '../FilterOkrs/FilterOkrs';
import getChildData from '../../tools/utils';
import GET_OKR from '../../tools/config';
import { LOCALE } from '../../tools/constants';
import './App.scss';

const App = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [okrFilter, setOkrFilter] = useState([]);
  const [selectedfilter, setSelectedfilter] = useState('');
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');

  const customizeData = useCallback((okrs) => {
    setAllData(okrs);
    const okrFilters = [];
    let id = 0;
    okrs.map((item) => {
      const { category } = item;
      const isExist = okrFilters.findIndex((value) => value.category === category);
      if (isExist < 0) {
        id += 1;
        okrFilters.push({ category, id });
      }
      return okrFilters;
    });
    setOkrFilter(okrFilters);
    const getOkr = okrs.filter((item) => item.parent_objective_id === '');
    const getChildOkr = getChildData(getOkr, okrs);
    setFilteredData(getChildOkr);
  }, []);

  /*
The hook will fetch data from api and formated it custimized structure.
handle loader 
handle error 
handle success
on firstime load  it is called
and set the global data for components
*/

  useEffect(() => {
    const API_ERROR = { LOCALE };
    fetch(GET_OKR)
      .then((results) => {
        if (!results.ok) {
          setLoader(false);
          throw new Error(API_ERROR);
        }
        return results.json();
      })
      .then((data) => {
        customizeData(data.data);
        setLoader(false);
        setError('');
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [customizeData]);

  /*
The hook below will keep  checking is any filter is applied if applied it updated and render.
*/

  useEffect(() => {
    const updatedParents = allData.filter((item) => item.parent_objective_id === '' && item.category === selectedfilter);
    const updated = getChildData(updatedParents, allData);
    setFilteredData(updated);
  }, [selectedfilter, allData]);

  /*
    The fuction below will called when toogle is to update the component.
*/

  useEffect(() => {}, [isOpen]);

  /*
    The fuction below will called when toogle is done on parents.
*/

  const handleToggle = (item) => {
    const index = filteredData.findIndex(filteredData, ['parents.id', item.id]);
    filteredData[index].parents.open = !filteredData[index].parents.open;
    setFilteredData(filteredData);
    setIsOpen((s) => !s);
  };

  /*
  The function update seleted filter.
*/

  const handleChange = (e) => {
    setSelectedfilter(e.target.value);
  };

  /*
 component rendering 
*/

  return (
    <div className="appContainer">
      {error ? (
        <div className="error"> {error} </div>
      ) : (
        <>
          <FilterOkrs
            label={LOCALE.FILTER}
            onChange={handleChange}
            selectedfilter={selectedfilter}
            filters={okrFilter}
          ></FilterOkrs>
          <TreeView allData={filteredData} onToggle={handleToggle} isOpen={isOpen} loader={loader}></TreeView>
        </>
      )}
    </div>
  );
};

export default App;
