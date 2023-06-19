import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Singer.scss";
import axios from "axios";
import { NavLink, useLocation } from "react-router-dom";
import { playfunc, actfunc } from "../../Redux/Home";
import mainApi from "../Api/Api";
export function Top(params) {
  const [elem, setelem] = useState([]);
  const [text, settext] = useState("SEE MORE");
  let location = useLocation();
  let state = useSelector((state) => state.home.value);
  let dispatch = useDispatch();
  const event = () => {
    settext((prev) => (prev == "SEE MORE" ? "SHOW LESS" : "SEE MORE"));
    if (text == "SEE MORE") {
      document.querySelector(".topflex").style.height = "100%";
    } else {
      document.querySelector(".topflex").style.height = "19rem";
    }
  };

  const hover = (e, name, index) => {
    document.querySelectorAll(".topflex .topmusic .number")[
      index
    ].style.display = "none";
    document.querySelectorAll(".topflex .topmusic .play")[index].style.display =
      "inline-flex";
  };

  const hoverout = (e, name, index) => {
    if (
      state.actname.name !==
      document.querySelectorAll(".topflex .topmusic .infobox .name")[index]
        .textContent
    ) {
      document.querySelectorAll(".topflex .topmusic .number")[
        index
      ].style.display = "inline-flex";
      document.querySelectorAll(".topflex .topmusic .play")[
        index
      ].style.display = "none";
    }
  };
  const hand = async (e, item) => {
    dispatch(actfunc(item));

    if (e.target.name == "play") {
      e.target.name = "pause";
      dispatch(playfunc(e.target.name));
      e.target.setAttribute("id", "action");
      let res = await mainApi(`/spotify`);

      let web = res.data.find((item) => item.lastName == state.keydata);
      let findmusic = web.recentplay.find((child) => child.name == item.name);
      if (!findmusic) {
        mainApi.put(`/spotify/${web.id}`, {
          recentplay: [...web.recentplay, item],
        });
      }
      document.querySelector("#musicplayer").play();
    } else {
      e.target.name = "play";
      dispatch(playfunc(e.target.name));
      e.target.setAttribute("id", "icon");
      // dispatch(actfunc(''));
      document.querySelector("#musicplayer").pause();
    }
  };

  useEffect(() => {
    async function send(params) {
      const { data } = await mainApi(
        `https://api.spotify.com/v1/artists/${location.pathname.slice(
          8
        )}/top-tracks`,
        {
          headers: {
            Authorization: `Bearer ${state.tokendata}`,
          },
          params: {
            market: "ES",
          },
        }
      );

      setelem(
        <>
          {data.tracks.map((item, index) => {
            let time = Math.round(item.duration_ms / 1000);
            let min = Math.trunc(time / 60);
            let sec = Math.trunc(Math.abs(min * 60 - time));
            return (
              <div
                className="topmusic"
                id={`music${index}`}
                title={item.name}
                key={index}
                onMouseOver={(e) => hover(e, item.name, index)}
                onMouseLeave={(e) => hoverout(e, item.name, index)}
                style={{
                  background:
                    state.actname.id == item.id && state.icon == "pause"
                      ? "#adadad2f"
                      : "",
                }}
              >
                <div className="firstbox">
                  <div
                    className="play"
                    style={{
                      display:
                        state.actname.id == item.id && state.icon == "pause"
                          ? "inline-flex"
                          : "none",
                    }}
                  >
                    <ion-icon
                      name={
                        state.actname.id == item.id && state.icon == "pause"
                          ? "pause"
                          : "play"
                      }
                      onClick={(e) => hand(e, item)}
                    ></ion-icon>
                  </div>

                  <div
                    className="number"
                    style={{
                      display:
                        state.actname.id == item.id && state.icon == "pause"
                          ? "none"
                          : "inline-flex",
                    }}
                  >
                    {index + 1}
                  </div>

                  <div className="cover">
                    <img src={item.album.images[0].url} alt="cover-music" />
                  </div>
                  <div className="infobox">
                    <div
                      className="name"
                      style={{
                        color:
                          state.actname.id == item.id && state.icon == "pause"
                            ? "#1db954"
                            : "#fff",
                        textDecoration: "none",
                      }}
                    >
                      {item.name}
                    </div>
                  </div>
                </div>
                <div className="viewbox">22,500</div>

                <div className="time">
                  {min}:{sec < 10 ? `0${sec}` : sec}
                </div>
              </div>
            );
          })}
        </>
      );
    }
    send();
  });

  return (
    <div className="topbox">
      <div className="tophead">Popular</div>
      <div className="topflex">{elem}</div>
      <div className="controlbox">
        <button onClick={event}>{text}</button>
      </div>
    </div>
  );
}
