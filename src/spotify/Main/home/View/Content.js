import React from "react";
import Welcome from "../Welcome";
import Header from "./Header";
import "./Content.scss";
import Gener from "./Gener";
import Recent from "../../recent/Recent";
import Playlistbox from "../Playlistbox";
export default function Content(props) {
  return (
    <div className="contentbox">
      <Header />
      <Welcome />
      <Gener singer="0RijxlHRlHCt8hYWPclQRJ" />
      <Playlistbox query="dance" />

      <Gener singer="33iW4ezRFw7H7i4OXmILci" />
      <Gener singer="3QNGoF6VzVNnkpjJDT3NHq" />
      <Recent />
    </div>
  );
}
