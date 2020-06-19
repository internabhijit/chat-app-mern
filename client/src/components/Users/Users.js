import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useHistory } from "react-router-dom";

import "whatwg-fetch";
import "./Users.css";
import User from "../User/User";
import { getFromStorage } from "../../utils/storage";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [logInUser, setlogInUser] = useState("");
  const history = useHistory();

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: getFromStorage("the_main_app"),
      },
    };

    fetch("/users", requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setlogInUser(json.logInUser);
          setUsers(json.data);
          setIsLoading(false);
        } else if (!json.success && !json.loggedIn) {
          alert(json.message);
          history.push("/");
        } else {
          alert(json.message);
          history.push("/");
        }
      })
      .catch((err) => console.error(err));
  });

  useEffect(() => {
    const onbeforeunloadFn = () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: getFromStorage("the_main_app"),
        },
      };

      fetch("/logout", requestOptions)
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
          } else if (!json.success) {
            alert(json.message);
            history.push("/");
          }
        })
        .catch((err) => console.error(err));

      localStorage.removeItem("the_main_app", "token");
    };

    window.addEventListener("beforeunload", onbeforeunloadFn);
    return () => {
      window.removeEventListener("beforeunload", onbeforeunloadFn);
    };
  });

  return (
    <div className="p-20">
      {isLoading && <p>Please wait...</p>}
      <ScrollToBottom>
        <h1>Welcome {logInUser.name}</h1>
        <div className="wrapper">
          {users.map((user, i) => (
            <div key={i}>
              <User
                logInUserId={logInUser.userId}
                logInUserName={logInUser.name}
                userId={user.userId}
                name={user.name}
              />
            </div>
          ))}
        </div>
      </ScrollToBottom>
    </div>
  );
};

export default Users;
