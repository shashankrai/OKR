import React, { useState, useEffect } from "react";
import map from "lodash/map";
import filter from "lodash/filter";
import indexOf from "lodash/indexOf";
import findIndex from "lodash/findIndex";
import TreeView from "./components/okrView";
import FilterComponets from "./components/filter";
import "./App.scss";

const App = () => {
  /*
    The initial value of componet variable .
  */
  const [isOpen, setIsOpen] = useState(true);
  const [filters, setFilter] = useState([]);
  const [selectedfilter, setSelected] = useState("");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");

  /*
  The hook will fetch data from api and formated it custimized structure.
  handle loader 
  handle error 
  handle success
  on firstime load  it is called
  and set the global data for components
  */
  useEffect(() => {
    fetch("https://okrcentral.github.io/sample-okrs/db.json")
      .then((results) => {
        if (!results.ok) {
          setLoader(false);
          throw new Error("Error in fetching data from api");
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
  }, []);
  /*
  The hook below will keep  checking is any filter is applied if applied it updated and render .
  */
  useEffect(() => {
    const updatedParents = filter(
      allData,
      (item) =>
        item.parent_objective_id === "" && item.category === selectedfilter
    );
    const updated = getChildData(updatedParents, allData);
    setFilteredData(updated);
  }, [selectedfilter]);

  useEffect(() => {
    console.log("Toggling is done on parents");
  }, [isOpen]);

  /*
  The function is used for data formattting of api response.
  */
  const getChildData = (parents, allData) => {
    return map(parents, (item) => {
      const id = item.id;
      item.open = true;
      const preentdata = item;
      const data = filter(allData, (item) => item.parent_objective_id === id);
      return {
        parents: preentdata,
        child: data,
      };
    });
  };
  const customizeData = (allData) => {
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
  };
  /*
    The fuction below will called when  toogle is done on  parents .
  */
  const onToggle = (item) => {
    const index = findIndex(filteredData, ["parents.id", item.id]);
    filteredData[index].parents.open = !filteredData[index].parents.open;
    setFilteredData(filteredData);
    setIsOpen((s) => !s);
  };
  /*
    The function update seleted filter .
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
            label={"Select Filter"}
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
