import React from "react";
import { Link } from "react-router-dom";

import "./User.css";

const User = ({ logInUserId, logInUserName, userId, name }) => {
  let room;

  if (logInUserId > userId) {
    room = userId + "_" + logInUserId;
  } else {
    room = logInUserId + "_" + userId;
  }

  return (
    <div className="box">
      <img
        className="img"
        src="https://www.pngarts.com/files/5/Cartoon-Avatar-PNG-Image-Transparent.png"
        alt="Avatar"
        style={{ width: 100 + "%" }}
      />
      <div className="card-container">
        <h4>
          <b>
            {name}
            {userId}
          </b>
        </h4>
        <Link
          to={`/chat?senderId=${logInUserId}&name=${logInUserName}&recieverName=${name}&room=${room}`}
        >
          <button>Chat</button>
        </Link>
      </div>
    </div>
  );
};

export default User;
