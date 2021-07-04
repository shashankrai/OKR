import React from "react";
import map from "lodash/map";
import "./popup.scss";
/*
 The component is used for showing popup for child component more details .
*/
const Popup = (props) => {
  return (
    <div className="popup-box">
      <div className="box">
        <button className="close-icon" onClick={props.handleClose}>
          x{" "}
        </button>
        <>
          <b>{props.content.title}</b>
          <div>
            {map(props.content.child, (val, key) => (
              <p>
                <span className="cellVal"> {key}:</span><span className="cellVal"> {val} </span>
              </p>
            ))}
          </div>
        </>
      </div>
    </div>
  );
};

export default Popup;
