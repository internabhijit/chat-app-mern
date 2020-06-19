import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import { getFromStorage } from "../../utils/storage";

import { HostUrl } from "../../config/connection";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const [senderId, setSenderId] = useState("");
  const [name, setName] = useState("");
  const [reciever, setReciever] = useState("initialState");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { senderId, name, recieverName, room } = queryString.parse(
      location.search
    );

    socket = io(HostUrl);

    setSenderId(Number(senderId));
    setName(name);
    setReciever(recieverName);
    setRoom(room);

    socket.emit("join", { senderId, name, room }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [location.search]);

  // Get Message List From Db
  useEffect(() => {
    const { room } = queryString.parse(location.search);
    setRoom(room);

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: getFromStorage("the_main_app"),
      },
    };

    fetch(`/messages?conversationId=${room}`, requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setMessages(json.data);
        } else if (!json.success) {
          console.error("No Message Found");
        }
      })
      .catch((err) => console.error(err));
  }, [location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} reciever={reciever} />
        <Messages messages={messages} senderId={senderId} senderName={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
