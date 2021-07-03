import React from 'react';
import map from 'lodash/map';
import './App.scss';
import uuid from 'react-uuid'


const TreeView = ({ allData, onToggle }) => {
  const alpha = 'abcdefghijklmnopqrstuvwxyz'.split("");
  return (
    <div className="TreeView">
      <ul className="wtree">
        {map(allData, (item, index) => {
          return <li key={'aaa'}>
            <h4 className="panel-title">
              <a
                onClick={() => onToggle(item.parents)} ><span className={item.parents.open ? "arrow down" : "arrow up"} ></span>{index + 1}. {item.parents.title}
              </a>
            </h4>
            {
              item.child.length > 0 ?
                <div className={item.parents.open ? "panel-collapse" : "panel-collapse panel-close"} >
                  <ul>
                    {map(item.child, (item, index) => {
                      return <li key ={uuid()}><span>{alpha[index]}. {item.title}</span> </li>
                    })}
                  </ul>
                </div> : null}
          </li>
        })}
      </ul>
    </div>
  );
}

export default TreeView;

{/* <div className={isOpen ? "panel-collapse" : "panel-collapse panel-close"} > */ }