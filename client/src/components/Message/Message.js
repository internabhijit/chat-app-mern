import React from "react";

import "./Message.css";

import ReactEmoji from "react-emoji";
import delivered from "../../public/delivered.svg";
import read from "../../public/read.svg";
import sent from "../../public/sent.svg";

const Message = ({
  message: { message, sentBy, sentByName, messageStatus },
  senderId,
  senderName,
}) => {
  let isSentByCurrentUser = false;

  if (sentBy === senderId) {
    isSentByCurrentUser = true;
  }

  function getMsgStatus({ messageStatus }) {
    if (messageStatus === "READ") {
      return read;
    } else if (messageStatus === "DELIVERED") {
      return delivered;
    } else {
      return sent;
    }
  }

  return isSentByCurrentUser ? (
    <div>
      <div className="messageContainer justifyEnd">
        <div className="messageBox backgroundBlue">
          <p className="messageText colorWhite">
            {ReactEmoji.emojify(message)}
          </p>
        </div>
      </div>
      <span className="messageContainer justifyEnd">
        <img src={getMsgStatus({ messageStatus })} alt="" />
      </span>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(message)}</p>
      </div>
    </div>
  );
};

export default Message;
