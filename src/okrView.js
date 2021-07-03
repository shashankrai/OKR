import React from 'react';
import map from 'lodash/map';
import './App.scss';
import uuid from 'react-uuid'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';


const TreeView = ({ allData, onToggle }) => {
  const alpha = 'abcdefghijklmnopqrstuvwxyz'.split("");
  return (
    <div className="TreeView" key ="aaaa" >
      <ul className="okrtree" key ={uuid()}>
        {map(allData, (item, index) => (
           <li key ={uuid()}>
            <h4 className="panel-title">
              <button className ="btn-custom"
                onClick={() => onToggle(item.parents)} ><span className={item.parents.open ? "arrow down" : "arrow up"} >       
                </span><span class="usericons"><AccountCircleOutlinedIcon/></span><span className="content">{index + 1}. {item.parents.title}</span>
              </button>
            </h4>
            {
              item.child.length > 0 ?
                <div className={item.parents.open ? "panel-collapse" : "panel-collapse panel-close"} >
                  <ul> 
                    {map(item.child, (item, index) => (
                       <li key ={uuid()}><span><AccountCircleOutlinedIcon className="usericonschild"/>    {alpha[index]}. {item.title}</span> </li>
                    ))}
                  </ul>
                </div> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TreeView;

