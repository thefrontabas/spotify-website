import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { actfunc, playfunc } from "../../Redux/Home";
export default function Songs(params) {
  const [elem, setelem] = useState(null);
  let state = useSelector((state) => state.home.value);
  const hover = (index) => {
    document.querySelectorAll(".flex .songbox .song .cover .back")[
      index
    ].style.display = "inline-flex";
  };

  const hoverout = (index) => {
    if (
      state.actname.name !==
      document.querySelectorAll(".flex .songbox .song .infobox .name")[index]
        .textContent
    ) {
      document.querySelectorAll(".flex .songbox .song .cover .back")[
        index
      ].style.display = "none";
    }
  };
  let dispatch = useDispatch();
  const hand = (e, item) => {
    dispatch(actfunc(item));
    // document.title = `${item.name} ${String.fromCodePoint(2022)} ${
    //     item.artists[0].name
    // }`;
    if (e.target.name == "play") {
      e.target.name = "pause";
      dispatch(playfunc(e.target.name));
    } else {
      e.target.name = "play";
      dispatch(playfunc(e.target.name));
      document.querySelector("#musicplayer").pause();
    }
  };
  useEffect(() => {
    send();
  });

  async function send(params) {
    try {
      const { data } = await axios(`https://api.spotify.com/v1/search`, {
        headers: {
          Authorization: `Bearer ${state.tokendata}`,
        },
        params: {
          q: state.query,
          type: "track",
          limit: 4,
          market: "ES",
        },
      });

      setelem(
        <>
          {data.tracks.items.map((item, index) => {
            let time = Math.round(item.duration_ms / 1000);
            let min = Math.trunc(time / 60);
            let sec = Math.trunc(Math.abs(min * 60 - time));

            return (
              <div className="songcard">
                <div
                  className="song"
                  title={item.name}
                  onMouseOver={(e) => hover(index)}
                  onMouseLeave={(e) => hoverout(index)}
                  style={{
                    background:
                      state.actname.id == item.id && state.icon == "pause"
                        ? "#97979769"
                        : "",
                  }}
                >
                  <div
                    className="cover"
                    style={{
                      backgroundImage: `url(
                                               ${item.album.images[2].url}
                                            )`,
                    }}
                  >
                    <div
                      className="back"
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
                  </div>
                  <div className="infobox">
                    <div
                      className="name"
                      style={{
                        color: state.actname.id == item.id ? "#1db954" : "#fff",
                      }}
                    >
                      {item.name}
                    </div>
                    <NavLink
                      to={`/Artist/${item.artists[0].id}`}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <div
                        className="singer"
                        style={{
                          color:
                            state.actname.id == item.id && state.icon == "pause"
                              ? "#fff"
                              : "#aaaaaa",
                        }}
                      >
                        {item.artists[0].name}
                      </div>
                    </NavLink>
                  </div>
                  <div className="time">
                    {min}:{sec < 10 ? `0${sec}` : sec}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      );
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="songbox">
      <div className="songhead">Songs</div>
      {elem}
    </div>
  );
}
