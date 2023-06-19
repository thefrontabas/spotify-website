import "./Resmenu.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { tokenfunc } from "../../../../User";
import { actfunc, keyfunc } from "../../../Redux/Home";

export default function Resmenu(props) {
  const [token, setToken] = useState("");

  let location = useLocation();
  let CLIENT_ID = "222e1963d6cb4c28823559fa76379d59";
  let REDIRECT_URI = "https://" + window.location.host;
  let AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  let RESPONSE_TYPE = "token";
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let state = useSelector((state) => state.home.value);
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
    navigate("/User/Login");
    dispatch(actfunc(""));
  }
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
    dispatch(tokenfunc(token));
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };
  return (
    <>
      <div className="resmenu">
        <div className="logo">
          <div className="img">
            <div
              className="infouser"
              style={{ color: "white" }}
              onClick={event}
            >
              {setcooki("login-user")}
            </div>
          </div>
          <div className="close">
            <ion-icon name="close-circle" onClick={props.func}></ion-icon>
          </div>
        </div>
        <div className="linkbox">
          <NavLink to="/">
            <div
              className="link"
              onClick={props.func}
              style={{
                color: location.pathname == "/" ? "#fff" : "#c0c0c0",
              }}
            >
              <div className="icon">
                <ion-icon
                  name={`home${location.pathname == "/" ? "" : "-outline"}`}
                ></ion-icon>
              </div>
              <div>Home</div>
            </div>
          </NavLink>

          <NavLink to={"/search"}>
            <div
              className="link"
              onClick={props.func}
              style={{
                color:
                  location.pathname == "/search" ||
                  location.pathname == `/search/${state.query}`
                    ? "#fff"
                    : "#c0c0c0",
              }}
            >
              <div className="icon">
                <ion-icon
                  name={`search${
                    location.pathname == "/search" ||
                    location.pathname == `/search/${state.query}`
                      ? ""
                      : "-outline"
                  }`}
                ></ion-icon>
              </div>
              <div>Search</div>
            </div>
          </NavLink>

          {!token ? (
            <div className="link">
              <div className="icon">
                <ion-icon name="log-in-outline"></ion-icon>
              </div>
              <div>
                <a
                  href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
                >
                  Login
                </a>
              </div>
            </div>
          ) : (
            <div className="link">
              <div className="icon">
                <ion-icon name="log-out-outline"></ion-icon>
              </div>
              <div onClick={logout}>Logout This Auth</div>
            </div>
          )}
        </div>
        <hr className="border" />
      </div>
    </>
  );
}
