import React, { useState } from "react";
import "../Home.scss";
import logo from "../../Asset/logo.png";
import Resmenu from "../../Playlist/MainMenu/Resmenu";

export default function Menuhead(params) {
  const [show, setshow] = useState(false);
  function event(params) {
    setshow(true);
  }
  return (
    <div className="menuhead">
      {show ? <Resmenu func={() => setshow(false)} /> : null}
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="lastbox">
        <div className="icon">
          <ion-icon onClick={event} name="menu-outline"></ion-icon>
        </div>
      </div>
    </div>
  );
}
