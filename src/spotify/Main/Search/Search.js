import React from "react";
import Songs from "./Songs";
import Artist from "./Artist";
import Header from "./Head";
import "./Search.scss";
import Top from "./Top";
import Input from "./Input";
import Playlist from "./Playlist";
export default function Search() {
  return (
    <div className="searchbox">
      <Header />
      <div className="inpbox">
        <Input />
      </div>
      <div className="flex">
        <Top />
        <Songs />
      </div>
      <Artist />
      <Playlist />
    </div>
  );
}
