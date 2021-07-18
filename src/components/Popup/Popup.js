import React from 'react';
import './popup.scss';
import PropTypes from 'prop-types';

/*
 The component is used for showing popup for child component more details .
*/
const Popup = ({ onClose, content }) => {
  const { title, child } = content;
  return (
    <div className="popup-box">
      <div className="box">
        <button className="close-icon" onClick={onClose}>
          x{' '}
        </button>
        <>
          <b>{title}</b>
          <div>
            {Object.entries(child).map(([key, val]) => (
              <p key={key}>
                <span className="cellVal"> {key}:</span>
                <span className="cellVal"> {val} </span>
              </p>
            ))}
          </div>
        </>
      </div>
    </div>
  );
};
Popup.propTypes = {
  content: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
