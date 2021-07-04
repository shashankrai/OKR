import React, { useState, useEffect, useCallback } from "react";
import map from "lodash/map";
import filter from "lodash/filter";
import indexOf from "lodash/indexOf";
import findIndex from "lodash/findIndex";
import TreeView from "./components/OkrView";
import FilterComponets from "./components/Filter";
import "./App.scss";
import getChildData from "./utill";
import { GET_OKR } from './config'
import { LOCALE } from './constants'

const App = () => {

  const [isOpen, setIsOpen] = useState(true);
  const [filters, setFilter] = useState([]);
  const [selectedfilter, setSelected] = useState("");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");

  
  const customizeData = useCallback((allData) => {
    setAllData(allData);
    const filterArray = [];
    map(allData, (item) => {
      if (indexOf(filterArray, item.category) === -1) {
        filterArray.push(item.category);
      }
    });
    setFilter(filterArray);
    const getParents = filter(
      allData,
      (item) => item.parent_objective_id === ""
    );
    const getstrured = getChildData(getParents, allData);
    setFilteredData(getstrured);
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
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [customizeData]);

  /*
The hook below will keep  checking is any filter is applied if applied it updated and render.
*/

  useEffect(() => {
    const updatedParents = filter(
      allData,
      (item) =>
        item.parent_objective_id === "" && item.category === selectedfilter
    );
    const updated = getChildData(updatedParents, allData);
    setFilteredData(updated);
  }, [selectedfilter, allData]);

  /*
    The fuction below will called when toogle is to update the component.
*/

  useEffect(() => {
  }, [isOpen]);

  /*
    The fuction below will called when toogle is done on parents.
*/

  const onToggle = (item) => {
    const index = findIndex(filteredData, ["parents.id", item.id]);
    filteredData[index].parents.open = !filteredData[index].parents.open;
    setFilteredData(filteredData);
    setIsOpen((s) => !s);
  };

  /*
  The function update seleted filter.
*/

  const handleChange = (e) => {
    setSelected(e.target.value);
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
            <FilterComponets
              label={LOCALE.FILTER}
              onChange={handleChange}
              selectedfilter={selectedfilter}
              filters={filters}
            ></FilterComponets>
            <TreeView
              allData={filteredData}
              onToggle={onToggle}
              isOpen={isOpen}
              loader={loader}
            ></TreeView>
          </>
        )}
    </div>
  );
};

export default App;
