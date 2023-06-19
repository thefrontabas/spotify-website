import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { actfunc, playfunc } from "../../Redux/Home";
export default function Playlisttrack(params) {
  let state = useSelector((state) => state.home.value);
  let loc = useLocation();
  let dispatch = useDispatch();
  const [elem, setelem] = useState(null);
  const hover = (e, name, index) => {
    document.querySelectorAll(".tracklist .track .number")[
      index
    ].style.display = "none";
    document.querySelectorAll(".tracklist .track .play")[index].style.display =
      "inline-flex";
  };

  const hoverout = (e, name, index) => {
    if (
      state.actname.name !==
      document.querySelectorAll(".tracklist .track .infobox .name")[index]
        .textContent
    ) {
      document.querySelectorAll(".tracklist .track .number")[
        index
      ].style.display = "inline-flex";
      document.querySelectorAll(".tracklist .track .play")[
        index
      ].style.display = "none";
    }
  };
  const hand = (e, item) => {
    dispatch(actfunc(item.track));
    document.title = `${item.track.name} ${String.fromCodePoint(2022)} ${
      item.track.artists[0].name
    }`;
    if (e.target.name == "play") {
      e.target.name = "pause";
      dispatch(playfunc(e.target.name));
      e.target.setAttribute("id", "action");
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
      const { data } = await axios(
        `https://api.spotify.com/v1/playlists/${loc.pathname.slice(10)}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${state.tokendata}`,
          },
          params: {},
        }
      );
      setelem(
        <>
          {data.items.map((item, index) => {
            if (index <= 6) {
              let time = Math.round(item.track.duration_ms / 1000);
              let min = Math.trunc(time / 60);
              let sec = Math.trunc(Math.abs(min * 60 - time));
              return (
                <div
                  className="track"
                  id={`music${index}`}
                  title={item.track.name}
                  key={index}
                  onMouseOver={(e) => hover(e, item.track.name, index)}
                  onMouseLeave={(e) => hoverout(e, item.track.name, index)}
                  style={{
                    backgroundColor:
                      state.actname.id == item.track.id && state.icon == "pause"
                        ? "#adadad2f"
                        : "",
                  }}
                >
                  <div className="firstbox">
                    <div
                      className="play"
                      style={{
                        display:
                          state.actname.id == item.track.id &&
                          state.icon == "pause"
                            ? "inline-flex"
                            : "none",
                      }}
                    >
                      <ion-icon
                        name={
                          state.actname.id == item.track.id &&
                          state.icon == "pause"
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
                          state.actname.id == item.track.id &&
                          state.icon == "pause"
                            ? "none"
                            : "inline-flex",
                      }}
                    >
                      {index + 1}
                    </div>
                    <div className="cover">
                      <img
                        src={item.track.album.images[0].url}
                        alt=""
                        width="36px"
                      />
                    </div>
                    <div className="infobox">
                      <div
                        className="name"
                        style={{
                          color:
                            state.actname.id == item.track.id &&
                            state.icon == "pause"
                              ? "#1db954"
                              : "#fff",
                          textDecoration: "none",
                        }}
                      >
                        {item.track.name}
                      </div>
                      <div className="singer">
                        {item.track.artists.map((data, index) => {
                          if (item.track.artists.length > 1) {
                            return <span>{data.name} &#44;&nbsp;</span>;
                          } else {
                            return <span>{data.name}</span>;
                          }
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="albumbox">{item.track.album.name}</div>
                  <div className="datebox">
                    {new Date(item.added_at).toDateString()}
                  </div>
                  <div className="timebox">
                    {" "}
                    {min}:{sec < 10 ? `0${sec}` : sec}
                  </div>
                </div>
              );
            }
          })}
        </>
      );
    }
    send();
  });
  return (
    <div className="trackbox">
      <div className="titlebox">
        <div className="firstbox">
          <div className="title"># TITLE</div>
        </div>
        <div className="twobox">
          <div className="album">ALBUM</div>
          <div className="date">DATE ADDED</div>
          <div className="time">
            <ion-icon name="time-outline"></ion-icon>
          </div>
        </div>
      </div>
      <div className="tracklist">{elem}</div>
    </div>
  );
}
