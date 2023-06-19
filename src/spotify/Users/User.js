import React, { useState, useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Style/User.scss";
import logo from "./logo.png";
export default function User() {
  const [text, settext] = useState("SignUp-For-NewAccount");

  const event = (e) => {
    e.target.setAttribute("id", "hide");
    setTimeout(() => {
      settext((prev) =>
        prev == "SignUp-For-NewAccount" ? "Login" : "SignUp-For-NewAccount"
      );
      e.target.setAttribute("id", "");
    }, 700);
  };
  return (
    <div className="userbox" style={{ height: "48rem" }}>
      <div className="headbox">
        <div className="logo">
          <img src={logo} alt="logo" width="180px" />
        </div>
        <div className="btnbox">
          <NavLink to={`/User/${text}`}>
            {" "}
            <button onClick={event} className="switchbtn">
              {text}
            </button>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
