import React, { useEffect, useState } from "react";
import Header from "../home/View/Header";
import "./Playlist.scss";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import mainApi from "../Api/Api";
import Playlisttrack from "./Playlisttrack";

import Toast from "../../Toast/Toast";
export default function Playlistfooter({ user, like, data }) {
  const [mess, setmess] = useState(false);
  const [textmess, settextmess] = useState("message");
  let state = useSelector((state) => state.home.value);

  const heart = (e, name) => {
    if (e.target.name == "heart-outline") {
      settextmess("Save to Your Library");
      setmess(true);
      e.target.setAttribute("id", "anim");

      setTimeout(() => {
        setmess(false);
        e.target.setAttribute("id", "");
      }, 1300);

      e.target.name = "heart";
      e.target.style.color = "#1db954";
      let findmusic = user.like.find((child) => child == name);
      if (!findmusic) {
        mainApi.put(`/spotify/${user.id}`, {
          like: [...user.like, name],
        });
      }
    } else {
      settextmess("Removed from Your Library");
      setmess(true);
      e.target.setAttribute("id", "anim");

      setTimeout(() => {
        setmess(false);
        e.target.setAttribute("id", "");
      }, 1300);
      e.target.name = "heart-outline";
      e.target.style.color = "#adadad";
      let findname = user.like.filter((child) => child != name);
      mainApi.put(`/spotify/${user.id}`, {
        like: [...findname],
      });
    }
  };
  let find = like.find((item) => item === data.id);

  return (
    <>
      <div className="playlistfooter">
        <div className="playboxmusic">
          <div className="play">
            <ion-icon name="play"></ion-icon>
          </div>
          <div className="heart">
            <ion-icon
              name={find ? "heart" : "heart-outline"}
              style={{
                color: find ? "#1db954" : "#adadad",
              }}
              onClick={(e) => heart(e, state.playlist.id)}
            ></ion-icon>
          </div>
        </div>
        <Playlisttrack />
        {mess && <Toast text={textmess} />}
      </div>
    </>
  );
}
