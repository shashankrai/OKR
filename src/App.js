import React, { useState, useEffect } from 'react';
import map from 'lodash/map';
import filter from 'lodash/filter';
import indexOf from 'lodash/indexOf';

import './App.scss';


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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const updatedParents = filter(allData, (item) => item.parent_objective_id == '' && item.category == selectedfilter);
    const updated = getChildData(updatedParents);
    setFilteredData(updated);
  }, [selectedfilter]);

  const getChildData = (parents) => {
    return map(parents, (item) => {
      const id = item.id;
      item.open = true;
      const preentdata = item;
      const data = filter(allData, (item) => item.parent_objective_id == id);
      return {
        parents: preentdata,
        child: data
      }
    });
  }
  const customizeData = (allData) => {
    const filterArray = [];
    map(allData, (item) => {
      if (indexOf(filterArray, item.category) === -1) {
        filterArray.push(item.category);
      }
    });
    setFilter(filterArray);
    const getParents = filter(allData, (item) => item.parent_objective_id == '');
    const getstrured = getChildData(getParents);
    setAllData(allData);
    setFilteredData(getstrured);
  };

  const onToggle = (isOpen) => {
    setIsOpen(s => !s);
  }

  const handleChange = (e) => {
    console.log("selected", e.target.value);
    setSelected(e.target.value);
  }


  return (
    <div className="App">
      <div>
        <select value={selectedfilter} onChange={handleChange}>
          {map(filters, (item) => {
            console.log("filterdata",filteredData);
            return <option name={item} value={item}> {item}</option>
          }
          )}
        </select>
      </div>
      <ul class="wtree">
        <li>
          <h4 className="panel-title">
            <a href="#"
              onClick={() => onToggle(isOpen)} >Collapsible list group</a>
          </h4>
          <div className={isOpen ? "panel-collapse" : "panel-collapse panel-close"} >
            <ul>
              <li>
                <span>Nivel 2</span>
              </li>
              <li>
                <span>Nivel 2</span>
              </li>
              <li>
                <span>Nivel 2</span>
              </li>
              <li>
                <span>Nivel 2</span>
              </li>
              <li>
                <span>Nivel 2</span>
              </li>
            </ul>
          </div>
        </li>

        <li>
          <h4 className="panel-title">
            <a href="#"
              onClick={() => onToggle(isOpen)} >Collapsible list group</a>
          </h4>
          <div className={isOpen ? "panel-collapse" : "panel-collapse panel-close"} >

            <ul>
              <li>
                <span>Nivel 2</span>
              </li>
              <li>
                <span>Nivel 2</span>
              </li>
              <li>
                <span>Nivel 2</span>
              </li>
              <li>
                <span>Nivel 2</span>
              </li>
              <li>
                <span>Nivel 2</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>

    </div>
  );
}

export default App;
