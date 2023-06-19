import React from "react";
import { Outlet } from "react-router-dom";
import "./Home.scss";
import Menu from "./Menu/Menu";
import Menuhead from "./Menu/Menuhead";
export default function Home(params) {
  return (
    <div className="App">
      <Menuhead />
      <Menu />
      <Outlet />
    </div>
  );
}
