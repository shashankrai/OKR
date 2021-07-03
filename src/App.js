import React, { useState, useEffect } from 'react';
import map from 'lodash/map';
import filter from 'lodash/filter';
import indexOf from 'lodash/indexOf';
import findIndex from 'lodash/findIndex';
import './App.scss';
import TreeView from './okrView';
import uuid from 'react-uuid'


const App = () => {
  let [isOpen, setIsOpen] = useState(true);
  let [filters, setFilter] = useState([]);
  let [selectedfilter, setSelected] = useState('');
  let [allData, setAllData] = useState([]);
  let [filteredData, setFilteredData] = useState([]);


  useEffect(() => {
    fetch('https://okrcentral.github.io/sample-okrs/db.json')
      .then(results => results.json())
      .then(data => {
        customizeData(data.data);
      });
  }, []);

  useEffect(() => {
    const updatedParents = filter(allData, (item) => item.parent_objective_id === '' && item.category === selectedfilter);
    const updated = getChildData(updatedParents, allData);
    setFilteredData(updated);
  }, [selectedfilter]);

  useEffect(() => {
 
  }, [isOpen]);


  const getChildData = (parents, allData) => {
    return map(parents, (item) => {
      const id = item.id;
      item.open = true;
      const preentdata = item;
      const data = filter(allData, (item) => item.parent_objective_id === id);
      return {
        parents: preentdata,
        child: data
      }
    });
  }
  const customizeData = (allData) => {
    setAllData(allData);
    const filterArray = [];
    map(allData, (item) => {
      if (indexOf(filterArray, item.category) === -1) {
        filterArray.push(item.category);
      }
    });
    setFilter(filterArray);
    const getParents = filter(allData, (item) => item.parent_objective_id === '');
    const getstrured = getChildData(getParents, allData);
    setFilteredData(getstrured);
  };

  const onToggle = (item) => {
    const index =findIndex(filteredData, ['parents.id' , item.id]);
    filteredData[index].parents.open = !filteredData[index].parents.open;
    setFilteredData(filteredData);
    setIsOpen(s => !s);
  }

  const handleChange = (e) => {
    setSelected(e.target.value);
  }


  return (
    <div className="App">
      <div className ="filter">
        <label> Select filters :</label>
        <select value={selectedfilter} onChange={handleChange}>
          {map(filters, (item) => {
            return <option name={item} value={item} key ={uuid()}> {item}</option>
          }
          )}
        </select>
      </div>
      <TreeView allData={filteredData} onToggle={onToggle} isOpen ={isOpen} ></TreeView>
    </div>
  );
}

export default App;
