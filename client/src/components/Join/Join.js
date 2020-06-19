import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";
import { setInStorage } from "../../utils/storage";

import "whatwg-fetch";
import "./Join.css";

const Join = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  function handleClick(e) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    fetch("/login", requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setInStorage("the_main_app", { token: json.token });
          history.push("/users");
        } else {
          alert(json.message);
          history.push("/");
        }
      });
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Email"
            className="joinInput"
            type="text"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            className="joinInput mt-20"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button
          className={"button mt-20"}
          type="submit"
          onClick={(e) =>
            !email || !password ? e.preventDefault() : handleClick()
          }
        >
          Sign In
        </button>
        <Link to={`/registration`}>
          <button className={"button mt-20"} type="submit">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
