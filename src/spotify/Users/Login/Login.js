import React, { useEffect } from "react";
import "../Style/User.scss";
import { useNavigate } from "react-router-dom";
import Formcomponent from "./Form";

export default function Login(props) {
  let navigate = useNavigate();

  const getcooki = (cname) => {
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

  useEffect(() => {
    if (getcooki("login-user") != 0) {
      navigate("/");
      alert("hello");
    }
  }, []);
  return (
    <div className="loginbox" id={props.classlogin}>
      <div className="head">Log in</div>
      <div className="formbox">
        <Formcomponent />
      </div>
    </div>
  );
}
