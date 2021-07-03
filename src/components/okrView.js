import React from 'react';
import map from 'lodash/map';
import '../App.scss';
import uuid from 'react-uuid'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { BulletList } from 'react-content-loader'
import PropTypes from 'prop-types';


const MyBulletListLoader = () => <BulletList />

const TreeView = ({ allData, onToggle, loader }) => {
  const alpha = 'abcdefghijklmnopqrstuvwxyz'.split("");

  const parentsNode = (content, index) => {
    return (
      <h4 className="panel-title">
        <button className="btn-custom"
          onClick={() => onToggle(content)} ><span className={content.open ? "arrow down" : "arrow up"} >
          </span><span className="usericons"><AccountCircleOutlinedIcon /></span><span className="content">{index + 1}. {content.title}</span>
        </button>
      </h4>)
  };

  const childNodes = (parent, child) => {
    return (
      <div className={parent.open ? "panel-collapse" : "panel-collapse panel-close"} >
        <ul>
          {map(child, (item, index) => (
            <li key={uuid()}><span><AccountCircleOutlinedIcon className="usericonschild" />    {alpha[index]}. {item.title}</span> </li>
          ))}
        </ul>
      </div>
    )

  };

  return (
    <>
      {loader === true ? <MyBulletListLoader /> :
        <ul className="okrtree" key={uuid()}>
          {map(allData, (item, index) => (
            <li key={uuid()}>
              {parentsNode(item.parents, index)}
              {
                item.child.length > 0 ?
                  childNodes(item.parents, item.child) : null}
            </li>
          ))}
        </ul>
      }
    </>
  );
}
TreeView.propTypes = {
  allData: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
  loader: PropTypes.bool.isRequired
};


export default TreeView;

