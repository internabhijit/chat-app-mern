import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import "./Messages.css";
import Message from "../Message/Message";

const Messages = ({ messages, senderId, senderName }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => (
      <div key={i}>
        <Message
          message={message}
          senderId={senderId}
          senderName={senderName}
        />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;
