import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { HostUrl } from "../../config/connection";

import "whatwg-fetch";
import "../Join/Join.css";

const SignUp = () => {
  const [emailId, setEmailId] = useState("");
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  function handleClick(e) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailId,
        name: name,
        password: password,
        mobileNo: mobileNo,
      }),
    };

    fetch("/registration", requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          alert("Successfully Registered!\n You can Log In now");
          history.push("/");
        } else {
          alert(json.message);
          history.push("/registration");
        }
      });
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Sign Up</h1>
        <div>
          <input
            placeholder="Email"
            className="joinInput"
            type="text"
            onChange={(event) => setEmailId(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Name"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Mobile No"
            className="joinInput mt-20"
            type="number"
            onChange={(event) => setMobileNo(event.target.value)}
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
            !emailId || !mobileNo || !password
              ? e.preventDefault()
              : handleClick(e)
          }
        >
          Sign Up
        </button>
        <Link to={`/`}>
          <button className={"button mt-20"} type="submit">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
