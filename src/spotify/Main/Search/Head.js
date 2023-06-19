import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actfunc, keyfunc } from "../../Redux/Home";
import Input from "./Input";
import "./Search.scss";

export default function Header(props) {
  const [show, setshow] = useState(false);
  let navigate = useNavigate();
  const page = (name) => {
    if (name == "back") {
      window.history.back();
    } else {
      window.history.forward();
    }
  };
  let dispatch = useDispatch();
  const setcooki = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return 0;
  };

  dispatch(keyfunc(setcooki("login-user")));

  function event(params) {
    var d = new Date();
    d.setTime(d.getTime() - 1);
    var expires = "expires=" + d.toGMTString();
    document.cookie =
      "login-user=" + setcooki("login-user") + ";" + expires + ";path=/";
    navigate("/User/login");
    dispatch(actfunc(""));
  }

  return (
    <div className="headerbox">
      <div className="arrowbox">
        <div className="back" onClick={() => page("back")}>
          <ion-icon name="chevron-back-outline"></ion-icon>
        </div>
        <div
          className="forw"
          style={{
            cursor: window.history.length <= 2 ? "no-drop" : "pointer",
          }}
          onClick={() => page("forw")}
        >
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </div>
      </div>
      <Input />
      <div className="userbox">
        {show ? (
          <div className="logoutbox">
            <div className="logout" onClick={event}>
              Logout
            </div>
          </div>
        ) : null}
        <div className="user" onClick={() => setshow((prev) => !prev)}>
          <div className="icon">
            <ion-icon name="person-outline"></ion-icon>
          </div>
          <div className="infobox">
            <div className="name">{setcooki("login-user")}</div>
          </div>
          <div className="arrow">
            <ion-icon name="caret-down-outline"></ion-icon>
          </div>
        </div>
      </div>
    </div>
  );
}
