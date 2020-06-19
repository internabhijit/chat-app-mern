import React from "react";
import { Link } from "react-router-dom";

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
        <Link to={`/users`}>
          <img
            src="https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/closeIcon.png"
            alt="close icon"
          />
        </Link>
      </div>
    </div>
  );
};

export default InfoBar;
