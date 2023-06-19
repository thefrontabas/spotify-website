import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Main from "./Main";
import "./Player.scss";
export default function Player(props) {
  let state = useSelector((state) => state.home.value);
  const [icon, seticon] = useState("volume-high-outline");
  const [val, setval] = useState(0);
  function change(e) {
    document.querySelector("#musicplayer").volume = e.target.value / 100;
    if (e.target.value <= 2) {
      seticon("volume-mute-outline");
      document.querySelector("#musicplayer").volume = 0;
    } else if (e.target.value >= 60) {
      seticon("volume-high-outline");
    } else {
      seticon("volume-medium-outline");
    }
    setval(e.target.value);
  }

  function iconfunc(e) {
    if (e.target.name != "volume-mute-outline") {
      e.target.name = "volume-mute-outline";
      document.querySelector("#musicplayer").volume = 0;
      document.querySelector(".volinput").value = 0;
    } else {
      e.target.name = "volume-high-outline";
      if (val == 0) {
        setval(80);
      }
      document.querySelector(".volinput").value = val;
      document.querySelector("#musicplayer").volume = val / 100;
    }
  }

  return (
    <div className="playbox">
      <div className="firstbox">
        <div className="cover">
          <img
            src={
              state.actname.type == "album"
                ? state.actname.images[0].url
                : state.actname.album.images[0].url
            }
            alt=""
          />
        </div>
        <div className="infobox">
          <NavLink to={`/Album/${state.actname.id}`}>
            <div className="name" style={{ textDecoration: "none" }}>
              {state.actname.name}
            </div>
          </NavLink>
          <NavLink to={`/Artist/${state.actname.artists[0].id}`}>
            <div className="singer" style={{ textDecorationColor: "#0000" }}>
              {state.actname.artists[0].name}
            </div>
          </NavLink>
        </div>
      </div>

      <Main />
      <div className="soundbox">
        <div className="icon">
          <ion-icon name={icon} onClick={iconfunc}></ion-icon>
        </div>
        <div className="volbox">
          <input
            type="range"
            className="volinput"
            min="1"
            max="100"
            onChange={change}
          ></input>
        </div>
      </div>
    </div>
  );
}
