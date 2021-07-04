import React from "react";
import map from "lodash/map";
import "./popup.scss";

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
                {key}:{val}
              </p>
            ))}
          </div>
        </>
      </div>
    </div>
  );
};

export default Popup;
