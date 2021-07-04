import React, { useState } from "react";
import map from "lodash/map";
import uuid from "react-uuid";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { BulletList } from "react-content-loader";
import PropTypes from "prop-types";
import Popup from "./Popup";
import "../components/components.scss";

 /*
  The component for showing loader while fetching data
*/
const MyBulletListLoader = () => <BulletList />;

 /*
  The component is used for gernerating tree structure .
*/
const TreeView = ({ allData, onToggle, loader }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState({});

  const togglePopup = (parent, child) => {
    setContent({ title: parent.title, child: child });
    setIsOpen(!isOpen);
  };

  const alpha = "abcdefghijklmnopqrstuvwxyz".split("");

  const parentsNode = (content, index) => {
    return (
      <h4 className="paneltitle">
        <button className="btn-custom" onClick={() => onToggle(content)}>
          <span className={content.open ? "arrow down" : "arrow up"}></span>
          <span className="usericons">
            <AccountCircleOutlinedIcon />
          </span>
          <span className="content">
            {index + 1}. {content.title}
          </span>
        </button>
      </h4>
    );
  };

  const childNodes = (parent, child) => {
    return (
      <div
        className={parent.open ? "panelcollapse" : "panelcollapse panelclose"}
      >
        <ul>
          {map(child, (item, index) => (
            <li key={uuid()} onClick={() => togglePopup(parent, child[index])}>
              <span>
                <AccountCircleOutlinedIcon className="usericonschild" />{" "}
                {alpha[index]} . {item.title}
              </span>
            </li>
          ))}
        </ul>
        {isOpen && <Popup content={content} handleClose={togglePopup} />}
      </div>
    );
  };

  return (
    <>
      {loader === true ? (
        <MyBulletListLoader />
      ) : (
        <ul className="okrtree" key={uuid()}>
          {map(allData, (item, index) => (
            <li key={uuid()}>
              {parentsNode(item.parents, index)}
              {item.child.length > 0
                ? childNodes(item.parents, item.child)
                : null}
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
