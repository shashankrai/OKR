import React, { useState } from 'react';
import map from 'lodash/map';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { BulletList } from 'react-content-loader';
import PropTypes from 'prop-types';
import Popup from '../Popup/Popup';
import './treeView.scss';
import { LOCALE } from '../../tools/constants';

const ListingVal = LOCALE.LISTING_VALUE.split('');

/*
 The component is used for gernerating tree structure .
*/
const TreeView = ({ allData, onToggle, loader }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState({});

  const togglePopup = (parent, child) => {
    const { title } = parent;
    setContent({ title, child });
    setIsOpen(!isOpen);
  };

  const parentsNode = (nodes, index) => {
    return (
      <h4 className="paneltitle">
        <button className="btn-custom" onClick={() => onToggle(nodes)}>
          <span className={nodes.open ? 'arrow down' : 'arrow up'}></span>
          <span className="usericons">
            <AccountCircleOutlinedIcon />
          </span>
          <span className="content">
            {index + 1}. {nodes.title}
          </span>
        </button>
      </h4>
    );
  };

  const childNodes = (parent, child) => {
    return (
      <div className={parent.open ? 'panelcollapse' : 'panelcollapse panelclose'}>
        <ul>
          {child.map((item, index) => (
            <li key={item.id} onClick={() => togglePopup(parent, child[index])}>
              <span>
                <AccountCircleOutlinedIcon className="usericonschild" /> {ListingVal[index]} . {item.title}
              </span>
            </li>
          ))}
        </ul>
        {isOpen && <Popup content={content} onClose={togglePopup} />}
      </div>
    );
  };

  return (
    <>
      {loader === true ? (
        <BulletList />
      ) : (
        <ul className="okrtree">
          {map(allData, (item, index) => (
            <li key={item.parents.parentId}>
              {parentsNode(item.parents, index)}
              {item.child.length > 0 ? childNodes(item.parents, item.child) : null}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

TreeView.propTypes = {
  allData: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
  loader: PropTypes.bool.isRequired,
};

export default TreeView;
