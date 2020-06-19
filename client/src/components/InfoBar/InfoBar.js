import React from "react";

import "./InfoBar.css";

const InfoBar = ({ room, reciever }) => {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img
          className="onlineIcon"
          src="https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/onlineIcon.png"
          alt="online icon"
        />
        <h3>{reciever}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/users">
          <img
            src="https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/closeIcon.png"
            alt="close icon"
          />
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
