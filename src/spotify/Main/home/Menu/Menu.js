import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../../Asset/logo.png";
import { tokenfunc } from "../../../Redux/Home";
export default function Menu(props) {
  let CLIENT_ID = "222e1963d6cb4c28823559fa76379d59";
  let REDIRECT_URI = "https://" + window.location.host;
  let AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  let RESPONSE_TYPE = "token";
  const [token, setToken] = useState("");
  const [art, setart] = useState([]);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let location = useLocation();
  let state = useSelector((state) => state.home.value);
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

    async function send(params) {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/artists/4xFUf1FHVy696Q1JQZMTRj/related-artists`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {},
        }
      );
      dispatch(tokenfunc(token));
      setart(data.artists);
    }
    send();
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <div className="menu">
      <NavLink to="/">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
      </NavLink>
      <div className="linkbox">
        <div
          className="link"
          onClick={() => {
            navigate("/");
          }}
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

        <div
          className="link"
          onClick={() => {
            navigate("/search");
          }}
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
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="0"
                viewBox="0 0 24 24"
                class="ml-4 h-5 w-5"
                height="1em"
                width="22px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
            </div>
            <div onClick={logout}>Logout This Auth</div>
          </div>
        )}
      </div>
      <hr className="border" />
      <div className="artbox">
        {art.map((item, index) => {
          if (index < 4) {
            return (
              <NavLink
                style={{ textDecoration: "none" }}
                to={`/Artist/${item.id}`}
              >
                <div key={index} title={item.name} className="link">
                  {item.name}
                </div>
              </NavLink>
            );
          }
        })}
      </div>
    </div>
  );
}
